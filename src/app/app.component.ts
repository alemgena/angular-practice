import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeAddEditComponent } from './employee-add-edit/employee-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email',"dob","gender","education","company","experiance","package","action",];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title = 'crud-employee';
  constructor(private _dialog:MatDialog, private _empService:EmployeeService){
  }
  openDialog(){
   const dialogRef= this._dialog.open(EmployeeAddEditComponent)
 dialogRef.afterClosed().subscribe({
  next:(val)=>{
    if(val){
      this.getEmployeeList()
    }
  }
 })
  }
  ngOnInit() {
    this.getEmployeeList()
  }
  getEmployeeList(){
    this._empService.getEmployee().subscribe({
      next:res=>{
this.dataSource=new MatTableDataSource(res)
this.dataSource.sort=this.sort
this.dataSource.paginator=this.paginator
      },error:(err:any)=>{
        console.log(err)
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deletEmployee(id:number){
    this._empService.deleteEmployee(id).subscribe({
      next:(res)=>{
        alert("Employee deleted")
        this.getEmployeeList()
      },
      error:(err:any)=>{
        console.log(err)
      }
    })
  }
  openEditModal(data:any){
      const dialogRef=   this._dialog.open(EmployeeAddEditComponent,{
        data})
      dialogRef.afterClosed().subscribe({
       next:(val)=>{
         if(val){
           this.getEmployeeList()
         }
       }
      })

  }
}
