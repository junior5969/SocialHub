import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';
import { API } from '../../service/api';
import { UserInterface } from '../../models/user-interface';
import { PostInterface } from '../../models/post-interface';
import { CommentInterface } from '../../models/comment-interface';
import { NewCommentInterface } from '../../models/new-comment-interface';


describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let apiMock: any;
  let formComponentMock: any;



//mock dei dati per simulare il backend 

  const mockUser : UserInterface =    //utente finto
    { id:1, name: 'Mario Rossi', email: 'mario@example.com', gender: 'male' as const, status: 'active' as const };


const mockPosts:PostInterface [] = [
{id:1, user_id:123, title:'title1', body:'firstpost'},
{id:2, user_id:11, title:'title2', body:'secondpost'},
];

const mockComments: CommentInterface [] = [
{  id: 1, post_id: 123, name: 'Anna Verdi', email: 'anna@example.com', body: 'exampleexample'},
{  id: 2, post_id: 111, name: 'Luca Rossi', email: 'luca@example.com', body: 'texttext'},
];

const mockNewComment: NewCommentInterface= 
{ name: 'Paolo Neri', email: 'paolo@example.com', body: 'comment'};



//configurazione della finta api
  beforeEach(async () => {
    apiMock = {
      getUserById: jasmine.createSpy('getUserById').and.returnValue(of(mockUser)),
      getUserPosts: jasmine.createSpy('getUserPosts').and.returnValue(of(mockPosts)),
      getComments: jasmine.createSpy('getComments').and.returnValue(of(mockComments)),
      createComment: jasmine.createSpy('createComment').and.returnValue(of(mockNewComment)),
    };

    formComponentMock = {
      resetForm: jasmine.createSpy('resetForm'),
    };
 
   await TestBed.configureTestingModule({
      providers: [
        { provide: API, useValue: apiMock },
        provideRouter([]), // sostituisce RouterTestingModule deprecato
      ],
      imports: [UserDetailComponent],
    }).compileComponents();

     fixture = TestBed.createComponent(UserDetailComponent);
        component = fixture.componentInstance;
        component.formComponent = formComponentMock;
        fixture.detectChanges(); // inizializza component
      });

      // 🔧 reset degli array PRIMA di ogni test
      beforeEach(() => {
        component.posts = [...mockPosts];
        component.displayedComments = [...mockComments];
      });
    

      //caricare utente e posts all OnInit

   it('should create the component', () => {
    expect(component).toBeTruthy();
  });


/*   it('should load user on ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
   expect(apiMock.getUserById).toHaveBeenCalled();
  })); */
     
     
it('should load user and posts on ngOnInit', fakeAsync(() => {
  component.ngOnInit();
  tick();

  expect(apiMock.getUserById).toHaveBeenCalled();
  expect(apiMock.getUserPosts).toHaveBeenCalled();

  expect(component.user).toEqual(mockUser);
  expect(component.posts.length).toBe(2);
}));

it('should load comments when toggleComments is called first time', fakeAsync(() => {
  component.toggleComments(1);
  tick();

  expect(apiMock.getComments).toHaveBeenCalledWith(1);
  expect(component.comments[1].length).toBe(2);
  expect(component.showComments[1]).toBeTrue();
}));

it('should submit a new comment', fakeAsync(() => {
  component.formComponent = formComponentMock;

  const formValue = { name: 'Anna Verdi', email: 'anna@example.com', body: 'testo' };
  component.onSubmit(1, formValue);
  tick();

  expect(apiMock.createComment).toHaveBeenCalledWith(1, formValue);
  expect(component.formComponent.resetForm).toHaveBeenCalled();
  expect(component.showComments[1]).toBeTrue();
}));

it('should handle error when loading user', fakeAsync(() => {
  apiMock.getUserById.and.returnValue(throwError(() => new Error('Errore finto')));
  spyOn(console, 'error');

  component.ngOnInit();
  tick();

  expect(console.error).toHaveBeenCalledWith('Errore caricamento utente:', jasmine.any(Error));
}));

it('should handle error when creating a comment', fakeAsync(() => {
  apiMock.createComment.and.returnValue(throwError(() => new Error('Errore creazione')));
  spyOn(console, 'error');
  const snackBarSpy = spyOn(component['snackBar'], 'open');

  component.onSubmit(1, { name: 'Anna', email: 'anna@example.com', body: 'ciao' });
  tick();

  expect(console.error).toHaveBeenCalledWith('Errore creazione commento:', jasmine.any(Error));
  expect(snackBarSpy).toHaveBeenCalledWith('Errore durante la creazione del commento!', 'Chiudi', jasmine.any(Object));
}));

it('should toggle comments off if already loaded', fakeAsync(() => {
  component.comments[1] = [...mockComments];
  component.showComments[1] = true;

  component.toggleComments(1);

  expect(component.showComments[1]).toBeFalse();
}));

  it('should complete destroy$ on ngOnDestroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});

