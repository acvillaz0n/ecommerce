import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { CartStore } from '@core/store/cart.store';
import { CartStoreBuilder } from '@shared/mocks/cart-mock';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const cartStoreMock = new CartStoreBuilder()
    .withTotalItems(0)
    .build();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers:[
        {provide: CartStore, useValue: cartStoreMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });
  
  it('should display the totalItems ina badge', () => {
    cartStoreMock.totalItems.set(1);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('#navbar-total-items')?.textContent?.trim()).toBe(cartStoreMock.totalItems().toString());
  });
  
  it('should NOT display the totalItems ina badge', () => {
    cartStoreMock.totalItems.set(0);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('#navbar-total-items')).toBe(null);
  });
});
