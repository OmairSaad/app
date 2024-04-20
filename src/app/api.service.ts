import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  private url = "https://employee-api-lmyt.onrender.com";

  signUp(a:any){
    return this.http.post(`${this.url}/sign`, a);
  }
  loginUp(a:any){
    return this.http.post(`${this.url}/login`, a);
  }
  showEmployee(){
    let headers= new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem?.("token")}`)
    return this.http.get(`${this.url}/get_user`, {headers});
  }

  delEmployee(id:string){
    return this.http.delete(`${this.url}/${id}`);
  }

  updateEmpl(id:string, a:any){
    return this.http.patch(`${this.url}/${id}`, a);
  }

  createEmpl(a:any){
        let headers= new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem?.("token")}`)
   return this.http.post(`${this.url}/create_user`, a, {headers});
  }
}
