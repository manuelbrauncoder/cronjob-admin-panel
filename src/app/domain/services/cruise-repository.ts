import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { CruiseResponse } from "../models/cruise.interface";

export abstract class CruiseRepository {
    abstract fetchCruise(): Observable<HttpResponse<CruiseResponse>>;
}