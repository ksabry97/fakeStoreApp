import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FakeStoreService } from 'src/app/core/services/fake-store.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  errorMsg = '';
  constructor(
    private readonly fb: FormBuilder,
    private readonly fakeStoreServ: FakeStoreService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  // login
  login() {
    this.fakeStoreServ.login(this.loginForm.value).subscribe({
      next: (result: any) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem(
          'username',
          this.loginForm.controls['username'].value
        );
        this.router.navigateByUrl('/dashboard/home');
        this.errorMsg = '';
      },
      error: (err) => {
        this.errorMsg = err.error;
      },
      complete: () => {},
    });
  }
}
