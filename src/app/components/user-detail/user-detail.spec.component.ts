/* import { ComponentFixture, TestBed } from '@angular/core/testing.component';
import { UserDetail } from './user-detail.component';
import { API } from '../../service/api';
import { of } from 'rxjs.component';
import { ActivatedRoute } from '@angular/router.component';
import { MatSnackBarModule } from '@angular/material/snack-bar.component';
import { PostInterface } from '../../models/post-interface';
import { UserInterface } from '../../models/user-interface';
import { provideHttpClientTesting } from '@angular/common/http/testing.component'; 


describe('UserDetail', () => {
  let component: UserDetail;
  let fixture: ComponentFixture<UserDetail>;
  let apiService: API;

  const dummyUser: UserInterface = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    gender: 'female',
    status: 'active'
  };

  const dummyPosts: PostInterface[] = [
    { id: 1, user_id: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, user_id: 1, title: 'Post 2', body: 'Body 2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetail, MatSnackBarModule],
      providers: [
        API,
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetail);
    component = fixture.componentInstance;
    apiService = TestBed.inject(API);

    spyOn(apiService, 'getUserById').and.returnValue(of(dummyUser));
    spyOn(apiService, 'getUserPosts').and.returnValue(of(dummyPosts));

    fixture.detectChanges(); // ngOnInit viene chiamato
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on init', () => {
    expect(component.user).toEqual(dummyUser);
  });

  it('should load user posts on init', () => {
    expect(component.posts).toEqual(dummyPosts);
  });

  it('should display user posts in template', () => {
  const compiled = fixture.nativeElement as HTMLElement;
  expect(compiled.textContent).toContain('Post 1');
  expect(compiled.textContent).toContain('Post 2');
});
});
 */