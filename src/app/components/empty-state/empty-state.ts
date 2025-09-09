import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone:true,
  imports: [MatIcon],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css'
})
export class EmptyState {

@Input() typeText='';

}
