import { computed } from "@angular/core";
import { Product } from "../../features/private/products/model/product";
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals'

export interface CartState{
    products:Product[];
    totalItems: number;
    totalPrice: number;
}

export const initialState: CartState = {
    products:[ { "id": 1, "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday", "category": "men's clothing", "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", "rating": { "rate": 3.9, "count": 120 }, "quantity": 2 }, { "id": 4, "title": "Mens Casual Slim Fit", "price": 15.99, "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.", "category": "men's clothing", "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg", "rating": { "rate": 2.1, "count": 430 }, "quantity": 1 }, { "id": 3, "title": "Mens Cotton Jacket", "price": 55.99, "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.", "category": "men's clothing", "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", "rating": { "rate": 4.7, "count": 500 }, "quantity": 4 } ],
    totalItems:3,
    totalPrice:459.85
} 

export const CartStore = signalStore(
    {providedIn:'root'},
    withState(initialState),
    withComputed(({products}) =>({
        totalItems: computed( () => products().length),
    })),
    withMethods(({products, totalPrice, ...store}) => ({
        addToCart(productToStore: Product){
            const newProduct = structuredClone(productToStore);
            newProduct.quantity=1;

            const product  = products().find(prod => prod.id === newProduct.id);
            let updateProduct = [...products(), newProduct];
            
            if(product){
                newProduct.quantity+=product.quantity || 0;
                const ignoreProduct = products().filter(prod => prod.id !== newProduct.id);
                updateProduct = [...ignoreProduct, newProduct]
            }
            
            const totalPriceUpdate = totalPrice() + newProduct.price;
            patchState(store,{products:updateProduct, totalPrice:totalPriceUpdate});
        },
        removeFromCart(productToRemove: Product){
            let updateProduct = products();
            const product  = products().find(prod => prod.id === productToRemove.id);

            if(product && product?.quantity && product.quantity>1){
                product.quantity=product.quantity-1;
            }else{
                updateProduct = products().filter(prod => prod.id !== productToRemove.id);
            }
            
            const totalPriceUpdate = totalPrice() - productToRemove.price;
            patchState(store,{products:updateProduct, totalPrice: totalPriceUpdate});
        }
    })
)
);