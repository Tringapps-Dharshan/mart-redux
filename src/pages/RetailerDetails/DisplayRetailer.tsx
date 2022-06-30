import './DisplayRetailer.scss'

interface Product {
    id: string,
    name: string,
    quantity: number,
    date: Date
}

interface Displayretailer {
    data: {
        id: number;
        name: string;
        products: Product[];
        address: string;
    }
}

export const DisplayRetailer = ({ data }: Displayretailer) => {
    return (
        <div className='part'>
            <div className='part-header'>
                {data.name },{data.address}.
            </div>
            <div>
                {
                    data.products.map((items)=>(
                        <div key={items.id}>
                            {items.name} - {items.quantity}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
