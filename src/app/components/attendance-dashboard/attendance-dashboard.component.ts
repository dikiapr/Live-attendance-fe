import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-attendance-dashboard',
  templateUrl: './attendance-dashboard.component.html',
  styleUrl: './attendance-dashboard.component.css',
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
}
