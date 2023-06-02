import { Component,OnInit } from '@angular/core';
import { Employee } from '../model/employee';


@Component({
  selector: 'app-form-model',
  templateUrl: './form-model.component.html',
  styleUrls: ['./form-model.component.scss']
})
export class FormModelComponent implements OnInit {
 employeForm:Employee=new Employee("","","")
constructor(){

}
onSubmit() {
  // Handle form submission logic
  console.log(this.employeForm);
}
ngOnInit(): void {
}
}
