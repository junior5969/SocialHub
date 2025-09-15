import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';
import { UserInterface } from '../../models/user-interface';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let router: Router;

  const mockUser: UserInterface = {
    id: 1,
    name: 'Mario Rossi',
    email: 'mario@example.com',
    gender: 'male',
    status: 'active'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
          providers: [
      provideRouter([]),
    ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('dovrebbe creare il componente', () => {
    expect(component).toBeTruthy();
  });

  it('dovrebbe restituire i dati in input', () => {
    component.user = mockUser;

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.panel-title')?.textContent).toContain('Mario Rossi');
    expect(compiled.querySelector('.user-info')?.textContent).toContain('mario@example.com');
    expect(compiled.querySelector('.user-info')?.textContent).toContain('active');
  });

  it('dovrebbe emettere evento delete quando il bottone Elimina viene cliccato', () => {
    spyOn(component.delete, 'emit');
    component.user = mockUser;
    fixture.detectChanges();

 const deleteButton = fixture.debugElement.query(By.css('.button-delete'));
deleteButton.nativeElement.click();
fixture.detectChanges();

expect(component.delete.emit).toHaveBeenCalledWith(1);
  });


it('dovrebbe portare alla pagina UserDetail tramite RouterLink', () => {
  component.user = mockUser;
  fixture.detectChanges();

  const detailButton = fixture.debugElement.query(By.css('.button-detail'));
  const routerLinkInstance = detailButton.injector.get(RouterLinkWithHref);

  expect(routerLinkInstance.href).toBe('/users/1');
});
});