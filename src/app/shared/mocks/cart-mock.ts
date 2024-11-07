import { signal } from "@angular/core";
import { ProductMockBuilder } from "./product-mock";
import { Product } from "../../features/private/products/shared/model/product";

export class CartStoreBuilder{
    protected cartStoreMock = {
        products: signal([new ProductMockBuilder().build()]),
        totalItems: signal(1),
        totalPrice: signal(200),
        cleanStore: jasmine.createSpy('cleanStore'),
        removeFromCart:jasmine.createSpy('removeFromCart'),
        addToCart:jasmine.createSpy('addToCart')
    };

    withProducts(products: Product[]){
        this.cartStoreMock.products.set(products)
        return this;
    }

    withTotalItems(totalItems: number){
        this.cartStoreMock.totalItems.set(totalItems)
        return this;
    }

    withTotalPrice(totalPrice: number){
        this.cartStoreMock.totalPrice.set(totalPrice)
        return this;
    }

    withAddToCart(mockAddToCart:  jasmine.Spy<jasmine.Func>){
        this.cartStoreMock.addToCart = mockAddToCart;
        return this;
    }

    withRemoveFromCart(removeFromCart:  jasmine.Spy<jasmine.Func>){
        this.cartStoreMock.removeFromCart = removeFromCart;
        return this;
    }
   
    withCleanStore(cleanStore:  jasmine.Spy<jasmine.Func>){
        this.cartStoreMock.cleanStore = cleanStore;
        return this;
    }

    build(){
        return {
            ...this.cartStoreMock
        }
    }
}