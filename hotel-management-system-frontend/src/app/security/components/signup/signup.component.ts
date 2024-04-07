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
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      post: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, this.matchPasswords.bind(this)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      const user = {
        firstname: this.signupForm.get('firstname')?.value,
        lastname: this.signupForm.get('lastname')?.value,
        email: this.signupForm.get('email')?.value,
        phone: this.signupForm.get('phone')?.value,
        address: this.signupForm.get('address')?.value,
        state: this.signupForm.get('state')?.value,
        country: this.signupForm.get('country')?.value,
        post: this.signupForm.get('post')?.value,
        city: this.signupForm.get('city')?.value,
        password: this.signupForm.get('password')?.value
      }
      this.authService.signup(user).subscribe({
        next: (response) => {
          console.log(response)
          if(response.statusCode === 200){
            this.isLoading = false;
            this.router.navigate(["auth/login"])
          }else if (response.statusCode === 400) {
            this.snackBar.open(response.message, 'Close', { duration: 5000, verticalPosition: 'top' });
          } else if (response.statusCode === 500) {
            this.isLoading = false;
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
      console.log("Invalid form")
      this.signupForm.markAllAsTouched();
    }

  }

  matchPasswords(control: AbstractControl): { [key: string]: boolean } | null {
    const password = this.signupForm?.get('password')?.value;
    const confirmPassword = control.value;
    return password === confirmPassword ? null : { 'passwordsNotMatched': true };
  }
}
