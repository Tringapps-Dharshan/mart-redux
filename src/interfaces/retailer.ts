export interface Product {
    id: string,
    name: string,
    quantity: number,
    date: string
}

export interface Actiondetails {
    name: string;
    quantity: number;
    price: number;
    date: string
}

export interface Initialstatetype {
    retailerStock: {
        id: number,
        name: string,
        products: Product[],
        address: string
    }[]
}

export interface Actionpayload {
    id: number,
    details: Actiondetails[];
}
