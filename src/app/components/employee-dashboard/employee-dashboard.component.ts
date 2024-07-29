import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../../model/employee-dashboard.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css',
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder: FormBuilder, private api: EmployeeService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nik: [''],
      name: [''],
      position: [''],
      phoneNumber: [''],
    });
    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    this.employeeModelObj.nik = this.formValue.value.nik;
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.position = this.formValue.value.position;
    this.employeeModelObj.phoneNumber = this.formValue.value.phoneNumber;

    this.api.postEmployee(this.employeeModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Employee Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe((res: any) => {
      if (Array.isArray(res)) {
        this.employeeData = res;
      } else if (res && typeof res === 'object' && Array.isArray(res.data)) {
        // Jika data berada dalam objek dengan properti `data`
        this.employeeData = res.data;
      } else {
        console.error('Unexpected API response format:', res);
      }
    });
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert('Employee deleted');
      this.getAllEmployee();
    });
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['nik'].setValue(row.nik);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['position'].setValue(row.position);
    this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
  }

  updateEmployeeDetails() {
    this.employeeModelObj.nik = this.formValue.value.nik;
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.position = this.formValue.value.position;
    this.employeeModelObj.phoneNumber = this.formValue.value.phoneNumber;
    this.api
      .updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res) => {
        alert('Updated Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }
}
