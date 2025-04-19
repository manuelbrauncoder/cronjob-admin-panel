import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  isLastLogDialogPresented: boolean = false;

  toggleLastLogDialog(): void {
    this.isLastLogDialogPresented = !this.isLastLogDialogPresented;
  }

  constructor() { }
}
