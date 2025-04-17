import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronjobTableComponent } from './cronjob-table.component';

describe('CronjobTableComponent', () => {
  let component: CronjobTableComponent;
  let fixture: ComponentFixture<CronjobTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CronjobTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CronjobTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
