import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/data-service';
import { customer } from 'src/models/customer';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css'],
  providers:[DataService]
})
export class ListCustomerComponent implements OnInit {

  customers:customer[];

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getAllCustomers().subscribe(
      (customers:customer[])=>{this.customers=customers; console.log(customers);},
      (error:any)=>{console.log('Error encountered')},
      ()=>console.log('method call finished')
    );
  }

}
