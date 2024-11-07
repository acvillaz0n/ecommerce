import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { ProductMockBuilder } from '../../../../../../../shared/mocks/product-mock';
import {
  ActivatedRoute,
  provideRouter,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { ProductDetailComponent } from '../../../product-detail/product-detail.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  const productMock = new ProductMockBuilder().build();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      imports: [
        RouterLink
      ],
      providers: [
        provideRouter([{ path: '**', component: ProductDetailComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', productMock);
    fixture.detectChanges();
  });

  it('should notify to add product to cart', () => {
    const spyAddToCartEmitter = spyOn(component.addToCart,'emit').and.callFake(() => null);
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.querySelector('#product-card-add-to-cart')?.dispatchEvent(new Event('click'));

    expect(spyAddToCartEmitter).toBeTruthy();
  });
});
