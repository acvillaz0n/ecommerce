import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { LoadingService } from '../../services/loading.service';

fdescribe('LoadingComponent', () => {
    let component: LoadingComponent;
    let fixture: ComponentFixture<LoadingComponent>;
    let loadingService: LoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoadingComponent
      ],
      providers: [
        LoadingService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(LoadingService)

  });

  it('should show the loading', () => {
    const isLoading = true;
    const spyService = spyOn(loadingService,'loading').and.returnValue(isLoading);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loader')?.textContent).toBeDefined();
    expect(spyService).toHaveBeenCalled();
  });
  
  it('should NOT show the loading', () => {
    const isLoading = false;
    const spyService = spyOn(loadingService,'loading').and.returnValue(isLoading);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loader')?.textContent).not.toBeDefined();
    expect(spyService).toHaveBeenCalled();
  });

});

