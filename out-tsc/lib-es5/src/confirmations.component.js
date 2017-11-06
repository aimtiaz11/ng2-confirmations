var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Component, ViewContainerRef, Input, ReflectiveInjector, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ConfirmationService } from './confirmations.service';
import { ConfirmationComponent } from './confirmation.component';
var ConfirmationsComponent = /** @class */ (function () {
    /**
     * @param {?} _service
     * @param {?} _resolver
     */
    function ConfirmationsComponent(_service, _resolver) {
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
    Object.defineProperty(ConfirmationsComponent.prototype, "defaultSettings", {
        /**
         * @param {?} settings
         * @return {?}
         */
        set: function (settings) {
            this.settings = __assign({}, this.settings, settings);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ConfirmationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._listener = this._service.confirmation$.subscribe(function (alert) {
            if (_this._current) {
                _this._handleResolve();
            }
            if (!alert.close) {
                var /** @type {?} */ settingsFinalAsArray = [];
                var /** @type {?} */ settingFinalAsObj = {};
                for (var /** @type {?} */ key in _this.settings) {
                    var /** @type {?} */ toUse = alert.override[key] !== undefined ? alert.override[key] : _this.settings[key];
                    settingsFinalAsArray.push({ key: key, value: toUse });
                    settingFinalAsObj[key] = toUse;
                }
                var /** @type {?} */ inputProviders = [
                    { key: 'message', value: alert.message },
                    { key: 'title', value: alert.title },
                    { key: 'resolve', value: alert.resolve$ }
                ].concat(settingsFinalAsArray).map(function (input) {
                    return { provide: input.key, useValue: input.value };
                });
                var /** @type {?} */ resolvedInputs = ReflectiveInjector.resolve(inputProviders);
                var /** @type {?} */ injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, _this.compViewContainerRef.parentInjector);
                var /** @type {?} */ factory = _this._resolver.resolveComponentFactory(ConfirmationComponent);
                var /** @type {?} */ component = factory.create(injector);
                _this._lastResolve = alert.resolve$.subscribe(function (res) { return _this._handleResolve(res); });
                _this.compViewContainerRef.insert(component.hostView);
                _this._current = component;
            }
        });
    };
    /**
     * @param {?=} res
     * @return {?}
     */
    ConfirmationsComponent.prototype._handleResolve = function (res) {
        this._current.destroy();
        this._lastResolve.unsubscribe();
    };
    /**
     * @return {?}
     */
    ConfirmationsComponent.prototype.ngOnDestroy = function () {
        if (this._listener) {
            this._listener.unsubscribe();
        }
    };
    ConfirmationsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jaspero-confirmations',
                    entryComponents: [ConfirmationComponent],
                    template: "<div #comp></div>"
                },] },
    ];
    /**
     * @nocollapse
     */
    ConfirmationsComponent.ctorParameters = function () { return [
        { type: ConfirmationService, },
        { type: ComponentFactoryResolver, },
    ]; };
    ConfirmationsComponent.propDecorators = {
        'compViewContainerRef': [{ type: ViewChild, args: ['comp', { read: ViewContainerRef },] },],
        'defaultSettings': [{ type: Input },],
    };
    return ConfirmationsComponent;
}());
export { ConfirmationsComponent };
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