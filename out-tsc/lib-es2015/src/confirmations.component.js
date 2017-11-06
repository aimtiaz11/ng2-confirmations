import { Component, ViewContainerRef, Input, ReflectiveInjector, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ConfirmationService } from './confirmations.service';
import { ConfirmationComponent } from './confirmation.component';
export class ConfirmationsComponent {
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
function ConfirmationsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ConfirmationsComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ConfirmationsComponent.ctorParameters;
    /** @type {?} */
    ConfirmationsComponent.propDecorators;
    /** @type {?} */
    ConfirmationsComponent.prototype.compViewContainerRef;
    /** @type {?} */
    ConfirmationsComponent.prototype.settings;
    /** @type {?} */
    ConfirmationsComponent.prototype._current;
    /** @type {?} */
    ConfirmationsComponent.prototype._lastResolve;
    /** @type {?} */
    ConfirmationsComponent.prototype._listener;
    /** @type {?} */
    ConfirmationsComponent.prototype._service;
    /** @type {?} */
    ConfirmationsComponent.prototype._resolver;
}
//# sourceMappingURL=confirmations.component.js.map