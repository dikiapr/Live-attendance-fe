import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance-dashboard',
  templateUrl: './attendance-dashboard.component.html',
  styleUrl: './attendance-dashboard.component.css',
  providers: [DatePipe],
})
export class AttendanceDashboardComponent implements OnInit {
  attendanceData: any[] = [];

  constructor(private api: AttendanceService) {}

  ngOnInit(): void {
    this.getAllAttendance();
  }

  getAllAttendance() {
    this.api.getAttendance().subscribe((res: any) => {
      if (Array.isArray(res.data)) {
        this.attendanceData = res.data;
      } else {
        console.error('Unexpected API response format:', res);
      }
    });
  }

  checkOutEmployee(id: number): void {
    this.api.checkoutEmployee(id).subscribe((res: any) => {
      console.log('Checked out successfully', res);
      const index = this.attendanceData.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.attendanceData[index].checkOut = res.checkOut;
      }
      this.getAllAttendance();
    });
  }
}
