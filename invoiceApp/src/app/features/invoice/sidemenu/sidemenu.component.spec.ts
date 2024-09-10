import { RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidemenuComponent } from './sidemenu.component';


fdescribe('Sidemenu Component', () => {
  let component: SidemenuComponent;
  let componentFixture: ComponentFixture<SidemenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidemenuComponent],
    });
    componentFixture = TestBed.createComponent(SidemenuComponent);
    component = componentFixture.componentInstance
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
