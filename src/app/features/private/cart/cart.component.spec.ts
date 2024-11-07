import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { CartStore } from '../../../core/store/cart.store';
import { MatDialog } from '@angular/material/dialog';
import { ProductMockBuilder } from '../../../shared/mocks/product-mock';
import { signal } from '@angular/core';
import { Product } from '../products/shared/model/product';
import { of } from 'rxjs';

fdescribe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  const removeFromCartMock = jasmine.createSpy('removeFromCart');
  const cleanStore = jasmine.createSpy('cleanStore');
  const modalRefMock = jasmine.createSpyObj('MatDialog',['open']);
  modalRefMock.open = jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(0)
  });

  const cartStoreMock = {
    products: signal([new ProductMockBuilder()]),
    totalItems: signal(1),
    totalPrice: signal(200),
    removeFromCart:removeFromCartMock,
    cleanStore
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent, CartItemComponent, CartSummaryComponent],
      providers: [
        {provide: CartStore, useValue: cartStoreMock }, 
        {provide: MatDialog, useValue: modalRefMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should add the product in the store', () => {
    const expectedResult = '1 products'
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('#total-products')?.textContent).toEqual(expectedResult);
  })

  it('should render the product in the cart', () => {
    const expectedResult = 1;
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('app-cart-item')?.length).toBe(expectedResult);
  })
 
  it('should send a action to remove the product from the cart', () => {
    component.removeFromCart(new ProductMockBuilder() as Product)
    expect(removeFromCartMock).toHaveBeenCalled();
  })
 
  it('should open the confirm component', () => {
    component.confirmOrder();
    expect(modalRefMock.open).toHaveBeenCalled();
  })
});
