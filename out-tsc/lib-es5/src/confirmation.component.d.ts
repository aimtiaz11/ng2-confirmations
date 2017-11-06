import { Injector, NgZone } from '@angular/core';
import { ResolveEmit } from './interfaces/resolve-emit';
export declare class ConfirmationComponent {
    private _injector;
    private _ngZone;
    constructor(_injector: Injector, _ngZone: NgZone);
    animationState: string;
    incomingData: any;
    overlayClick(): void;
    close(type: string): void;
    resolve(how: ResolveEmit): void;
}
