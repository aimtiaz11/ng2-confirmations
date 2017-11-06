import { Component, ComponentFactoryResolver, Injectable, Injector, Input, NgModule, NgZone, ReflectiveInjector, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { animate, state, style, transition, trigger } from '@angular/animations';

class ConfirmationService {
    constructor() {
        this.confirmation$ = new Subject();
    }
    /**
     * @param {?} title
     * @param {?} message
     * @param {?=} override
     * @return {?}
     */
    create(title, message, override = {}) {
        const /** @type {?} */ resolve$ = new Subject();
        this.confirmation$.next({
            title,
            message,
            resolve$,
            override
        });
        return resolve$;
    }
}
ConfirmationService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
ConfirmationService.ctorParameters = () => [];

class ConfirmationComponent {
    /**
     * @param {?} _injector
     * @param {?} _ngZone
     */
    constructor(_injector, _ngZone) {
        this._injector = _injector;
        this._ngZone = _ngZone;
        this.animationState = 'enter';
        this.incomingData = {
            title: '',
            message: '',
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            confirmText: 'Yes',
            declineText: 'No',
            resolve: null
        };
        for (const key in this.incomingData) {
            const fromInjector = this._injector.get(key);
            if (fromInjector !== undefined) {
                this.incomingData[key] = fromInjector;
            }
        }
    }
    /**
     * @return {?}
     */
    overlayClick() {
        if (!this.incomingData.overlayClickToClose) {
            return;
        }
        this.close('overlayClick');
    }
    /**
     * @param {?} type
     * @return {?}
     */
    close(type) {
        this.animationState = 'leave';
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this._ngZone.run(() => {
                    this.resolve({ closedWithOutResolving: type });
                });
            }, 450);
        });
    }
    /**
     * @param {?} how
     * @return {?}
     */
    resolve(how) {
        this.animationState = 'leave';
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this._ngZone.run(() => {
                    this.incomingData.resolve.next(how);
                });
            }, 450);
        });
    }
}
ConfirmationComponent.decorators = [
    { type: Component, args: [{
                selector: 'jaspero-confirmation',
                template: `
        <div *ngIf="incomingData.overlay" class="jaspero__overlay" [@overlayAn]="animationState" (click)="overlayClick()"></div>
        <div class="jaspero__dialog" [@wrapperAn]="animationState">
            <div class="jaspero__dialog-title">
                {{incomingData.title}}
            </div>
            <div class="jaspero__dialog-content">
                {{incomingData.message}}
            </div>
            <div class="jaspero__dialog-actions">
                <button class="default" (click)="resolve({resolved: false})">{{incomingData.declineText}}</button>
                <button class="primary" (click)="resolve({resolved: true})">{{incomingData.confirmText}}</button>
            </div>
        </div>
    `,
                styles: [`
        :host {
            display: block;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-flow: column;
            flex-flow: column;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 108;
        }

        .jaspero__overlay {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(0,0,0,.54);
            transform: translateZ(0);
            opacity: 0;
            transition: all .5s cubic-bezier(.35,0,.25,1);
            position: fixed;
            z-index: 109;
        }

        .jaspero__dialog {
            min-width: 300px;
            max-width: 50%;
            max-height: 50%;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-flow: column;
            flex-flow: column;
            overflow: hidden;
            position: relative;
            z-index: 110;
            outline: none;
            border-radius: 2px;
            opacity: 0;
            box-shadow: 0 7px 9px -4px rgba(0,0,0,.2), 0 14px 21px 2px rgba(0,0,0,.14), 0 5px 26px 4px rgba(0,0,0,.12);
            -ms-transform: scale(.9,.85);
            transform: scale(.9,.85);
            -ms-transform-origin: center center;
            transform-origin: center center;
            transition: opacity .4s cubic-bezier(.25,.8,.25,1),transform .4s cubic-bezier(.25,.8,.25,1) .05s;
            will-change: opacity,transform;
            background-color: #fff;
            color: rgba(0, 0, 0, .87);
        }

        .jaspero__dialog-icon {
            padding: 40px;
            text-align: center;
        }
        .jaspero__dialog-icon svg {
            width: 50px;
            height: 50px;
        }

        .jaspero__dialog-icon svg path {
            fill: white;
        }

        .jaspero__dialog-title {
            font-size: 24px;
            font-weight: 500;
            letter-spacing: .005em;
            line-height: 26px;
            margin-bottom: 20px;
            padding: 24px 24px 0;
            text-transform: capitalize;
        }

        .jaspero__dialog-content {
            padding: 0 24px 24px;
            -ms-flex: 1;
            flex: 1;
            overflow: auto;
            position: relative;
        }

        .jaspero__dialog-actions {
            min-height: 52px;
            padding: 8px 8px 8px 24px;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-pack: end;
            justify-content: flex-end;
            position: relative;
        }

        .jaspero__dialog-actions button {
            min-width: 88px;
            min-height: 36px;
            margin: 6px 8px;
            padding: 0 16px;
            display: inline-block;
            position: relative;
            overflow: hidden;
            outline: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            cursor: pointer;
            background: none;
            border: 0;
            border-radius: 2px;
            transition: all .4s cubic-bezier(.25,.8,.25,1);
            color: inherit;
            font-family: inherit;
            font-size: 14px;
            font-style: inherit;
            font-variant: inherit;
            font-weight: 500;
            letter-spacing: inherit;
            line-height: 36px;
            text-align: center;
            text-transform: uppercase;
            text-decoration: none;
            vertical-align: top;
            white-space: nowrap;
        }

        .jaspero__dialog-actions button.default {
            color: inherit;
        }

        .jaspero__dialog-actions button.default:hover {
            background-color: hsla(0,0%,60%,.2);
        }

        .jaspero__dialog-actions button.primary {
            background-color: #ec4a1d;
            color: rgba(255, 255, 255, .87);
        }

        .jaspero__dialog-actions button.primary:hover {
            background-color: inherit;
        }

        .jaspero__dialog-actions button.raised {
            box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
        }

        :host(.success) .jaspero__dialog-icon {background: #17A398}
        :host(.error) .jaspero__dialog-icon {background: #D64550}
        :host(.warning) .jaspero__dialog-icon {background: #FFC857}
        :host(.info) .jaspero__dialog-icon {background: #8FBFE0}
    `],
                animations: [
                    trigger('overlayAn', [
                        state('void', style({ opacity: 0 })),
                        state('leave', style({ opacity: 0 })),
                        state('enter', style({ opacity: 1 })),
                        transition('void => enter', animate('400ms cubic-bezier(.25,.8,.25,1)')),
                        transition('enter => leave', animate('400ms cubic-bezier(.25,.8,.25,1)'))
                    ]),
                    trigger('wrapperAn', [
                        state('void', style({ opacity: 0, transform: 'scale(0.75, 0.75) translate(0, 0)' })),
                        state('leave', style({ opacity: 0, transform: 'scale(0.75, 0.75) translate(0, 0)' })),
                        state('enter', style({ opacity: 1, transform: 'scale(1, 1) translate(0, 0)' })),
                        transition('void => enter', animate('450ms cubic-bezier(.5, 1.4, .5, 1)')),
                        transition('enter => leave', animate('450ms cubic-bezier(.5, 1.4, .5, 1)'))
                    ])
                ]
            },] },
];
/**
 * @nocollapse
 */
ConfirmationComponent.ctorParameters = () => [
    { type: Injector, },
    { type: NgZone, },
];

class ConfirmationsComponent {
    /**
     * @param {?} _service
     * @param {?} _resolver
     */
    constructor(_service, _resolver) {
        this._service = _service;
        this._resolver = _resolver;
        this.settings = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            confirmText: 'Yes',
            declineText: 'No'
        };
    }
    /**
     * @param {?} settings
     * @return {?}
     */
    set defaultSettings(settings) {
        this.settings = Object.assign({}, this.settings, settings);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._listener = this._service.confirmation$.subscribe((alert) => {
            if (this._current) {
                this._handleResolve();
            }
            if (!alert.close) {
                const /** @type {?} */ settingsFinalAsArray = [];
                const /** @type {?} */ settingFinalAsObj = {};
                for (const /** @type {?} */ key in this.settings) {
                    const /** @type {?} */ toUse = alert.override[key] !== undefined ? alert.override[key] : this.settings[key];
                    settingsFinalAsArray.push({ key: key, value: toUse });
                    settingFinalAsObj[key] = toUse;
                }
                const /** @type {?} */ inputProviders = [
                    { key: 'message', value: alert.message },
                    { key: 'title', value: alert.title },
                    { key: 'resolve', value: alert.resolve$ },
                    ...settingsFinalAsArray
                ].map((input) => {
                    return { provide: input.key, useValue: input.value };
                });
                const /** @type {?} */ resolvedInputs = ReflectiveInjector.resolve(inputProviders);
                const /** @type {?} */ injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.compViewContainerRef.parentInjector);
                const /** @type {?} */ factory = this._resolver.resolveComponentFactory(ConfirmationComponent);
                const /** @type {?} */ component = factory.create(injector);
                this._lastResolve = alert.resolve$.subscribe((res) => this._handleResolve(res));
                this.compViewContainerRef.insert(component.hostView);
                this._current = component;
            }
        });
    }
    /**
     * @param {?=} res
     * @return {?}
     */
    _handleResolve(res) {
        this._current.destroy();
        this._lastResolve.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._listener) {
            this._listener.unsubscribe();
        }
    }
}
ConfirmationsComponent.decorators = [
    { type: Component, args: [{
                selector: 'jaspero-confirmations',
                entryComponents: [ConfirmationComponent],
                template: `<div #comp></div>`
            },] },
];
/**
 * @nocollapse
 */
ConfirmationsComponent.ctorParameters = () => [
    { type: ConfirmationService, },
    { type: ComponentFactoryResolver, },
];
ConfirmationsComponent.propDecorators = {
    'compViewContainerRef': [{ type: ViewChild, args: ['comp', { read: ViewContainerRef },] },],
    'defaultSettings': [{ type: Input },],
};

class JasperoConfirmationsModule {
}
JasperoConfirmationsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    ConfirmationsComponent,
                    ConfirmationComponent
                ],
                providers: [ConfirmationService],
                exports: [ConfirmationsComponent]
            },] },
];
/**
 * @nocollapse
 */
JasperoConfirmationsModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { JasperoConfirmationsModule, ConfirmationsComponent, ConfirmationComponent, ConfirmationService };
//# sourceMappingURL=ng2-confirmations.js.map
