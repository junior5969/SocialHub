import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone:true,
  imports: [ButtonComponent, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  @Input() fields!: { name: string; label: string; type: string; validators?: any[]; options?: string[]}[];
  @Input() resetOnSubmit: boolean = false; 
  @Input() customClass?: string = '';

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

