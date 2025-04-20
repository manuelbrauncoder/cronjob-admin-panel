import { Component, effect, model, OnChanges, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorFilterEnum } from '../../enums/ErrorFilterEnum';

@Component({
  selector: 'app-radio-button',
  imports: [ReactiveFormsModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
})
export class RadioButtonComponent implements OnInit, OnChanges {
  choice = model.required<ErrorFilterEnum>();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initFormGroup();
  }

  ngOnChanges(): void {
    this.form.get('choice')?.setValue(this.choice());
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

    this.form.get('choice')?.valueChanges.subscribe((val: ErrorFilterEnum) => {
      this.choice.set(val);
    });
  }
}
