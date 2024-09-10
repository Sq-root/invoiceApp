import { RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceContainerComponent } from './invoice-container.component';


fdescribe('Invoice Container  Component', () => {
  let component: InvoiceContainerComponent;
  let componentFixture: ComponentFixture<InvoiceContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceContainerComponent],
      imports: [RouterModule]
    });
    componentFixture = TestBed.createComponent(InvoiceContainerComponent);
    component = componentFixture.componentInstance
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
