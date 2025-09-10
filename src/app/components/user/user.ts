
import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter,} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';


@Component({
  selector: 'app-user',
  standalone:true,
  imports: [MatExpansionModule, MatButtonModule, MatIcon, RouterLink, CommonModule, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user.html',
  styleUrls: ['./user.css']
})

export class User {

showDetails = false;
showPost = false;
users: User[] = [];

@Input() user!: { name: string; email: string; gender:string; status:string; id:number; };
@Output() delete = new EventEmitter<number>();

}

