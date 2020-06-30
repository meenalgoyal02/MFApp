import { Component, OnInit } from '@angular/core';
import { customer } from 'src/models/customer';
import { emi } from 'src/models/emi';
import {ActivatedRoute} from '@angular/router'
import { DataService } from 'src/app/core/data-service';
import { FormGroup, FormControl,FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { emiPayDetails } from 'src/models/emiPayDetails';
import { DatePipe } from '@angular/common';
import {debounceTime} from 'rxjs/operators';


 //Validation rule- emiAmount paid needs to be a multiple of the emiAmount for the customer
 function validateEmi(emiAmount:number):ValidatorFn{
  return (c:AbstractControl):{[key:string]:boolean}|null=>{
      if(c.value && c.value>0 && c.value%emiAmount==0){
       
        return null;
      }
      else{
        
        return {'invalidEmiAmount':true};
      }
    };
 }

@Component({
  selector: 'app-emi-detail',
  templateUrl: './emi-detail.component.html',
  styleUrls: ['./emi-detail.component.css'],
  providers:[DataService,DatePipe]
})
export class EmiDetailComponent implements OnInit {
  currentCustomerId:number;
  currentCustomer:customer;  
  emiDetailForm:FormGroup;
  customerEmiPayDetails:emiPayDetails;
  emiAmountErrorMsg:string;

  constructor(private route:ActivatedRoute,private dataService:DataService,private fb:FormBuilder,private datePipe: DatePipe) 
  {
      this.route.params.subscribe(
        params=>{
          this.currentCustomerId=params['customerId'];
        }
      );
      this.intiEmptyForm();
  }

  ngOnInit() 
  {   
    //call service method to retrieve relevant customer's emi details from the db
    this.dataService.getEmiForCustomer(this.currentCustomerId).subscribe(
      (emiResult:emi)=>
      {           
        if(emiResult)
        {
        this.populateModel(emiResult);
        this.initForm(emiResult);     
      }           
      },
      (error:any)=>console.log(error),
      ()=>console.log('Request completed')
    );   
  }

  populateModel(emiDetail:emi)
  {
    if(emiDetail){
      this.customerEmiPayDetails={
        id: emiDetail.id,
        emiAmount:emiDetail.amount,
        emiLastPayDate: new Date(emiDetail.emiPayDate),
        totalEmiPaid:emiDetail.totalAmountPaid,
        emiDueDate: new Date(emiDetail.dueStartDate)
      };
    }
  }

  initForm(emiDetail:emi){
    var date=new Date();

    if(emiDetail){
      this.emiDetailForm=this.fb.group(
        {
          emiPayDate:{value:this.datePipe.transform(date,"yyyy-MM-dd"),disabled:true},
          emiAmount:[emiDetail.amount,[validateEmi(this.customerEmiPayDetails.emiAmount),Validators.required]],
          dueStartDate:{value:this.datePipe.transform(date.setDate(date.getDate()+1),"yyyy-MM-dd"),disabled:true},
          agentName:new FormControl()
        }
      );
    }
   
    const emiAmountCtrl=this.emiDetailForm.get('emiAmount');
    emiAmountCtrl.valueChanges.pipe(
      debounceTime(1000)
    )
    .subscribe(value=>this.updateValidationMsg(emiAmountCtrl));
  }

  intiEmptyForm(){
    var date=new Date();

    this.emiDetailForm=this.fb.group({
      emiPayDate:{value:this.datePipe.transform(date,"yyyy-MM-dd"),disabled:true},
      emiAmount:[0,[validateEmi(100),Validators.required]],
      dueStartDate:new FormControl(),
      agentName:new FormControl()
    });
  }

  updateValidationMsg(c:AbstractControl){
    this.emiAmountErrorMsg='';
    if((c.touched || c.dirty) && c.errors){
      this.emiAmountErrorMsg='Please input valid EMI Amount';
    }
  }

  SaveEmiDetail(){
    
  }

}
