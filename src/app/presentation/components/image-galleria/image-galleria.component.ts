import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GalleriaImage } from '../../interfaces/galleria.interface';
import { GalleriaModule } from 'primeng/galleria';
import { GalleriaConfig } from '../../interfaces/galleria.config.interface';


@Component({
  selector: 'app-image-galleria',
  imports: [GalleriaModule],
  templateUrl: './image-galleria.component.html',
  styleUrl: './image-galleria.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageGalleriaComponent {

  /**
   * Default Config wenn keine übergeben wurde
   */
  defaultConfig: GalleriaConfig = {
    showThumbnails: true,
    showIndicators: false,
    showItemNavigators: false,
    showItemNavigatorsOnHover: false,
    autoPlay: false,
    circular: false,
    caption: false,
    thumbnailsVisibleNumber: 5
  }

  @Input() images: GalleriaImage[] = [];
  @Input() galleriaConfig: GalleriaConfig = this.defaultConfig;

}
