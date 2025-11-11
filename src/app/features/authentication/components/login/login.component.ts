import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private _fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private storage = inject(StorageService);
  private router = inject(Router);
  loading = signal(false);
  loginErr = false
  loginForm!: FormGroup;
  ngOnInit(): void {
    this._initForm();
  }

  private _initForm() {
    this.loginForm = this._fb.group({
      user_name: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  login() {
    if (!this.loginForm.valid && this.loading()) return;
    this.loading.set(true)
    this.authService.signIn(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.success === true) {
          this.storage.storeToken(res.data.token);
          this.loading.set(false);
          this.router.navigate(['home']);
        }
      },
      error:()=>{
        this.loading.set(false)
        this.loginErr = true
      }
    });
  }
}
