import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  isLastLogDialogPresented: boolean = false;
  isSidebarPresented: boolean = false;

  toggleSidebar(): void {
    this.isSidebarPresented = !this.isSidebarPresented;
  }

  toggleLastLogDialog(): void {
    this.isLastLogDialogPresented = !this.isLastLogDialogPresented;
  }

  constructor() { }
}
