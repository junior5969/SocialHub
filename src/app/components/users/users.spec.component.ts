/* import { ComponentFixture, TestBed } from '@angular/core/testing'; 
import { Users } from './users.component';
import { API } from '../../service/api';
import { of } from 'rxjs';
import { UserInterface } from '../../models/user-interface';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UsersComponent', () => {
  let component: Users;
  let fixture: ComponentFixture<Users>;
  let apiService: API;

  const dummyUsers: UserInterface[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com', gender: 'female', status: 'active' },
    { id: 2, name: 'Bob', email: 'bob@example.com', gender: 'male', status: 'active' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users, MatSnackBarModule],
      providers: [API,  
        provideHttpClient(),          // Serve _HttpClient
        provideHttpClientTesting()    // Serve HttpTestingController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
    apiService = TestBed.inject(API);

    spyOn(apiService, 'getUsers').and.returnValue(of(dummyUsers));
    spyOn(apiService, 'createUser').and.callFake((user) => of({ ...user, id: 3 }));
    spyOn(apiService, 'deleteUser').and.callFake((id) => {const user = dummyUsers.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return of(user);});

    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    expect(component.users).toEqual(dummyUsers);
    expect(component.displayedUsers).toEqual(dummyUsers);
    expect(component.totalUsers).toBe(dummyUsers.length);
  });

  it('should filter users by search term', () => {
    component.searchTerm = 'alice';
    component.onSearchUser();
    expect(component.displayedUsers.length).toBe(1);
    expect(component.displayedUsers[0].name).toBe('Alice');
  });

  it('should add new user', () => {
    const newUser: UserInterface = { id: 3, name: 'Charlie', email: 'charlie@example.com', gender: 'male', status: 'active' };
    component.onSubmit(newUser);
    fixture.detectChanges();
    expect(component.displayedUsers.find(u => u.name === 'Charlie')).toBeTruthy();
    expect(component.showFormUser).toBeFalse();
  });

  it('should delete user', () => {
    component.onDeleteUser(1);
    fixture.detectChanges();
    expect(component.users.find(u => u.id === 1)).toBeUndefined();
  });
});
 */