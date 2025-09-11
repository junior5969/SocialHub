/* import { ComponentFixture, TestBed } from '@angular/core/testing.component';
import { User } from './user.component';
import { UserInterface } from '../../models/user-interface';

describe('UserComponent', () => {
  let component: User;
  let fixture: ComponentFixture<User>;

  const dummyUser: UserInterface = { id: 1, name: 'Alice', email: 'alice@example.com', gender: 'female', status: 'active' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [User], // componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(User);
    component = fixture.componentInstance;

    // assegniamo direttamente l'input
    component.user = dummyUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct user input', () => {
    expect(component.user).toEqual(dummyUser);
  });

  it('should display user name in template', () => {
  const compiled = fixture.nativeElement as HTMLElement;
  expect(compiled.textContent).toContain('Alice');
});
});
 */