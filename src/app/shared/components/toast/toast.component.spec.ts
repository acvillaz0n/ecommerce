import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { ToastService } from './services/toast.service';
import { signal } from '@angular/core';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  const toastServiceMock = {
    toastList: signal<String[]>([])
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
      providers:[
        {provide: ToastService, useValue: toastServiceMock}
      ]
    });
  });
  
  it('should render the toast message in the screen', () => {
    const expectedMessage = 'This is a test';
    toastServiceMock.toastList.set([expectedMessage])
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(component).toBeTruthy();
    expect(compiled.querySelector('.toast-body')?.textContent).toEqual(expectedMessage);
  });

  it('should NOT render any toast message in the screen', () => {
    toastServiceMock.toastList.set([])
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(component).toBeTruthy();
    expect(compiled.querySelector('.toast-body')).toBe(null);
  });

  it('should start the timer when the toast list has at least one message', () => {
    toastServiceMock.toastList.set(['message 1'])
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.timerSubscription).not.toBe(null);
  });

  it('should stop the timer when the toast list is empty', () => {
    toastServiceMock.toastList.set([])
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.timerSubscription).toBe(null);
  });
});
