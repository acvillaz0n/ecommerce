import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemComponent } from './cart-item.component';
import { ProductMockBuilder } from '../../../../../shared/mocks/product-mock';

fdescribe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let productMock = new ProductMockBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product',new ProductMockBuilder());
    fixture.detectChanges();
  });

  it('should render the product passed', () => { 
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('#card-item-title')?.textContent).toEqual(productMock.title);
    expect(compiled.querySelector('#card-item-category')?.textContent).toEqual(productMock.category);
    expect(compiled.querySelector('#card-item-price')?.textContent).toBe(`€${productMock.price}`);
    expect(compiled.querySelector('#card-item-quantity')?.textContent).toEqual(`Quantity: ${productMock.quantity}`);
  });
  
  it('should notify the remove of the product', () => { 
    const spyRemoveEmitter =spyOn(component.removeProduct,'emit');
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('#card-item-remove')?.dispatchEvent(new Event('click'))

    expect(spyRemoveEmitter).toHaveBeenCalled();
  });
});
