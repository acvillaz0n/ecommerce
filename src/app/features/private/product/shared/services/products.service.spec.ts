import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { provideHttpClient } from '@angular/common/http';
import { ProductMockBuilder } from '@shared/mocks/product-mock';
import { environment } from 'src/environments/environment';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let API = environment.API;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(),provideHttpClientTesting(), ProductsService]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should get all products', () => {
    const expectedProducts = [new ProductMockBuilder().build(),new ProductMockBuilder().build(),new ProductMockBuilder().build() ];
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(3)
    })
    const req = httpMock.expectOne(`${API}/products`);
    req.flush(expectedProducts);
    expect(req.request.method).toBe('GET');
    httpMock.verify();
    expect(service).toBeTruthy();
  });

  it('should get all categories from product', () => {
    const expctedCategories = ['fashion','men clothes'];
    service.getCategories().subscribe(categories => {
      expect(categories.length).toBe(expctedCategories.length)
    })
    const req = httpMock.expectOne(`${API}/products/categories`);
    req.flush(expctedCategories);
    expect(req.request.method).toBe('GET');
    httpMock.verify();
    expect(service).toBeTruthy();
  });

  it('should get an especific product', () => {
    const productId = 2;
    const productMock = new ProductMockBuilder().build();
    service.getProduct(productId).subscribe(product => {
      expect(product.title).toBe(productMock.title);
      expect(product.description).toBe(productMock.description);
      expect(product.image).toBe(productMock.image);
      expect(product.category).toBe(productMock.category);
      expect(product.quantity).toBe(productMock.quantity);
      expect(product.price).toBe(productMock.price);
    })
    const req = httpMock.expectOne(`${API}/products/${productId}`);
    req.flush(productMock);
    expect(req.request.method).toBe('GET');
    httpMock.verify();
    expect(service).toBeTruthy();
  });
});
