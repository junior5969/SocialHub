import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomepageComponent } from './homepage.component';
import { MatButtonModule } from '@angular/material/button';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ButtonComponent } from '../button/button.component';

describe('HomepageComponent', () => {
  let fixture: ComponentFixture<HomepageComponent>;
  let component: HomepageComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageComponent, MatButtonModule],
      providers: [
        provideRouter([
          { path: '', component: HomepageComponent },
          { path: 'login', component: HomepageComponent }, // solo per routing
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login when onLogin is called', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.onLogin();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should open token URL in new tab when onCreateToken is called', () => {
    const windowOpenSpy = spyOn(window, 'open');
    component.onCreateToken();
    expect(windowOpenSpy).toHaveBeenCalledWith(component.tokenUrl, '_blank');
  });
});
