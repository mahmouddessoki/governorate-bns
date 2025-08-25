import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private _fb = inject(FormBuilder);
  loginForm !: FormGroup;


  private _initForm() {
    this._fb.group({
      name:['',Validators.required],
      password:['',Validators.required]
    })
  }




}
