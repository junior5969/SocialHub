import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone:true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() cardTitle=';'
  @Input() cardBody='';
  @Input() cardUserId!: string | number;
}
