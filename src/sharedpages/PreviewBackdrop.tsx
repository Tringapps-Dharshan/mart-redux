import './PreviewBackdrop.scss'
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { TextField, Select, Button, Backdrop, Box, Avatar, Fab, SelectChangeEvent, MenuItem, Alert } from '@mui/material'
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { listorder } from '../redux/Retailer/retailerSlice'
import { handleCloses, props } from '../interfaces/backdrop'
import { Actiondetails } from '../interfaces/retailer'

function PreviewBackdrop({ open, setOpen, user }: props) {

    interface Reducerparam {
        id: number,
        details: Actiondetails[]
    }

    let today = new Date().toLocaleDateString()

    const { register, control, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm({
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

    const handleClose: handleCloses = () => {
        reset({
            data: [{ name: "", quantity: 1, price: 0, date: today }]
        })
        setOpen(false);
    };

    const purchasedItems = useWatch({
        control,
        name: 'data'
    });

    interface Datum {
        data: []
    }

    const onSubmit = (datum: Datum | any) => {
        console.log('datum', datum);

        let reducerParam: Reducerparam = {
            id: user,
            details: datum.data
        }

        dispatch(listorder(reducerParam));
        reset({
            data: [{ name: "", quantity: 1, price: 0, date: today }]
        })
        setOpen(false);
    }

    const handleProduct = (index: number, event: SelectChangeEvent<string>) => {
        setValue(`data.${index}.name`, event.target.value);
        let productDetails = mart_details.find((products) => products.product_name === event.target.value);

        if (productDetails) {
            setValue(`data.${index}.price`, productDetails?.product_price)
        }
    }

    const getQuantity = (item: string) => {
        return mart_details.find((martItem) => martItem.product_name === item)?.product_inStock
    }

    const appendChild = () => {
        if (purchasedItems[fields.length - 1].name !== "") {
            append({ name: "", quantity: 1, price: 0, date: today });
        } else {
            alert('error')
        }
    }

    return (
        <Backdrop
            open={open}
        >
            <Box sx={{ color: 'black', backgroundColor: 'white', borderRadius: '5px', boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px', maxHeight: '500px' }}>
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
                            onClick={appendChild}
                            disabled={fields.length===mart_details.length ? true : false}
                        >
                            <AddIcon />
                        </Fab>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='scroll-design'>
                        {fields.map((item, index) => {
                            return (
                                <div key={item.id}>
                                    <div className='box-content'>
                                        <div className='content'>
                                            <p className='box-title'>Select Product</p>
                                            <Controller
                                                render={({ ..._field }) =>
                                                    <Select
                                                        sx={{ minWidth: '100px', maxWidth: '150px' }}
                                                        {...register(`data.${index}.name`, { required: true })}
                                                        size="small"
                                                        onChange={(event) => handleProduct(index, event)}
                                                        defaultValue=""
                                                    >
                                                        <MenuItem value="" disabled>SELECT</MenuItem>
                                                        {
                                                            mart_details.map((items) => items.product_inStock !== 0 && <MenuItem key={items.product_id} value={items.product_name} disabled={purchasedItems.find(pItems => pItems.name === items.product_name) ? true : false}>{items.product_name}</MenuItem>)
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
                                                        error={errors.data?.[index]?.name ? true : false}
                                                        sx={{ maxWidth: '100px' }}
                                                        type="number"
                                                        inputProps={{ min: 1, max: getQuantity(getValues(`data.${index}.name`)) }}
                                                        required
                                                        placeholder='Quantity'
                                                        size="small"
                                                        onChange={(e) => setValue(`data.${index}.quantity`, parseFloat(e.target.value))}
                                                        helperText={errors.data?.[index]?.quantity ? `Minimum: 1 ,Maximum: data.${index}.quantity` : ''}
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
                                            {fields.length > 1 && <Fab
                                                className='content'
                                                size='small'
                                                color="error"
                                                aria-label="add"
                                                onClick={() => index > 0 && remove(index)}
                                            >
                                                <DeleteIcon />
                                            </Fab>}
                                        </div>
                                    </div>
                                    {
                                        purchasedItems[index]?.name === "" &&
                                        <Alert severity="error">
                                            Select products to purchase
                                        </Alert>
                                    }
                                </div>
                            );
                        })}
                    </div>
                    <div>

                    </div>
                    <div className="cus-action">
                        <div className='cus-action'>
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
                                    type='button'
                                    variant="contained"
                                    sx={{ margin: '10px' }}
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Box>
        </Backdrop>
    )
}

export default PreviewBackdrop