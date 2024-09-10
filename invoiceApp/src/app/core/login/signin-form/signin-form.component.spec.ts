import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninFormComponent } from './signin-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RestSigninService } from 'src/app/shared/services/rest-signin.service';


// Mock classes
class MockRestSigninService {
  // Mock methods used in your component
}

class MockCookieService {
  // Mock methods used in your component
}

class MockRouter {
  // Mock methods used in your component
}

class MockNgxSpinnerService {
  // Mock methods used in your component
}

class MockToastrService {
  // Mock methods used in your component
}

fdescribe('SigninFormComponent', () => {
  let component: SigninFormComponent;
  let fixture: ComponentFixture<SigninFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninFormComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: RestSigninService, useClass: MockRestSigninService },
        { provide: CookieService, useClass: MockCookieService },
        { provide: Router, useClass: MockRouter },
        { provide: NgxSpinnerService, useClass: MockNgxSpinnerService },
        { provide: ToastrService, useClass: MockToastrService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SigninFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Component Instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should be create form obj', () => {
    expect(component.userLoginForm).toBeTruthy()
  });

  it('Should create form with specifc form controls', () => {
    expect(component.userLoginForm.contains('UserName')).toBeTruthy();
    expect(component.userLoginForm.contains('password')).toBeTruthy();
  });

  it('Should be invalid when there is no value ', () => {
    expect(component.userLoginForm.valid).toBeFalsy()
  });

  it('Should form valid when value is correct', () => {
    const form = component.userLoginForm;
    form.setValue({
      UserName: 'Admin',
      password: '123'
    });
    expect(form.valid).toBeTrue()
  });

  it('Should not accept space in value of UserName control', () => {
    const FormControl = component.userLoginForm.get('UserName');
    FormControl.setValue('  ');
    expect(FormControl.valid).toBeFalse()
  });

  it('Should be valid when enter valu in password', () => {
    const FormControl = component.userLoginForm.get('password');
    FormControl.setValue('123');
    expect(FormControl.valid).toBeTrue()
  });

  it('Shpuld print data whene form is valid',()=>{
    spyOn(console,'log');

    const form = component.userLoginForm;
    form.setValue({
      UserName: 'Admin',
      password: '123'
    });

  })
});
