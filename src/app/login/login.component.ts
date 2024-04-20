import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private api: ApiService, private route: Router, private tost: ToastrService){}
  loginForm:any = new FormGroup({
    email: new FormControl('' , [Validators.required, Validators.pattern(/([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/)]),
    password: new FormControl('', [Validators.required])
  })
  
  loading:boolean= false;
  get f(){
    return this.loginForm.controls
  }
  
  send(){
  this.loading = true;
  this.api.loginUp(this.loginForm.value).subscribe((e:any)=>{
    this.loading= false;
    localStorage.setItem("token", e.token);
    this.tost.success('Success!', 'Login');
    this.route.navigate(['/user']);
    this.loginForm.reset();
  }, (error: HttpErrorResponse)=>{
    this.loading= false;
      this.tost.error('Failed!', `${error.error.msg}`);
      alert(error.error.msg);
  })
  }
  
}
