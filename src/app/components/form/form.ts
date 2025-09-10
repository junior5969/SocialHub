import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Button } from '../button/button';

@Component({
  selector: 'app-form',
  standalone:true,
  imports: [Button, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class Form implements OnInit{

  @Input() fields!: { name: string; label: string; type: string; validators?: any[]; options?: string[]}[];
  @Input() resetOnSubmit: boolean = false; 

  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

    ngOnInit() {
    const controls: any = {};
    this.fields.forEach(f => {
      controls[f.name] = new FormControl(null, f.validators || []);
    });
    this.form = new FormGroup(controls);
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
            if (this.resetOnSubmit) {
        this.resetForm(); // reset automatico solo se richiesto
      }
    }
  }
    
  resetForm() {
    this.form.reset();
  }
}

