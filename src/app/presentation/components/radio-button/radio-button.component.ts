import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class RadioButtonComponent implements OnInit {
  @Input() filter: ErrorFilterEnum = ErrorFilterEnum.All;
  @Output() filterChange = new EventEmitter<ErrorFilterEnum>();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
      choice: [this.filter, Validators.required],
    });

    this.form.get('choice')?.valueChanges.subscribe((value: ErrorFilterEnum) => {
      this.filterChange.emit(value);
    });
  }
}
