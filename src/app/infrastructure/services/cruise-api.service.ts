import { Injectable } from '@angular/core';
import { CruiseRepository } from '../../domain/services/cruise-repository';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CruiseResponse } from '../../domain/models/cruise.interface';

@Injectable({
  providedIn: 'root'
})
export class CruiseApiService extends CruiseRepository {

  private baseUrl: string = "/api/cruise/get-cruise";
  private accessToken: string = "nKcR8iWpIVf23KP585OOtfsTPZWyZM4nZEi3PPv70ngFuQQe0w6hRdYFW2OOhx1Ih6KdIqXSWTELsiwiu-ubg2SQIYGE4SzmVzjXOwnoSMwuFA5EYVstAkAUyOsy9THk";

  constructor(private http: HttpClient) {
    super();
   }

  fetchCruise(): Observable<HttpResponse<CruiseResponse>> {
     const headers = new HttpHeaders().set('accessToken', this.accessToken);
     const url = `${this.baseUrl}/?intCruiseID=1054959`;
     return this.http.get<CruiseResponse>(url, { observe: 'response', headers: headers });
   }
}
