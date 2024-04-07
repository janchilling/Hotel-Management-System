import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationServicesService} from "../../services/authenticationServices/authentication-services.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  isLoading: boolean = false;
  isError: boolean = false;
  returnUrl: any;



  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationServicesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  handleLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true; // Show loading spinner
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log(response)
          if(response.statusCode === 200){
            this.isLoading = false;
            this.router.navigateByUrl(this.returnUrl);
            this.authService.redirectUrl = null;
          }else if (response.statusCode === 401) {
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
      this.loginForm.markAllAsTouched();
    }
  }

}
