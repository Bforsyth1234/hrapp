import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  public createEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${environment.url}employees/`, employee);
  }

  public getEmployees(): Observable<any> {
    return this.http.get(`${environment.url}employees/`);
  }

  public editEmployee(employee: Employee) {
    return this.http.patch(`${environment.url}employees/${employee.id}`, employee);
  }

  public deleteEmployee(employee: Employee) {
    return this.http.delete(`${environment.url}employees/${employee.id}`);
  }
}
