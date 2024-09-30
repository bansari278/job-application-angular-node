import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  togglePassword = 'visibility';
  disabledPassword = true;
  typePassword = 'password';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.builderForm();
  }

  builderForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  toggle() {
    if (this.disabledPassword === true) {
      this.disabledPassword = false;
      this.togglePassword = 'visibility_off';
      this.typePassword = 'text';
    } else {
      this.disabledPassword = true;
      this.togglePassword = 'visibility';
      this.typePassword = 'password';
    }
  }

  onForgetPasswordClick() { }

onLoginClick() {
  const loginData = {
    email: this.loginForm.value.email,
    password: this.loginForm.value.password
  };
  this.http.post('http://localhost:3000/user/logIn', loginData).subscribe(
    (res: any) => {
      console.log('Login response:', res);
      localStorage.setItem('token', res.token); 
      localStorage.setItem('user', JSON.stringify(res.user)); 
      localStorage.setItem('role', res.user.role); 
      
      if (res && res.message !== "Not found!!!") {
        alert('Login successful!');
        this.router.navigate(['/viewApplication']);
      } else {
        console.log('Access denied:', res.message);
        alert('Login failed: User not found.');
      }
    },
    err => {
      console.error('Error during login:', err);
      alert('Login failed: Please try again.');
    }
  );
}


}
