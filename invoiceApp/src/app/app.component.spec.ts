import { RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';


fdescribe('App  Component', () => {
  let component: AppComponent;
  let componentFixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[AppComponent],
      imports: [RouterModule]
    });
    componentFixture = TestBed.createComponent(AppComponent);
    component = componentFixture.componentInstance
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
