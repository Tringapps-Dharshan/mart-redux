import './PreviewBackdrop.scss'
import { TextField, Select, Button, Backdrop, Box, Avatar } from '@mui/material'
type handleClose = () => void
type setOpen = (set: boolean) => void
export type props = {
    user: number,
    open: boolean,
    setOpen: setOpen
}
function PreviewBackdrop({ open, setOpen, user }: props) {
    const handleClose: handleClose = () => {
        setOpen(false);
    };
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
                <div className='box-content'>
                    <div className='content'>
                        <Select
                            sx={{ minWidth: 120 }}
                            size="small"
                            
                        >
                            
                        </Select>
                    </div>
                    <div className='content'>
                        
                    </div>
                    <div className='content'>
                        <TextField
                            inputProps={{
                                pattern: '[0-9]*',
                                min: 0,
                                max: 100,
                                title: 'Enter valid quantity.'
                            }}
                            type="number"
                            size="small"
                            sx={{ maxWidth: 120, margin: '0 10px' }}
                            //value={quantity}
                            //onChange={e => setQuantity(parseInt(e.target.value))}
                        />
                    </div>
                    <div className='content'>
                        {/* <p>{quantity === 0 ? "-" : product && selectedProduct && quantity * selectedProduct.product_price}</p> */}
                    </div>
                    <div className='content'>
                        <Button
                            variant="contained"
                            sx={{ margin: '10px' }}
                        >
                            Add
                        </Button>
                    </div>
                </div>
                <div className="cus-action">
                    <Button
                        variant="contained"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </div>
            </Box>
        </Backdrop>
    )
}

export default PreviewBackdrop