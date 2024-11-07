import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSummaryComponent } from './cart-summary.component';
import { ProductMockBuilder } from '@shared/mocks/product-mock';
import { CartStoreBuilder } from '@shared/mocks/cart-mock';
import { CartStore } from '@core/store/cart.store';

describe('CartSummaryComponent', () => {
  let component: CartSummaryComponent;
  let fixture: ComponentFixture<CartSummaryComponent>;
  let productMock = new ProductMockBuilder().build();

  const cartStoreMock = new CartStoreBuilder()
    .withTotalPrice(200.00)
    .withProducts([productMock])
    .build();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSummaryComponent],
      providers: [
        {provide: CartStore, useValue: cartStoreMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the summary information', () => {
    const shippingPriceResult = 5.99;
    const ivaResult = cartStoreMock.totalPrice() * 0.21
    const totalPrice = cartStoreMock.totalPrice() + ivaResult + shippingPriceResult;
    const subtotal = cartStoreMock.totalPrice().toFixed(2);

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector("#summary-total-price")?.textContent).toEqual(`€${totalPrice}`);
    expect(compiled.querySelector("#summary-subtotal-price")?.textContent).toEqual(`€${subtotal}`);
    expect(compiled.querySelector("#summary-shipping-price")?.textContent).toEqual(`€${shippingPriceResult}`);
    expect(compiled.querySelector("#summary-total-iva")?.textContent).toEqual(`€${ivaResult}.00`);
  });

  it('should notify pay event to parent', () => {
    const spyPayAction = spyOn(component.confirmOrder,'emit').and.callFake(() => null);
    const compiled = fixture.nativeElement as HTMLElement;

    compiled.querySelector("#pay-cart-credit-card")?.dispatchEvent(new Event('click'))
    compiled.querySelector("#pay-cart-paypal")?.dispatchEvent(new Event('click'))

    expect(spyPayAction).toHaveBeenCalledTimes(2);
  });
});
