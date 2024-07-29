import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'fe-attendance';

  constructor(private router: Router) {}

  isAttendanceActive(): boolean {
    return this.router.url.includes('attendance-list');
  }

  isEmployeeActive(): boolean {
    return this.router.url.includes('employee-list');
  }
}
