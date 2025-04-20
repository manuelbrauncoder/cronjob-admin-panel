import { Component, model } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-radio-button',
  imports: [ReactiveFormsModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
})
export class RadioButtonComponent {
  choice = model.required<'error' | 'all'>();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  /**
   * Initializes the FormGroup with a single control 'choice'
   * Set Validators to required
   * Subscribe to the valueChanges and updates the signal
   */
  initFormGroup(): void {
    this.form = this.formBuilder.group({
      choice: [this.choice(), Validators.required],
    });

    this.form.get('choice')?.valueChanges.subscribe((val: 'error' | 'all') => {
      this.choice.set(val);
    });
  }
}
