import { animate, style, transition, trigger } from "@angular/animations";

export const slideFromBottom = trigger('slideFromBottom', [
    transition(':enter', [
      style({ transform: 'translate(-50%, 200%)' }),
      animate('0.2s ease-out', style({ transform: 'translate(-50%, 0)' })),
    ]),
    transition(':leave', [
      style({ transform: 'translate(-50%, 0)' }),
      animate('0.2s ease-out', style({ transform: 'translate(-50%, 200%)' })),
    ]),
  ]);

  export const slideFromTop = trigger('slideFromTop', [
    transition(':enter', [
      style({ transform: 'translate(-50%, -200%)' }),
      animate('0.2s ease-out', style({ transform: 'translate(-50%, 0)' })),
    ]),
    transition(':leave', [
      style({ transform: 'translate(-50%, 0)' }),
      animate('0.2s ease-out', style({ transform: 'translate(-50%, -200%)' })),
    ]),
  ]);

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
  