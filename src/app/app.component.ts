import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, CommonModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  protected readonly title = signal('progetto-angular-1');



constructor() {}

ngOnInit(): void {
  
}

}
