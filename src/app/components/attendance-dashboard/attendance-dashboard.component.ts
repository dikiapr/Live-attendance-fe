import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-attendance-dashboard',
  templateUrl: './attendance-dashboard.component.html',
  styleUrl: './attendance-dashboard.component.css',
  providers: [DatePipe],
})
export class AttendanceDashboardComponent implements OnInit {
  attendanceData: any[] = [];
  employeeData: any[] = [];
  checkInForm: FormGroup;
  webcamImage: WebcamImage | null = null;

  private trigger: Subject<void> = new Subject<void>();
  isCaptureButtonDisabled: boolean = false;
  isResetButtonEnabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private attendanceService: AttendanceService
  ) {
    this.checkInForm = this.fb.group({
      employeeId: [''],
      presenceType: [''],
      photo: [''],
    });
  }

  ngOnInit(): void {
    this.getAllAttendance();
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getEmployee().subscribe((res: any) => {
      // Pastikan data adalah array
      if (res && Array.isArray(res.data)) {
        this.employeeData = res.data; // Atur data dengan benar
      } else {
        console.error('Unexpected API response format:', res);
      }
    });
  }

  getAllAttendance() {
    this.attendanceService.getAttendance().subscribe((res: any) => {
      if (res && Array.isArray(res.data)) {
        this.attendanceData = res.data; // Atur data dengan benar
      } else {
        console.error('Unexpected API response format:', res);
      }
    });
  }

  checkOutEmployee(id: number): void {
    this.attendanceService.checkoutEmployee(id).subscribe((res: any) => {
      console.log('Checked out successfully', res);
      const index = this.attendanceData.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.attendanceData[index].checkOut = res.checkOut;
      }
      this.getAllAttendance();
    });
  }

  triggerSnapshot(): void {
    this.trigger.next();
    this.isCaptureButtonDisabled = true;
    this.isResetButtonEnabled = true;
  }

  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    // Save the photo as a Blob
    this.checkInForm.patchValue({
      photo: this.dataURItoBlob(webcamImage.imageAsDataUrl),
    });
  }

  resetPhoto(): void {
    this.webcamImage = null;
    this.checkInForm.patchValue({
      photo: '',
    });
    this.isCaptureButtonDisabled = false;
    this.isResetButtonEnabled = false;
  }

  submitCheckIn() {
    if (this.checkInForm.valid) {
      const formData = new FormData();
      formData.append('employeeId', this.checkInForm.get('employeeId')?.value);
      formData.append(
        'presenceType',
        this.checkInForm.get('presenceType')?.value
      );

      if (this.checkInForm.get('photo')?.value) {
        formData.append(
          'photo',
          this.checkInForm.get('photo')?.value,
          'photo.jpg'
        );
      }

      this.attendanceService.postCheckIn(formData).subscribe((response) => {
        this.getAllAttendance();
        let ref = document.getElementById('checkInModal');
        ref?.click(); // Close the modal
      });

      this.checkInForm.reset();

      this.resetPhoto();
    }
  }

  private dataURItoBlob(dataURI: string): Blob {
    const byteString = window.atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([intArray], { type: 'image/jpeg' });
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
