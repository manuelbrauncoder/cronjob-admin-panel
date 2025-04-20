import { animate, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('200ms ease-in', style({ opacity: 0 })),
  ]),
]);

export const slideIn = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('200ms ease-out', style({ transform: 'translateX(0)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)' }),
    animate('200ms ease-in', style({ transform: 'translateX(100%)' })),
  ]),
]);

export const snackIn = trigger('snackIn', [
  transition(':enter', [
    style({ transform: 'translate(-50%, -200%)' }),
    animate('0.2s ease-out', style({ transform: 'translate(-50%, 0)' })),
  ]),
  transition(':leave', [
    style({ transform: 'translate(-50%, 0)' }),
    animate('0.2s ease-out', style({ transform: 'translate(-50%, -200%)' })),
  ]),
]);
