import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Loader } from './components/loader/loader';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, CommonModule, Loader],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit{
  protected readonly title = signal('progetto-angular-1');



constructor() {}

ngOnInit(): void {
  
}

}
