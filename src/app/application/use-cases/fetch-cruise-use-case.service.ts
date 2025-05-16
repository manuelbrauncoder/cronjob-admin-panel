import { Injectable } from '@angular/core';
import { CruiseRepository } from '../../domain/services/cruise-repository';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { CruiseResponse } from '../../domain/models/cruise.interface';

@Injectable({
  providedIn: 'root'
})
export class FetchCruiseUseCaseService {

  constructor(private readonly repo: CruiseRepository) { }

  execute(): Observable<HttpResponse<CruiseResponse>> {
    return this.repo.fetchCruise();
  }
}
