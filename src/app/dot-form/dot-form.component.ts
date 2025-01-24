import { Component } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dot-form',
  templateUrl: './dot-form.component.html',
  styleUrl: './dot-form.component.sass',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true
})
export class DotFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      x: new FormControl('', [
          Validators.required,
          Validators.min(-5),
          Validators.max(5),
          Validators.pattern('^-?\\d*(\\.\\d+)?$'),
      ]),
      y: new FormControl('', [
          Validators.required,
          Validators.min(-5),
          Validators.max(5),
          Validators.pattern('^-?\\d*(\\.\\d+)?$'),
      ]),
      r: new FormControl('', [
          Validators.required,
          Validators.min(1),
          Validators.max(5),
          Validators.pattern('^-?\\d*(\\.\\d+)?$'),
      ]),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { x, y, r } = this.form.value;
      console.log('Форма отправлена:', { x, y, r });
      // TODO на сервер отправляем
    }
  }

  public get xControl(): FormControl {
    return this.form.get('x') as FormControl;
  }

  public get yControl(): FormControl {
    return this.form.get('y') as FormControl;
  }

  public get rControl(): FormControl {
    return this.form.get('r') as FormControl;
  }
}
