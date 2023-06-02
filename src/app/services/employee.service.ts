import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private url="http://localhost:3000/employees"
  constructor(private _http:HttpClient) { }
  addEmployee(data:any):Observable<any>{
    return this._http.post(this.url,data)
  }
  updateEmployee(id:number,data:any):Observable<any>{
    return this._http.put(`${this.url}/${id}`,data)
  }
  getEmployee():Observable<any>{
    return this._http.get(this.url)
  }
  deleteEmployee(id:number):Observable<any>{
    return this._http.delete(`${this.url}/${id}`)
  }
}
