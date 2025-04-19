import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogListRowComponent } from './log-list-row.component';

describe('LogListRowComponent', () => {
  let component: LogListRowComponent;
  let fixture: ComponentFixture<LogListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogListRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
