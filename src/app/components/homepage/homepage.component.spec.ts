import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { MatButtonModule } from '@angular/material/button';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';

describe('HomepageComponent', () => {
  let fixture: ComponentFixture<HomepageComponent>;
  let component: HomepageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageComponent, MatButtonModule],
      providers: [
        provideRouter([
          { path: '', component: HomepageComponent },
          { path: 'login', component: LoginComponent }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should navigate to login', async () => {
  const harness = await RouterTestingHarness.create();
  const loginFixture = await harness.navigateByUrl('/login', LoginComponent);
  expect(loginFixture).toBeTruthy();
});
});
