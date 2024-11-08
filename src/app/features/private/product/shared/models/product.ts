export interface Product{
    id:number;
    title:string;
    price:number;
    category:string;
    description:string;
    image:string;
    rating: rating;
    quantity:number;
}

interface rating{
    rate: number;
    count: number;
}