import { Component,OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.scss']
})
export class EmployeeAddEditComponent implements OnInit {
  empForm:FormGroup
  constructor(private _fb:FormBuilder,private _empService:EmployeeService, private _dialogRef:MatDialogRef<EmployeeAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ){
    this.empForm=this._fb.group({
      firstName:'',
      lastName:'',
      email:"",
      dob:"",
      gender:"",
      education:"",
      experiance:"",
      company:"",
      package:""
    })
 
  }
  education:string[]=[
    "Matric","Diplomas","Intermediet","Graduated"
  ]
  ngOnInit(){
this.empForm.patchValue(this.data)
  }
  onFormSubmit(){
    if(this.data){
      this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
        next:(val:any)=>{
  alert("updated")
  console.log(val)
  this._dialogRef.close(true)
        },error:(err:any)=>{
          console.log(err)
        }
      })
    }
    else{
      this._empService.addEmployee(this.empForm.value).subscribe({
        next:(val:any)=>{
  alert("added")
  console.log(val)
  this._dialogRef.close(true)
        },error:(err:any)=>{
          console.log(err)
        }
      })
    }

  }
}
