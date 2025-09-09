import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();
  show() {
      console.log('Loader: show() called');
    this.isLoading.next(true);
  }
  hide() {
      console.log('Loader: hide() called');
    this.isLoading.next(false);
  }
}