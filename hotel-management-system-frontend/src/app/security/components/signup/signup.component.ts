import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationServicesService} from "../../services/authenticationServices/authentication-services.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;

  constructor(
    private authService: AuthenticationServicesService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router)
  {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      streetAddress: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.matchPasswords.bind(this)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const user = { ...this.signupForm.value };
      delete user.confirmPassword;
      this.authService.signup(user).subscribe({
        next: (response) => {
          this.isLoading = false;
          if(response.statusCode === 200){
            this.router.navigate(["auth/login"])
          }else if (response.statusCode === 400) {
            this.snackBar.open(response.message, 'Close', { duration: 5000, verticalPosition: 'top' });
          } else if (response.statusCode === 500) {
            this.isError = true;
          }

        },
        error: (error) => {
          console.error('Login error:', error);
          this.isLoading = false;
          this.isError = true;
        }
      });
    } else {
      this.snackBar.open("Please enter valid details", 'Close', { duration: 5000, verticalPosition: 'top' });
      this.signupForm.markAllAsTouched();
    }

  }

  matchPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = this.signupForm?.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { 'passwordsNotMatched': true };
  }
}
