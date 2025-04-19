import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteJobButtonComponent } from './execute-job-button.component';

describe('ExecuteJobButtonComponent', () => {
  let component: ExecuteJobButtonComponent;
  let fixture: ComponentFixture<ExecuteJobButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecuteJobButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecuteJobButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
