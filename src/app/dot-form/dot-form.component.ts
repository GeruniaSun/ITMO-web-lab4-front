import {Component} from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import { DotsService } from '../dots.service';
import {CanvasDrawer} from '../dot-canvas/canvas-drawer';

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
  private canvasDrawer;

  constructor(private fb: FormBuilder, private http: HttpClient, private dotsService: DotsService) {
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

    this.canvasDrawer = new CanvasDrawer()
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { x, y, r } = this.form.value;
      console.log('Форма отправлена:', { x, y, r });
      this.dotsService.addDot(x, y, r).then(dot => {
        console.log(dot)
        dot ? this.canvasDrawer.dotsPush(dot) : console.log("дотик нул")
      })
    }
  }

  protected redrawArea() {
    CanvasDrawer.refreshCanvas(this.rControl.value)
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
