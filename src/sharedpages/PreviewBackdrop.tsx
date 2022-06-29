import { useState } from 'react'
import './PreviewBackdrop.scss'
import { TextField, Select, Button, Backdrop, Box, Avatar } from '@mui/material'
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';

type handleClose = () => void

type setOpen = (set: boolean) => void

export type props = {
    user: number,
    open: boolean,
    setOpen: setOpen
}

function PreviewBackdrop({ open, setOpen, user }: props) {

    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleClose: handleClose = () => {
        setOpen(false);
    };

    const handleStock = () => {
        console.log(user);
    }

    const { register, control, handleSubmit, watch } = useForm({
        defaultValues: {
            data: [{ product: "", quantity: 1 }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "data"
    });

    return (
        <Backdrop
            open={open}
        >
            <Box sx={{ color: 'black', backgroundColor: 'white', borderRadius: '5px', boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px' }}>
                <div className='box-header'>
                    <Avatar sx={{ margin: '10px', bgcolor: 'tomato' }}>

                    </Avatar>
                    <p className="cus-name"></p>
                </div>
                <form onSubmit={handleSubmit(() => handleStock())}>
                    <div>
                        {fields.map((item, index) => {
                            return (
                                <div key={item.id} className='box-content'>
                                    <div className='content'>
                                        <p className='box-title'>Select Product</p>
                                        <select
                                            {...register(`data.${index}.product`)}
                                        >
                                            <option disabled value="">SELECT</option>
                                        </select>
                                    </div>
                                    <div className='content'>
                                        <p className='box-title'>Price</p>
                                    </div>
                                    <div className='content'>
                                        <p className='box-title'>Custom Quantity</p>
                                        <Controller
                                            render={({ field }) =>
                                                <input {...field}
                                                    value={quantity}
                                                    type="number"
                                                    min="1"
                                                // max={quanInStock}
                                                // onChange={e => setQuantity(parseInt(e.target.value))}
                                                // disabled={product.length == 0 ? true : false}
                                                />}
                                            name={`data.${index}.quantity`}
                                            control={control}
                                        />
                                    </div>
                                    <div className='content'>
                                        <p className='box-title'>Total Amount</p>
                                        {/* <p>{product.length === 0 && "-"}</p>
                                        <p>{quantity === 0 ? "-" : product && selectedProduct && quantity * selectedProduct.product_price}</p> */}
                                    </div>
                                    <div className='content'>
                                        <button type="button" onClick={() => remove(index)}>
                                            Delete
                                        </button>
                                    </div>
                                    <div className='content'>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                append({ product: product, quantity: quantity });
                                            }}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* {error && product.length === 0 && <Alert severity="error">Select Product</Alert>} */}

                    <div className="cus-action">
                        <div>
                            <Button
                                type='submit'
                                variant="contained"
                                disabled={quantity === 0 ? true : false}
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