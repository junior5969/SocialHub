
import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter,} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { UserInterface } from '../../models/user-interface';


@Component({
  selector: 'app-user',
  standalone:true,
  imports: [MatExpansionModule, MatButtonModule, MatIcon, RouterLink, CommonModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {

showDetails = false;
showPost = false;
users: UserInterface[] = [];

@Input() user!: { name: string; email: string; gender:string; status:string; id:number; };
@Output() delete = new EventEmitter<number>();

}

