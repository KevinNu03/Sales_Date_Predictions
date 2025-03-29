import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { AddOrder, Customers, OrderCustomer } from '../../../shared/models/Customers';
import { Products } from '../../../shared/models/Products';
import { Shippers } from '../../../shared/models/Shippers';
import { ResponseHttp } from '../../../shared/models/Parametricos';
import { Employees } from '../../../shared/models/Employeed';

@Injectable({
  providedIn: 'root'
})
export class SalesDatePredictionServiceService {
  private apiUrl = environment.urlWebApiSalesDatePrediction;
  constructor( private http: HttpClient) { }

  GetCustomersOrdersDate(){
    return this.http.get<Customers[]>(`${this.apiUrl}api/Customers/GetCustomersOrdersDate`)
  }

  GetClientOrders(CustomerId: number){
    return this.http.get<OrderCustomer[]>(`${this.apiUrl}api/Customers/GetClientOrders/${CustomerId}`);
  }

  GetEmployees(){
    return this.http.get<Employees[]>(`${this.apiUrl}api/Employees/GetEmployees`);
  }

  GetProducts(){
    return this.http.get<Products[]>(`${this.apiUrl}api/Products/GetProducts`);
  }

  GetShippers(){
    return this.http.get<Shippers[]>(`${this.apiUrl}api/Shippers/GetShippers`);
  }
  AddNewOrder(addNewOrder: AddOrder){
    return this.http.post<string>(`${this.apiUrl}api/Customers/AddNewOrder`, addNewOrder);
  }
}
