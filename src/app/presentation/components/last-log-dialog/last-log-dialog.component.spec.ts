import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastLogDialogComponent } from './last-log-dialog.component';

describe('LogComponent', () => {
  let component: LastLogDialogComponent;
  let fixture: ComponentFixture<LastLogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastLogDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
