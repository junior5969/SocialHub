import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-button',
  standalone:true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() label?: string;
  @Input() type: 'button' | 'submit' = 'button'; //type button o submit (default button)
  @Input() disabled = false;
  @Input() matStyle: "text" | "filled" | "outlined" | "tonal"  = "outlined";
  @Input() customClass?: string;
  @Input() iconAriaHidden = true;  //tutte le icone vengono ignorate dallo screen reader
  @Input() ariaLabel?: string;  //da aggiungere se non c'è testo visibile (solo icona) o il testo no è esplicativo

  @Input() routerLink?: string | any[];

  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    if (!this.routerLink && !this.disabled) {
      this.buttonClick.emit();
    }
}

}
