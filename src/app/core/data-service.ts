import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { customer } from 'src/models/customer';
import {Observable, ObservableLike} from 'rxjs';
import { emi } from 'src/models/emi';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentCustomer:customer;
  constructor(private http:HttpClient) { }

  getCurrentCustomerById(customerId:number):Observable<customer>{
    return this.http.get<customer>(`https://localhost:44349/api/customers/${customerId}`);
  }

  getAllCustomers():Observable<customer[]>
  {
    return this.http.get<customer[]>('https://localhost:44349/api/customers');
  }

  getEmiForCustomer(customerId:number):Observable<emi>{
    return this.http.get<emi>(`https://localhost:44349/api/customer/${customerId}/emis`);
  }

  addCustomerDetail(newCustomer:customer):Observable<customer>
  { 
      return this.http.post<customer>('https://localhost:44349/api/customers',newCustomer,{
        headers:new HttpHeaders({
          'Content-Type':'application/json'
        })
        
      })
      ;
  }

  updateCustomer(customerId:number,editCustomer:object):Observable<any>{
    console.log(customerId);
    return this.http.put(`https://localhost:44349/api/customers/${customerId}`,editCustomer,
    {
      headers:new HttpHeaders(
        {
        'Content-Type':'application/json'
        }
      )
    });
  }
  deleteCustomer(customerId:number):Observable<any>{
    return this.http.delete(`https://localhost:44349/api/customers/${customerId}`);
  }
}
