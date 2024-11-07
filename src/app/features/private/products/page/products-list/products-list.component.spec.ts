import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { CartStore } from '@core/store/cart.store';
import { SelectableListComponent } from '@shared/components/selectable-list/selectable-list.component';
import { CartStoreBuilder } from '@shared/mocks/cart-mock';
import { ProductMockBuilder } from '@shared/mocks/product-mock';
import { ProductsService } from '../../shared/service/products.service';
import { ProductCardComponent } from './components/product-card/product-card.component';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  const addToCartMock = jasmine.createSpy('addToCart');
  const productServiceMock = jasmine.createSpyObj('ProductsService',['getProducts','getCategories']);
  const productsMock = [
    new ProductMockBuilder().withId(2).build(),
    new ProductMockBuilder().withId(1).build(),
    new ProductMockBuilder().withId(4).build(),
  ];
  productServiceMock.getProducts = jasmine.createSpy('getProducts').and.returnValue(of(productsMock))
  productServiceMock.getCategories = jasmine.createSpy('getCategories').and.returnValue(of(['Fashion']))

  const cartStoreMock = new CartStoreBuilder()
    .withProducts([])
    .withAddToCart(addToCartMock)
    .build();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent, ProductCardComponent],
      imports:[SelectableListComponent],
      providers: [
        {provide:CartStore, useValue: cartStoreMock},
        {provide: ProductsService, useValue: productServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the category in the page', () => {
    const expectCategories = 1;
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('app-selectable-list').length).toBe(expectCategories);
  });

  it('should render the list of products', () => {
    const expectedProducts = productsMock.length;
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('app-product-card').length).toBe(expectedProducts);
  });

  it('should call the action to add a product to the cart', () => {
    component.addToCart(productServiceMock[0])

    expect(addToCartMock).toHaveBeenCalled();
  });
});
