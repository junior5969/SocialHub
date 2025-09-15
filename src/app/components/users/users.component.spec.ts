import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { API } from '../../service/api';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { FormComponent } from '../form/form.component';
import { UserInterface } from '../../models/user-interface';
import { NewUserInterface } from '../../models/new-user-interface';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let apiMock: any;
  let formComponentMock: any;

  const mockUsers : UserInterface []= [
    { id: 1, name: 'Mario Rossi', email: 'mario@example.com', gender: 'male' as const, status: 'active' as const },
    { id: 2, name: 'Luigi Bianchi', email: 'luigi@example.com', gender: 'male' as const, status: 'inactive' as const },
  ];

  const mockNewUser : NewUserInterface = {
    name: 'Giulia Verdi',
    email: 'giulia@example.com',
    gender: 'female' as const,
    status: 'active' as const,
  };

    const mockCreatedUser : UserInterface = {
    id: 3,
    name: 'Giulia Verdi',
    email: 'giulia@example.com',
    gender: 'female' as const,
    status: 'active' as const,
  };

  beforeEach(async () => {
    apiMock = {
      getUsers: jasmine.createSpy('getUsers').and.returnValue(of(mockUsers)),
      createUser: jasmine.createSpy('createUser').and.returnValue(of(mockCreatedUser)),
      deleteUser: jasmine.createSpy('deleteUser').and.returnValue(of({})),
    };

    formComponentMock = {
      resetForm: jasmine.createSpy('resetForm'),
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: API, useValue: apiMock },
        provideRouter([]), // sostituisce RouterTestingModule 
      ],
      imports: [UsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    component.formComponent = formComponentMock;
    fixture.detectChanges(); // inizializza il component
  });

  // reset degli array prima di ogni test
  beforeEach(() => {
    component.users = [...mockUsers];
    component.displayedUsers = [...mockUsers];
    component.totalUsers = mockUsers.length;
  });

  it('dovrebbe creare il componente', () => {
    expect(component).toBeTruthy();
  });

  it('dovrebbe caricare gli utenti ad ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(apiMock.getUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(2);
    expect(component.displayedUsers.length).toBe(2);
    expect(component.totalUsers).toBe(2);
  }));

it('dovrebbe aggiungere un nuovo utente', fakeAsync(() => {
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

  // verifica che solo displayedUsers sia aggiornato
  expect(component.displayedUsers.length).toBe(3);
  expect(component.displayedUsers[0]).toEqual(mockCreatedUser);

  // verifica che users non sia stato toccato
  expect(component.users.length).toBe(2);
}));

  it('dovrebbe filtrare un utente cercato', () => {
    component.searchTerm = 'Luigi';
    component.onSearchUser();
    expect(component.displayedUsers.length).toBe(1);
    expect(component.displayedUsers[0].name).toBe('Luigi Bianchi');
  });

  it('dovrebbe far vedere displayedUsers se non vi è termine cercato', () => {
    component.searchTerm = '   ';
    component.onSearchUser();
    expect(component.displayedUsers.length).toBe(2);
  });

  it('dovrebbe eliminare un utente', fakeAsync(() => {
    component.onDeleteUser(1);
    tick();

    // verifica che l'utente sia stato rimosso
    expect(component.users.length).toBe(1);
    expect(component.users.find(u => u.id === 1)).toBeUndefined();
    expect(component.displayedUsers.length).toBe(1);
    expect(component.displayedUsers.find(u => u.id === 1)).toBeUndefined();
  }));

it('dovrebbe gestire errore durante il caricamento degli users ad ngOnInit', fakeAsync(() => {
  apiMock.getUsers.and.returnValue(throwError(() => new Error('Errore caricamento utenti')));
  spyOn(console, 'error');

  // reset degli array per simulare stato iniziale
  component.users = [];
  component.displayedUsers = [];
  component.totalUsers = undefined!;

  component.ngOnInit();
  tick();

  expect(apiMock.getUsers).toHaveBeenCalled();
  expect(console.error).toHaveBeenCalledWith('Errore caricamento utenti:', jasmine.any(Error));
  expect(component.users.length).toBe(0);
  expect(component.displayedUsers.length).toBe(0);
  expect(component.totalUsers).toBeUndefined();
}));

it('dovrebbe gestire errore durante la creazione di un nuovo utente', fakeAsync(() => {
  component.formComponent = formComponentMock;

  const formValue = {
    name: 'Giulia Verdi',
    email: 'giulia@example.com',
    gender: 'female' as const,
    status: 'active' as const,
  };

  apiMock.createUser.and.returnValue(throwError(() => new Error('Errore creazione utente')));
  spyOn(console, 'error');

  component.onSubmit(formValue);
  tick();

  expect(apiMock.createUser).toHaveBeenCalledWith(formValue);
  expect(console.error).toHaveBeenCalledWith('Errore creazione utente:', jasmine.any(Error));
  expect(component.formComponent.resetForm).not.toHaveBeenCalled(); 
  expect(component.displayedUsers.length).toBe(mockUsers.length); 
}));


  it('dovrebbe attivare/disattivare showFormUser', () => {
    component.showFormUser = false;
    component.toggleForm();
    expect(component.showFormUser).toBeTrue();
    component.toggleForm();
    expect(component.showFormUser).toBeFalse();
  });

  it('dovrebbe completare il destroy ad ngOnDestroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});
