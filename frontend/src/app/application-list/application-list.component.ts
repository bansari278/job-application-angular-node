import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApplicationForm } from '../models/application';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applications: ApplicationForm[] = []; 
  searchTerm: string = '';
  isAdmin: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getData();
    const role = localStorage.getItem('role');
    this.isAdmin = role === 'admin';
  }

  get filteredApplications() {
    if (!this.searchTerm) {
      return this.applications;
    }
    return this.applications.filter(app =>
      app.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  paginationInstance: PaginationInstance = {
    id: 'custom-pagination',
    itemsPerPage: this.itemsPerPage,
    currentPage: this.currentPage,
  };

  onPageChange(page: number) {
    this.currentPage = page;
  }

  getData() {
    this.http.get('http://localhost:3000/application/applications/').subscribe(
      (res: any) => {
        this.applications = res;
      },
      (err) => {
        console.log('ERROR IN Getting Applications...', err);
      }
    );
  }

  addApplication() {
    this.router.navigate(['/addApplication']);
  }

  editApplication(id: string) {
    this.router.navigate(['/addApplication/' + id]);
  }

  deleteApplication(id: string) {
    this.http
      .delete('http://localhost:3000/application/application/' + id)
      .subscribe((res: any) => {
        this.getData();
        alert('Application deleted successfully.');
      }, err => {
        console.log(err);
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    console.log('Successfully logged out.');
    this.router.navigate(['/login']);
  }
}
