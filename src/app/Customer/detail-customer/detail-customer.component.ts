import { Component, OnInit, ViewChild } from "@angular/core";
import { customer } from "src/models/customer";
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "src/app/core/data-service";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { InfoDialogComponent } from "src/app/common/info-dialog/info-dialog.component";
import { DeleteCustomerComponent } from '../delete-customer/delete-customer.component';

@Component({
  selector: "app-detail-customer",
  templateUrl: "./detail-customer.component.html",
  styleUrls: ["./detail-customer.component.css"],
  providers: [DataService]
})
export class DetailCustomerComponent implements OnInit {
  isPageEditable: boolean = false;
  isDeletePage:boolean=false;
  @ViewChild("customerForm", null) customerForm: NgForm;
  currentCustomer: customer;
  currentCustomerId: number;
  

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router,
    private dialog: MatDialog
  ) {
    
    this.isPageEditable = false;
    this.route.params.subscribe(params => {
      this.currentCustomerId = params["customerId"];
      
    });
    this.route.queryParams.subscribe(
      params=>
      {        
          this.isDeletePage=(params['editCustomer']=='false');        
      }
    );

  }

  ngOnInit() {
    //call service method to retrieve relevant customer's details from the db
    this.dataService.getCurrentCustomerById(this.currentCustomerId).subscribe(
      (result: customer) => {
        this.currentCustomer = result;
        //this.mapCustomer(result);
      },
      error => console.log(error)
    );
  }

  editCustomer(editForm: NgForm) {
    if(this.isDeletePage)
    {
      this.openDeleteConfirmation();
      return;
    }

    //Make all the controls editable except name
    if (this.isPageEditable) {
      console.log(this.isPageEditable);
      var customerEdit = editForm.value.custData;
      customerEdit.name = this.currentCustomer.name;
      customerEdit.contactNum2 = null;
      customerEdit.contactNum3 = null;
      customerEdit.loadDaysPassed = 0;
      this.dataService
        .updateCustomer(this.currentCustomer.id, customerEdit)
        .subscribe(
          () => this.openInfoDialog("Details updated successfully!"),
          (error: any) => console.log(error)
        );
    } else {
      this.isPageEditable = true;
    }
  }

  openInfoDialog(message: string) {
    var dialogRef = this.dialog.open(InfoDialogComponent, {
      data: { infoText: message }
    });
    //check dialog closing
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["customers"]);
    });
    //Then redirect to another page
  }

  openErrorDialog(message:string){
    
  }

  openDeleteConfirmation(){
    var dialogRef = this.dialog.open(DeleteCustomerComponent, {
      data: { infoText: "This action will permanently delete the customer from system. Are you sure?" }
    });
    //check dialog closing
    dialogRef.afterClosed().subscribe(result => {
     if(result){
        this.dataService.deleteCustomer(this.currentCustomer.id)
            .subscribe(
              ()=>{
                this.openInfoDialog("Customer Deleted successfully");
                this.router.navigate(["customers"])
            },
              (error:any)=>console.log(error)
            );
            
     }
     
    });
   
  }
}
