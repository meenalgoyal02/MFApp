import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function dateValidator():ValidatorFn{
    return(control:AbstractControl):ValidationErrors|null=>{
        var today=new Date();
        const invalid=control.value!=null &&
                        control.value!="" && 
                        Date.parse(control.value)<today.getTime();
      if(invalid)
      {
        return {
          dateValid:{
            valid:false
          }
        };
      }
      else{
     
        return null;
      }
    }
}