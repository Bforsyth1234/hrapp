import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Employee } from '../models/employee.model';
import { EmployeesService } from '../services/employees.service';
import { EditModalComponent } from '../components/edit-modal/edit-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public employees: Employee[];
  public filteredEmployees: Employee[];
  public searchTerm = '';

  constructor(
    public modalController: ModalController,
    private employeesService: EmployeesService
  ) {}

  ngOnInit() {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeesService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  public displayEmployeeEditModal(employee: Employee): void {
    this.presentEditModal(employee).then().catch(err => console.log(err));
  }

  async presentEditModal(employee: Employee): Promise<void> {
    const modal = await this.modalController.create({
      component: EditModalComponent,
      componentProps: {employee}
    });
    modal.onDidDismiss().then(formData => {
      if (formData.data) {
        this.employeesService.editEmployee(formData.data).subscribe();
      }
    });
    return await modal.present();
  }

  public deleteEmployee(employee: Employee) {
    this.employeesService.deleteEmployee(employee).subscribe(() => {
      this.employees = this.employees.filter(e => e.id !== employee.id);
      this.filteredEmployees = this.employees;
      this.filterEmployees();
    });
  }

  public addNewEmployee() {
    this.presentNewEmployeeModal().then().catch(err => console.log(err));
  }

  async presentNewEmployeeModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: EditModalComponent,
    });
    modal.onDidDismiss().then(formData => {
      if (formData.data) {
        this.employeesService.createEmployee(formData.data).subscribe(data => {
          this.employees.push(data);
          this.filteredEmployees = this.employees;
          this.filterEmployees();
        });
      }
    });
    return await modal.present();
  }

  public filterEmployees(event?): void {
    if (event) {
      this.searchTerm = event.srcElement.value;
    }
    this.filteredEmployees = this.employees.filter(employee => {
      const employeeString = employee.name + employee.email + employee.phone + employee.website;
      return (employeeString.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
    });
  }
}
