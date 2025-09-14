import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';
import { PostsComponent } from './posts.component';
import { API } from '../../service/api';
import { UserInterface } from '../../models/user-interface';
import { PostInterface } from '../../models/post-interface';
import { CommentInterface } from '../../models/comment-interface';
import { NewPostInterface } from '../../models/new-post-interface';
import { NewCommentInterface } from '../../models/new-comment-interface';


describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let apiMock: any;
  let formComponentMock: any;

  const mockPosts: PostInterface [] = [
    { id: 1, user_id: 1, title: 'title1', body:'text' },
    { id: 2, user_id: 2, title: 'title2', body:'text2' },
  ];

  const mockNewPost : NewPostInterface = {user_id: 1, title: 'example', body: 'body'};

  const mockComments: CommentInterface [] = [
{  id: 1, post_id: 123, name: 'Anna Verdi', email: 'anna@example.com', body: 'exampleexample'},
{  id: 2, post_id: 111, name: 'Luca Rossi', email: 'luca@example.com', body: 'texttext'},
];

const mockNewComment : NewCommentInterface= {name:'Mario Rossi', email:'mario@gmail.com', body: 'body'};

  beforeEach(async () => {
    apiMock = {
      getPosts: jasmine.createSpy('getPosts').and.returnValue(of(mockPosts)),
      createPost: jasmine.createSpy('createPost').and.returnValue(of(mockNewPost)),
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
      imports: [PostsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    component.formComponent = formComponentMock;
    fixture.detectChanges(); // inizializza component
  });

  // 🔧 reset degli array PRIMA di ogni test
  beforeEach(() => {
    component.posts = [...mockPosts];
    component.displayedPosts = [...mockPosts];
    component.totalPosts = mockPosts.length
  });

   it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  //NG ONINIT NEXT + ERROR
  //mi aspetto che all' OnInit vengano caricati i posts e che quindi mockPOsts diventi tot.2
  it('should load posts on ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
   expect(apiMock.getPosts).toHaveBeenCalled();
   expect(component.posts).toEqual(mockPosts);
   expect(component.posts.length).toBe(2);
 
    expect(component.displayedPosts.length).toBe(2);
    expect(component.totalPosts).toBe(2);

      // ricerca del campo user_id
  const userIdField = component.postFields.find(f => f.name === 'user_id');
  expect(userIdField).withContext('Campo "user_id" non trovato in postFields').toBeDefined();

  // ora controllo le options: le aspetto come stringhe '1','2'
 expect((userIdField as any).options).toEqual(['1', '2']);
}));

   it('should handle error on ngOnInit', fakeAsync(() => {
    apiMock.getPosts.and.returnValue(throwError(() => new Error('Errore caricamento post')));
    spyOn(console, 'error');

    component.ngOnInit();
    tick();

    expect(apiMock.getPosts).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Errore caricamento post:', jasmine.any(Error));
/*     expect(component.posts).toEqual([]); // niente caricamento
    expect(component.displayedPosts).toEqual([]);
    expect(component.totalPosts).toBeUndefined(); */
  }));




//NEW POST ONSUBMIT
it('should submit a new post', fakeAsync(() => {

  const mockCreatedPost: PostInterface = { id: 99, user_id: 1, title: 'example', body: 'body' };
  apiMock.createPost.and.returnValue(of(mockCreatedPost));

  component.formComponent = formComponentMock;
  const formValue = { user_id: 1, title: 'title', body: 'body' };

  const snackBarSpy = spyOn(component['snackBar'], 'open');

  component.onSubmitPost(formValue);
  tick();

  const expectedNewPost = { user_id: 1, title: 'title', body: 'body' };
  expect(apiMock.createPost).toHaveBeenCalledWith(expectedNewPost);
  expect(component.displayedPosts[0]).toEqual(mockCreatedPost);
  expect(component.formComponent.resetForm).toHaveBeenCalled();
  expect(component.showForm).toBeFalse();
  expect(snackBarSpy).toHaveBeenCalledWith(
    'Post creato con successo!',
    'Chiudi',
    jasmine.any(Object)
  );
}));

it('should handle error when loading posts', fakeAsync(() => {
  apiMock.getPosts.and.returnValue(throwError(() => new Error('Errore finto')));
  spyOn(console, 'error');

  component.ngOnInit();
  tick();

  expect(console.error).toHaveBeenCalledWith('Errore caricamento post:', jasmine.any(Error));
}));

it('should handle error when creating a post', fakeAsync(() => {
  apiMock.createPost.and.returnValue(throwError(() => new Error('Errore creazione')));
  spyOn(console, 'error');
  const snackBarSpy = spyOn(component['snackBar'], 'open');

  component.onSubmitPost({ user_id: 1, title: 'title', body: 'body' });
  tick();

  expect(console.error).toHaveBeenCalledWith('Errore creazione post:', jasmine.any(Error));
  expect(snackBarSpy).toHaveBeenCalledWith(
    'Errore durante la creazione del post!',
    'Chiudi',
    jasmine.any(Object)
  );
}));


//NEW COMMENT ON SUBMIT

it('should submit a new comment', fakeAsync(() => {
  component.formComponent = formComponentMock;

  const formValue = {  name:'Mario Rossi', email: 'email', body: 'body' };

  const snackBarSpy = spyOn(component['snackBar'], 'open');

  component.onSubmitComment(1,formValue);
  tick();

  expect(apiMock.createComment).toHaveBeenCalledWith(1, jasmine.objectContaining(formValue));

  expect(component.formComponent.resetForm).toHaveBeenCalled();
  expect(component.showComments[1]).toBeTrue();
  expect(component.showFormComment[1]).toBeFalse();
  expect(snackBarSpy).toHaveBeenCalledWith(
    'Commento creato con successo!',
    'Chiudi',
    jasmine.any(Object)
  );
}));

it('should handle error when loading posts', fakeAsync(() => {
  apiMock.getPosts.and.returnValue(throwError(() => new Error('Errore finto')));
  spyOn(console, 'error');

  component.ngOnInit();
  tick();

  expect(console.error).toHaveBeenCalledWith('Errore caricamento post:', jasmine.any(Error));
}));

it('should handle error when creating a comment', fakeAsync(() => {
  apiMock.createComment.and.returnValue(throwError(() => new Error('Errore creazione')));
  spyOn(console, 'error');
  const snackBarSpy = spyOn(component['snackBar'], 'open');

  component.onSubmitComment(1,{ name:'Mario Rossi', email: 'email', body: 'body' });
  tick();

  expect(console.error).toHaveBeenCalledWith('Errore creazione commento per post 1:', jasmine.any(Error));
  expect(snackBarSpy).toHaveBeenCalledWith(
    'Errore durante la creazione del commento!',
    'Chiudi',
    jasmine.any(Object)
  );
}));




// TOGGLE COMMENTS
it('should load comments when toggleComments is called', fakeAsync(() => {
  component.toggleComments(1);
  tick();

  expect(apiMock.getComments).toHaveBeenCalledWith(1);
  expect(component.comments[1].length).toBe(2);
  expect(component.showComments[1]).toBeTrue();
}));
it('should hide comments if already visible', () => {
  component.showComments[1] = true;

  component.toggleComments(1);

  expect(component.showComments[1]).toBeFalse();
  expect(apiMock.getComments).not.toHaveBeenCalled();
});
it('should handle error when loading comments', fakeAsync(() => {
  apiMock.getComments.and.returnValue(throwError(() => new Error('Errore finto')));
  spyOn(console, 'error');

  component.toggleComments(1);
  tick();

  expect(console.error).toHaveBeenCalledWith('Errore caricamento commenti:', jasmine.any(Error));
  expect(component.showComments[1]).not.toBeTrue(); // rimane undefined o false
}));



//toggle relativi ai post e ai commenti

  it('should toggle showForm', () => {
    component.showForm = false;
    component.toggleForm();
    expect(component.showForm).toBeTrue();
    component.toggleForm();
    expect(component.showForm).toBeFalse();
  });

    it('should toggle showFormComment', () => {
    component.showFormComment[1] = false;
    component.toggleFormComment(1);
    expect(component.showFormComment[1]).toBeTrue();
    component.toggleFormComment(1);
    expect(component.showFormComment[1]).toBeFalse();
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });

});
