import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private baseUrl = 'http://localhost:3000/api/attendance';

  constructor(private http: HttpClient) {}

  getAttendance(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  postCheckIn(formData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, formData);
  }

  checkoutEmployee(id: number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/checkout/${id}`, {});
  }
}
