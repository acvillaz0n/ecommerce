import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });
  
  it('should add a new message in the toast list', () => {
    const expectedMessage ='estaEsUnaPrueba';

    service.buildToast(expectedMessage);

    expect(service.toastList().length).toBe(1);
    expect(service.toastList()[0]).toEqual(expectedMessage);
  });
  
  it('should remove a message from the toast list', () => {
    const expectedMessage ='estaEsUnaPrueba';
    
    service.buildToast(expectedMessage);
    expect(service.toastList().length).toBe(1);
    
    service.cleanToast();
    expect(service.toastList().length).toBe(0);
  });
});
