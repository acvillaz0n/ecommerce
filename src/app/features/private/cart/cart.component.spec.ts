import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CartStore } from '@core/store/cart.store';
import { CartStoreBuilder } from '@shared/mocks/cart-mock';
import { ProductMockBuilder } from '@shared/mocks/product-mock';
import { Product } from '../products/shared/model/product';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  const removeFromCartMock = jasmine.createSpy('removeFromCart');
  const cleanStoreMock = jasmine.createSpy('cleanStore');
  const modalRefMock = jasmine.createSpyObj('MatDialog',['open']);
  modalRefMock.open = jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(0)
  });

  const cartStoreMock = new CartStoreBuilder()
    .withTotalItems(0)
    .withRemoveFromCart(removeFromCartMock)
    .withCleanStore(cleanStoreMock)
    .build();

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
    const expectedResult = `${cartStoreMock.products().length} products`;
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('#total-products')?.textContent).toEqual(expectedResult);
  })

  it('should render the product in the cart', () => {
    const expectedResult = cartStoreMock.products().length;
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('app-cart-item')?.length).toBe(expectedResult);
  })
 
  it('should send a action to remove the product from the cart', () => {
    component.removeFromCart(new ProductMockBuilder().build())
    expect(removeFromCartMock).toHaveBeenCalled();
  })
 
  it('should open the confirm component', () => {
    component.confirmOrder();
    expect(modalRefMock.open).toHaveBeenCalled();
  })
});
