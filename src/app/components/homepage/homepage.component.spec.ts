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

  it('dovrebbe creare il componente', () => {
    expect(component).toBeTruthy();
  });

  it('dovrebbe portare al login quando viene chiamato il metodo onLogin', () => {
    const routerSpy = spyOn(router, 'navigate');
    component.onLogin();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });

  it('dovrebbe portare alla pagina di creazione del token quando viene chiamato il metodo onCreateToken', () => {
    const windowOpenSpy = spyOn(window, 'open');
    component.onCreateToken();
    expect(windowOpenSpy).toHaveBeenCalledWith(component.tokenUrl, '_blank');
  });
});
