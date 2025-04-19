import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronjobListComponent } from './cronjob-list.component';

describe('CronjobListComponent', () => {
  let component: CronjobListComponent;
  let fixture: ComponentFixture<CronjobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CronjobListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CronjobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
