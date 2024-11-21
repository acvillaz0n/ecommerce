import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from 'src/app/features/private/product/shared/models/product';

export interface CartState {
  products: Product[];
  totalItems: number;
  totalPrice: number;
}

export const initialState: CartState = {
  products: [],
  totalItems: 0,
  totalPrice: 0,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState<CartState>(initialState),
  withComputed(({ products }) => ({
    totalItems: computed(() => calculateProductCount(products())),
    totalPrice: computed(() => calculateTotalAmount(products())),
  })),
  withMethods(({ products, ...store }) => ({
    addToCart(product: Product) {
      const isProductInCart = products().find((item:Product) => item.id === product.id);

      if (isProductInCart) {
        isProductInCart.quantity++;
        isProductInCart.subTotal = isProductInCart.quantity * isProductInCart.price;
        patchState(store, {
          products: [...products()],
        });
      }else{
        patchState(store, {
          products: [...products(), product ]
        })
      }
    },
    removeFromCart(product: Product) {
      const isMoreThanOneProduct = products().find((item:Product) => item.id === product.id);

      if (isMoreThanOneProduct && isMoreThanOneProduct.quantity > 1) {
        isMoreThanOneProduct.quantity--;
        isMoreThanOneProduct.subTotal = isMoreThanOneProduct.quantity * isMoreThanOneProduct.price;
        patchState(store, {
          products: [...products()],
        });
      } else {
        const productsWithoutProduct = products().filter((item:Product) => item.id !== product.id)
        patchState(store, {
          products: [...productsWithoutProduct],
        });
      }
    },
    cleanStore() {
      patchState(store, initialState);
    },
  }))
);

function calculateTotalAmount(products: Product[]){
  return products.reduce((acc, product) => acc+product.price*product.quantity,0)
}
function calculateProductCount(products: Product[]){
  return products.reduce((acc, product) => acc+product.quantity, 0)
}

