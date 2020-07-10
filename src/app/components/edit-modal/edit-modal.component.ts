import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent implements OnInit {
  @Input() employee: Employee;

  public employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl(''),
    website: new FormControl(''),
  });
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.generateForm();
  }

  private generateForm(): void {
    if (this.employee) {
      this.employeeForm.setValue({
        name: this.employee.name,
        email: this.employee.email,
        phone: this.employee.phone,
        website: this.employee.website
      });
    }
  }

  public onSubmit(): void {
    this.employee ? this.editExistingEmployee() : this.addNewEmployee();
  }

  private editExistingEmployee() {
    this.employee.name = this.employeeForm.get('name').value;
    this.employee.email = this.employeeForm.get('email').value;
    this.employee.phone = this.employeeForm.get('phone').value;
    this.employee.website = this.employeeForm.get('website').value;
    this.modalController.dismiss(this.employee);
  }

  private addNewEmployee() {
    this.employee = this.employeeForm.value;
    this.modalController.dismiss(this.employee);
  }

  public cancelEdit(): void {
    this.modalController.dismiss();
  }

}
