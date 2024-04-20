import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet,RouterLink],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.css'
})
export class SignComponent {
  constructor(private api: ApiService, private route: Router){};
  loginForm:any  = new FormGroup({
    firstName: new FormControl('', Validators['required']),
    lastName: new FormControl('', Validators['required']),
    email: new FormControl('', [Validators.required , Validators.pattern(/([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/)]),
    password: new FormControl('', Validators['required'])
  })
  loading:boolean = false;
  get f(){
    return this.loginForm.controls;
  }
  send(){
    this.loading = true;
    this.api.signUp(this.loginForm.value).subscribe((e:any)=>{
      this.loading = false;
      alert(e.msg);
      this.loginForm.reset();
      this.route.navigate(['login']);
    }, (error: HttpErrorResponse)=>{
      this.loading = false
      alert(error.error.msg);
      this.route.navigate(['login']);
    })
  }
 
  ngOnInit(): void {
   
  }

}
