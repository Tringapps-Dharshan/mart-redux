import { useState } from 'react'
import { useAppSelector } from '../redux/hooks'
import { Avatar, Button } from '@mui/material'
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
        console.log(i);

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
                    retailer_details.map((data) =>
                        <div className='part'>
                            <div className="part-header">
                                <Avatar className='part-avatar' sx={{ bgcolor: 'white', color: '#000', fontWeight:'700'}}>
                                    {data.name[0]}
                                </Avatar>
                                {data.name}, {data.address}
                            </div>
                        </div>)
                }
            </div>
        </div>
    )
}

export default Header