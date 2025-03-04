import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  postEmployee(data: any) {
    return this.http.post<any>('http://localhost:3000/api/employee', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getEmployee() {
    return this.http.get<any>('http://localhost:3000/api/employee').pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateEmployee(data: any, id: number) {
    return this.http
      .put<any>('http://localhost:3000/api/employee/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteEmployee(id: number) {
    return this.http
      .delete<any>('http://localhost:3000/api/employee/' + id)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
