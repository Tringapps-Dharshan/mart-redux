import './PreviewBackdrop.scss'
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { TextField, Select, Button, Backdrop, Box, Avatar, Fab, SelectChangeEvent, MenuItem } from '@mui/material'
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { listorder } from '../redux/Retailer/retailerSlice'
import { ChangeEvent, useEffect } from 'react';

type handleClose = () => void

type setOpen = (set: boolean) => void

export type props = {
    user: number,
    open: boolean,
    setOpen: setOpen
}

function PreviewBackdrop({ open, setOpen, user }: props) {

    let today = new Date().toLocaleDateString()

    const { register, control, handleSubmit, watch, setValue, getValues, reset } = useForm({
        defaultValues: {
            data: [{ name: "", quantity: 1, price: 0, date: today }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "data"
    });

    const mart_details = useAppSelector((state) => state.stock.productStock);
    const retailer_details = useAppSelector((state) => state.retailer.retailerStock);
    const currentUser = retailer_details.find((users) => users.id === user);
    const dispatch = useAppDispatch();

    const handleClose: handleClose = () => {
        setOpen(false);
    };

    const purchasedItems = useWatch({
        control,
        name: 'data'
    });

    const onSubmit = (datum: any) => {
        console.log(datum.data);

        let reducerParam = {
            id: user,
            details: datum.data
        }
        dispatch(listorder(reducerParam));
        reset({
            data: [{ name: "", quantity: 1, price: 0, date: today }]
        })
        setOpen(false);
    }

    const handleProduct = (index: number, event: SelectChangeEvent<any>) => {
        setValue(`data.${index}.name`, event.target.value);

        let productDetails = mart_details.find((products) => products.product_name === event.target.value);
        console.log('product Details', productDetails);
        if (productDetails) {
            setValue(`data.${index}.price`, productDetails?.product_price)
        }
    }

    return (
        <Backdrop
            open={open}
        >
            <Box sx={{ color: 'black', backgroundColor: 'white', borderRadius: '5px', boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px', overflowY: 'auto' }}>
                <div className='box-header'>
                    <div className='box-header-left'>
                        <Avatar sx={{ margin: '10px', bgcolor: 'tomato' }}>
                            {currentUser?.name[0]}
                        </Avatar>
                        <p className="cus-name">{currentUser?.name}, {currentUser?.address}.</p>
                    </div>
                    <div>
                        <Fab
                            size='small'
                            color="primary"
                            aria-label="add"
                            onClick={() => {
                                append({ name: "", quantity: 1, price: 0, date: today });
                            }}
                        >
                            <AddIcon />
                        </Fab>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {fields.map((item, index) => {
                            return (
                                <div key={item.id} className='box-content'>
                                    <div className='content'>
                                        <p className='box-title'>Select Product</p>
                                        <Controller
                                            render={({ ...field }) =>
                                                <Select
                                                    {...register(`data.${index}.name`)}
                                                    size="small"
                                                    onChange={(event) => handleProduct(index, event)}
                                                    defaultValue=""
                                                >
                                                    <MenuItem value="" disabled>SELECT</MenuItem>
                                                    {
                                                        mart_details.map((items) => items.product_inStock !== 0 && <MenuItem key={items.product_id} value={items.product_name}>{items.product_name}</MenuItem>)
                                                    }
                                                </Select>
                                            }
                                            name={`data.${index}.name`}
                                            control={control}
                                        />
                                    </div>
                                    <div className='content'>
                                        <p className='box-title'>Price</p>
                                        <p>{getValues(`data.${index}.price`)}</p>
                                    </div>
                                    <div className='content'>
                                        <p className='box-title'>Custom Quantity</p>
                                        <Controller
                                            render={({ field }) =>
                                                <TextField {...field}
                                                    type="number"
                                                    required
                                                    placeholder='Quantity'
                                                    size="small"
                                                    onChange={(e) => setValue(`data.${index}.quantity`, parseFloat(e.target.value))}
                                                />}
                                            name={`data.${index}.quantity`}
                                            control={control}
                                        />
                                    </div>
                                    <div className='content'>
                                        <p className='box-title'>Total Amount</p>
                                        <p>{getValues(`data.${index}.quantity`) * getValues(`data.${index}.price`)}</p>
                                    </div>
                                    <div className='content'>
                                        <button type="button" onClick={() => remove(index)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="cus-action">
                        <div>
                            <Button
                                type='submit'
                                variant="contained"
                            >
                                Supply
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                sx={{ margin: '10px' }}
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            </Box>
        </Backdrop>
    )
}

export default PreviewBackdrop