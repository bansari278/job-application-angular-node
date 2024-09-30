import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiURL = 'http://localhost:3000/application';

  constructor(private http: HttpClient) {}

  getApplicationById(id: string): Observable<any> {
    return this.http.get(`${this.apiURL}/application/${id}`);
  }

  updateApplication(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/application/${id}`, data);
  }
}
