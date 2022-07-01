import { useState } from 'react'
import { useAppSelector } from '../redux/hooks'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import './Header.scss'
import PreviewBackdrop from '../sharedpages/PreviewBackdrop'

interface Product {
    id: string,
    name: string,
    quantity: number,
    date: Date
}

interface Initialstatetype {
    stock: {
        id: number,
        name: string,
        products: Product[],
        address: string
    }[]
}

export type displayOverlays = (i: number) => void

const Header = () => {

    const retailer_details = useAppSelector((state) => state.retailer.retailerStock);
    const [user, setUser] = useState(0);
    const [open, setOpen] = useState<boolean>(false);
    const displayOverlay: displayOverlays = (i) => {
        setUser(i);
        setOpen(!open);
    }
    return (
        <div>
            <div className='header-button'>
                <h2 className='header-text'>DHS Mart</h2>
                <div>
                    {
                        retailer_details.map((data) =>
                            <Button
                                key={data.id}
                                variant="contained"
                                size="small"
                                onClick={() => displayOverlay(data.id)}
                            >
                                {data.name}
                            </Button>
                        )
                    }
                    <PreviewBackdrop open={open} setOpen={setOpen} user={user} />
                </div>
            </div>
            <div className='header-part'>
                {
                    retailer_details.map((details) => (
                        <div key={details.id} className='part'>
                            <h2 className='part-header'>{details.name}, {details.address}.</h2>
                            <div className='part-content'>
                                {details.products.length === 0 ? <p className='no-product'>Have not purchased yet.</p> :
                                    <TableContainer component={Paper} sx={{ margin: '8px', maxWidth: 500 }}>
                                        <Table aria-label="simple table">
                                            <TableHead sx={{ backgroundColor: 'lightskyblue' }}>
                                                <TableRow>
                                                    <TableCell>Products</TableCell>
                                                    <TableCell align="center">Quantity</TableCell>
                                                    <TableCell align="center">Date</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody sx={{ backgroundColor: 'lightblue' }}>
                                                {details.products.map((data) => (
                                                    <TableRow
                                                        key={data.id}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {data.name}
                                                        </TableCell>
                                                        <TableCell align="center">{data.quantity}</TableCell>
                                                        <TableCell align="center">{data.date}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Header