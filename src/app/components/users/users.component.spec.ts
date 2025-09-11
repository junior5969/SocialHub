import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { API } from '../../service/api';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { FormComponent } from '../form/form.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let apiMock: any;
  let formComponentMock: any;

  const mockUsers = [
    { id: 1, name: 'Mario Rossi', email: 'mario@example.com', gender: 'male' as const, status: 'active' as const },
    { id: 2, name: 'Luigi Bianchi', email: 'luigi@example.com', gender: 'male' as const, status: 'inactive' as const },
  ];

  const mockNewUser = {
    id: 3,
    name: 'Giulia Verdi',
    email: 'giulia@example.com',
    gender: 'female' as const,
    status: 'active' as const,
  };

  beforeEach(async () => {
    apiMock = {
      getUsers: jasmine.createSpy('getUsers').and.returnValue(of(mockUsers)),
      createUser: jasmine.createSpy('createUser').and.returnValue(of(mockNewUser)),
      deleteUser: jasmine.createSpy('deleteUser').and.returnValue(of({})),
    };

    formComponentMock = {
      resetForm: jasmine.createSpy('resetForm'),
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: API, useValue: apiMock },
        provideRouter([]), // sostituisce RouterTestingModule deprecato
      ],
      imports: [UsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    component.formComponent = formComponentMock;
    fixture.detectChanges(); // inizializza component
  });

  // 🔧 reset degli array PRIMA di ogni test
  beforeEach(() => {
    component.users = [...mockUsers];
    component.displayedUsers = [...mockUsers];
    component.totalUsers = mockUsers.length;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(apiMock.getUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(2);
    expect(component.displayedUsers.length).toBe(2);
    expect(component.totalUsers).toBe(2);
  }));

it('should submit a new user', fakeAsync(() => {
  component.formComponent = formComponentMock;

  const formValue = {
    name: 'Giulia Verdi',
    email: 'giulia@example.com',
    gender: 'female' as const,
    status: 'active' as const,
  };

  component.users = [...mockUsers];            // users resta con 2 utenti
  component.displayedUsers = [...mockUsers];   // displayed parte con 2 utenti

  component.onSubmit(formValue);
  tick();

  // verifica che l'API sia stata chiamata
  expect(apiMock.createUser).toHaveBeenCalledWith(formValue);

  // verifica che il form sia stato resettato
  expect(component.formComponent.resetForm).toHaveBeenCalled();

  // verifica che SOLO displayedUsers sia aggiornato
  expect(component.displayedUsers.length).toBe(3);
  expect(component.displayedUsers.find(u => u.id === mockNewUser.id)).toEqual(mockNewUser);

  // verifica che users non sia stato toccato
  expect(component.users.length).toBe(2);
}));

  it('should filter users on search', () => {
    component.searchTerm = 'Luigi';
    component.onSearchUser();
    expect(component.displayedUsers.length).toBe(1);
    expect(component.displayedUsers[0].name).toBe('Luigi Bianchi');
  });

  it('should reset displayedUsers if searchTerm is empty', () => {
    component.searchTerm = '   ';
    component.onSearchUser();
    expect(component.displayedUsers.length).toBe(2);
  });

  it('should delete a user', fakeAsync(() => {
    component.onDeleteUser(1);
    tick();

    // verifica che l'utente sia stato rimosso
    expect(component.users.length).toBe(1);
    expect(component.users.find(u => u.id === 1)).toBeUndefined();
    expect(component.displayedUsers.length).toBe(1);
    expect(component.displayedUsers.find(u => u.id === 1)).toBeUndefined();
  }));

  it('should toggle showFormUser', () => {
    component.showFormUser = false;
    component.toggleForm();
    expect(component.showFormUser).toBeTrue();
    component.toggleForm();
    expect(component.showFormUser).toBeFalse();
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});
