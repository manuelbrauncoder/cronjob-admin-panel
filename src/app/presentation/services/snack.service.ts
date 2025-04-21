import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  error: boolean = false;
  message: string = '';
  isPresented: boolean = false;

  constructor() { }

  /**
   * Presents a Snackbar on the top
   * disappear after timeout
   * 
   * @param params 
   */
  presentSnack(params: { err: boolean, message: string }): void {
    const  { err, message } = params;
    this.error = err;
    this.message = message;

    this.isPresented = true;

    setTimeout(() => {
      this.isPresented = false;
    }, 3000);
  }
}
