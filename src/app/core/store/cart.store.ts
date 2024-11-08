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
    totalItems: computed(() =>
      products().reduce((prev, product) => {
        return prev + (product.quantity || 0);
      }, 0)
    ),
  })),
  withMethods(({ products, totalPrice, ...store }) => ({
    addToCart(productToStore: Product) {
      const newProduct = structuredClone(productToStore);
      newProduct.quantity = 1;

      const product = products().find((prod) => prod.id === newProduct.id);
      let updateProduct = [...products(), newProduct];

      if (product) {
        newProduct.quantity += product.quantity || 0;
        const ignoreProduct = products().filter(
          (prod) => prod.id !== newProduct.id
        );
        updateProduct = [...ignoreProduct, newProduct];
      }

      const totalPriceUpdate = totalPrice() + newProduct.price;
      patchState(store, {
        products: updateProduct,
        totalPrice: totalPriceUpdate,
      });
    },
    removeFromCart(productToRemove: Product) {
      let updateProduct = products();
      const product = products().find((prod) => prod.id === productToRemove.id);

      if (product && product?.quantity && product.quantity > 1) {
        product.quantity = product.quantity - 1;
      } else {
        updateProduct = products().filter(
          (prod) => prod.id !== productToRemove.id
        );
      }

      const totalPriceUpdate = totalPrice() - productToRemove.price;
      patchState(store, {
        products: updateProduct,
        totalPrice: totalPriceUpdate,
      });
    },
    cleanStore() {
      patchState(store, { products: [], totalItems: 0, totalPrice: 0 });
    },
  }))
);

