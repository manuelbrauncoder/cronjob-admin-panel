import { Component, inject, OnInit } from '@angular/core';
import { FetchCruiseUseCaseService } from '../../../application/use-cases/fetch-cruise-use-case.service';
import { CruiseRepository } from '../../../domain/services/cruise-repository';
import { CruiseApiService } from '../../../infrastructure/services/cruise-api.service';
import { HttpResponse } from '@angular/common/http';
import { CruiseResponse, Picture } from '../../../domain/models/cruise.interface';
import { GalleriaModule } from 'primeng/galleria';
import { GalleriaImage } from '../../interfaces/galleria.interface';
import { ImageGalleriaComponent } from "../../components/image-galleria/image-galleria.component";
import { GalleriaConfig } from '../../interfaces/galleria.config.interface';

@Component({
  selector: 'app-gallery',
  imports: [GalleriaModule, ImageGalleriaComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  providers: [
    FetchCruiseUseCaseService,
    {
      provide: CruiseRepository,
      useClass: CruiseApiService
    }
  ]
})
export class GalleryComponent implements OnInit {
  fetchCruiseUseCase = inject(FetchCruiseUseCaseService);
  cruiseResponse?: CruiseResponse;
  images: GalleriaImage[] = [];

  /**
   * Angular lifecycle hook
   * Wird ausgeführt sobald alle properties initialisiert wurden
   */
  ngOnInit(): void {
    this.fetchCruise();
  }

  /**
   * Läd die Cruise Daten von den api
   */
  fetchCruise(): void {
    this.fetchCruiseUseCase.execute().subscribe({
      next: (response: HttpResponse<CruiseResponse>) => {
        if (response.status === 200) {
          console.log('response:', response.body);
          this.cruiseResponse = response.body as CruiseResponse
        } else {
          console.log('Error http status:', response.status);
        }
      },
      error: (err) => {
        console.error('Error fetching cruise:', err);
      }
    })
  }

  /**
   * Erstellt das Array für die PrimeNG Component
   */
  createImagesArray(): GalleriaImage[] {
    if (this.cruiseResponse) {
      const pictures: Picture[] = this.cruiseResponse.objData.Cruise.Ship.PicturesGalerie.Picture;
      return pictures?.map(p => ({
        itemImageSrc: p.url,
        thumbnailImageSrc: p.url,
        alt: p.label
      }))
    }
    return [];
  }

  /**
   * Legt die Config für die Galleria fest
   * @returns GalleriaConfig
   */
  setGalleriaConfig(): GalleriaConfig {
    return {
      showThumbnails: true,
      showIndicators: false,
      showItemNavigators: true,
      showItemNavigatorsOnHover: true,
      autoPlay: false,
      circular: false,
      caption: false,
      thumbnailsVisibleNumber: 6
    }
  }

}
