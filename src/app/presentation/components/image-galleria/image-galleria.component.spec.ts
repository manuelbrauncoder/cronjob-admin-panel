import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGalleriaComponent } from './image-galleria.component';

describe('ImageGalleriaComponent', () => {
  let component: ImageGalleriaComponent;
  let fixture: ComponentFixture<ImageGalleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGalleriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageGalleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
