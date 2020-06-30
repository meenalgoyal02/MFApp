import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, FormGroup, AbstractControl, FormArray, FormControl } from '@angular/forms';
import {customer} from '../../../models/customer';
import { DataService } from 'src/app/core/data-service';
import {MatDialog} from '@angular/material/dialog';
import { InfoDialogComponent } from 'src/app/common/info-dialog/info-dialog.component';
import { Router } from '@angular/router';
import {dateValidator} from '../../Helpers/date-validator';

function validateFinanceParams(c:AbstractControl):{[key:string]:boolean}|null{
  let financeAmount=c.get('financeAmount').value;
  let emiAmount=c.get('emiAmount').value;

  if(financeAmount>0 && emiAmount>0 && financeAmount<=emiAmount) 
  {
    return{'invalidFinanceParam':true};
  }
  else
  {
    return null;
  }
};

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
  providers:[DataService]
})
export class AddCustomerComponent implements OnInit {
  customerForm:FormGroup;
  emiAmountError:string;
  get contactNums(): FormArray {
    return this.customerForm.get('contactNums') as FormArray;
  }
  constructor(private dataService:DataService,private dialog:MatDialog,private router:Router,private fb:FormBuilder) { }

  ngOnInit() {
    this.initEmptyForm();
  }


  addCustomer(){
    
         //Convert customer form values into customer model and send to the service method
     var customerDetails=this.customerForm.value;
     let newCustomer:customer=<customer> customerDetails.custData;
     newCustomer.id=0;
     newCustomer.contactNum2=null;
    newCustomer.contactNum3=null;
    newCustomer.loadDaysPassed=0;

    this.dataService.addCustomerDetail(newCustomer)
    .subscribe(
      (result:customer)=>{this.openInfoDialog('Customer added successfully')},
      (error:any)=>console.log(error)
    );
    
    
  }

  openInfoDialog(message:string){
  var dialogRef=this.dialog.open(InfoDialogComponent,{data:{infoText:message}});
  //check dialog closing
  dialogRef.afterClosed().subscribe(result=>{
    this.router.navigate(['customers']);
  });
  //Then redirect to another page
    }

initEmptyForm(){
  var date=new Date();
  this.customerForm=this.fb.group(
    {
    name:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    alias:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    contactNums:new FormArray([this.addContactField()]),
    loanDate:[date,[Validators.required,dateValidator()]],
    finFactors:this.fb.group(
      {
        financeAmount:[1000,[Validators.required,Validators.min(1000)]],
        emiAmount:[0,[Validators.required,Validators.min(0)]],
        interestAmount:[0,[Validators.required,Validators.min(0)]],
        fileCharge:[0,[Validators.required,Validators.min(0)]],
        fileAmount:[0,[Validators.required,Validators.min(0)]]
      },{validator:validateFinanceParams})
  });

  var emiAmountControl=this.customerForm.get('emiAmount');
  if(emiAmountControl){
  emiAmountControl.valueChanges.subscribe(value=>this.checkEmiAmountValidation(emiAmountControl));
}
console.log(this.contactNums);
}

checkEmiAmountValidation(control:AbstractControl){
  this.emiAmountError='';
  var financeAmount=this.customerForm.get('financeAmount').value;

  if(control.value && control.value>0 && control.value>=financeAmount){
    this.emiAmountError='Please enter an amount less than finance amount';
    //control.valid=false;
  }
}

addContactField():AbstractControl{
  return new FormControl(
  '',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]
  );
}
AddcontactNums(){
  this.contactNums.push(this.addContactField());
}
}
