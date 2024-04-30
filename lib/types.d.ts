
import { Decimal128 } from 'mongodb';

type CollectionType = {
    _id:string,
    title:string,
    description:string,
    image:string,
    products:ProductType[];
}
type ProductType = {
    _id:string,
    title:string,
    description:string,
    media:[string],
    category:string,
    collections:[CollectionType],
    tags:[string],
    sizes:[string],
    colors:[string],
    price:Decimal128,
    expense:Decimal128,
    createdAt:Date,
    updatedAt:Date,
}