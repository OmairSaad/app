import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  title='';
  users:any;
  temp:any;
  id:string='';
  show:boolean = false;
  display_name:string = '';
  employeeDetail:any = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),

  });

  //get All users

  getAllUsers(){
    this.api.showEmployee().subscribe((e:any)=>{
      this.users = e.data;
      this.display_name = e.name;
      this.temp = e.data;
    }, (error: HttpErrorResponse)=>{
      this.tost.error('Failed', 'Authentication Failed', {timeOut:3000});
    })
  }
  get f(){
    return this.employeeDetail.controls;
  }
  constructor(private api: ApiService, private route: Router, private tost: ToastrService){}
  ngOnInit(): void{
    this.getAllUsers();
  }


  del(a:any){
    this.api.delEmployee(a._id).subscribe((e:any)=>{
      this.tost.success('Success!', 'Deleted');
      this.getAllUsers();
    })
  }

  erase(){
    localStorage.removeItem("token");
    this.tost.success('success', 'Logged Out');
    this.route.navigate(['/login']);
  }
  name='';
  email='';
  search(a:string){
    if(a=='name'){
    this.users = this.temp.filter((e:any)=>{
      return e.first_name.toLowerCase().includes(this.name.toLowerCase());
    })
  }else{
    this.users = this.temp.filter((e:any)=>{
      return e.email.toLowerCase().includes(this.email.toLowerCase());
    })
  }
  }
  edit(a:any){
  this.id = a._id;
  this.employeeDetail.patchValue(a);
  this.title = 'Edit Employee';
  this.show = false;
  }
  send(){
    document.getElementById("close")?.click();
    this.api.updateEmpl(this.id, this.employeeDetail.value).subscribe((res:any)=>{
      this.getAllUsers();
      this.tost.success('Success!', 'Updated');
    })
  }
  create(){
    this.title= 'Create Employee';
    this.show = true;
    this.employeeDetail.reset();
  }

  add(){
    document.getElementById("close")?.click();
    this.api.createEmpl(this.employeeDetail.value).subscribe((e:any)=>{
      this.tost.success('Success!', 'Created');
      this.employeeDetail.reset();
      this.getAllUsers();
    }, (error:HttpErrorResponse)=>{
      alert("Error check field");
    })
  }
}
