import { OnInit, ViewContainerRef, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { ConfirmationService } from './confirmations.service';
import { ConfirmSettings } from './interfaces/confirm-settings';
export declare class ConfirmationsComponent implements OnInit, OnDestroy {
    private _service;
    private _resolver;
    constructor(_service: ConfirmationService, _resolver: ComponentFactoryResolver);
    compViewContainerRef: ViewContainerRef;
    defaultSettings: ConfirmSettings;
    settings: ConfirmSettings | any;
    private _current;
    private _lastResolve;
    private _listener;
    ngOnInit(): void;
    private _handleResolve(res?);
    ngOnDestroy(): void;
}
