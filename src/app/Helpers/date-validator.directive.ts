import { Directive } from '@angular/core';
import { Validator, FormControl, AbstractControl,ValidatorFn, NG_VALIDATORS } from '@angular/forms';
import {dateValidator} from './date-validator';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Directive({
  selector: '[dateValid][ngModel]',
  providers:[
    {provide:NG_VALIDATORS,useExisting:DateValidatorDirective,multi:true}
  ]
  
})
export class DateValidatorDirective implements Validator {
 
  validate(c:FormControl){
    return dateValidator()(c);
  }



}
