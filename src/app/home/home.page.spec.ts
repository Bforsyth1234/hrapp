import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [HttpClientTestingModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    component.employees = [
      {
        id: 'testid1',
        name: 'test1',
        email: 'emailTest1@gmail.com'
      },
      {
        id: 'testid2',
        name: 'test2',
        email: 'emailTest2@gmail.com'
      }
    ];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter employees', () => {
    const event = {
      srcElement: {
        value: 'test1'
      }
    }
    component.filterEmployees(event)
    expect(component.filteredEmployees[0].email).toEqual('emailTest1@gmail.com');
    expect(component.filterEmployees.length).toEqual(1);
  });

  it('should filter employees based on previous search term', () => {
    component.searchTerm = 'test2';
    component.filterEmployees();
    expect(component.filteredEmployees[0].email).toEqual('emailTest2@gmail.com');
    expect(component.filterEmployees.length).toEqual(1);
  });

  it('should filter out all employees', () => {
    component.searchTerm = 'test3';
    component.filterEmployees();
    expect(component.filteredEmployees[0]).toBeFalsy();
  });
});
