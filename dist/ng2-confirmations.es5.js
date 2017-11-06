import { Component, ComponentFactoryResolver, Injectable, Injector, Input, NgModule, NgZone, ReflectiveInjector, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { animate, state, style, transition, trigger } from '@angular/animations';

var ConfirmationService = /** @class */ (function () {
    function ConfirmationService() {
        this.confirmation$ = new Subject();
    }
    /**
     * @param {?} title
     * @param {?} message
     * @param {?=} override
     * @return {?}
     */
    ConfirmationService.prototype.create = function (title, message, override) {
        if (override === void 0) { override = {}; }
        var /** @type {?} */ resolve$ = new Subject();
        this.confirmation$.next({
            title: title,
            message: message,
            resolve$: resolve$,
            override: override
        });
        return resolve$;
    };
    ConfirmationService.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    ConfirmationService.ctorParameters = function () { return []; };
    return ConfirmationService;
}());

var ConfirmationComponent = /** @class */ (function () {
    /**
     * @param {?} _injector
     * @param {?} _ngZone
     */
    function ConfirmationComponent(_injector, _ngZone) {
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
        for (var key in this.incomingData) {
            var fromInjector = this._injector.get(key);
            if (fromInjector !== undefined) {
                this.incomingData[key] = fromInjector;
            }
        }
    }
    /**
     * @return {?}
     */
    ConfirmationComponent.prototype.overlayClick = function () {
        if (!this.incomingData.overlayClickToClose) {
            return;
        }
        this.close('overlayClick');
    };
    /**
     * @param {?} type
     * @return {?}
     */
    ConfirmationComponent.prototype.close = function (type) {
        var _this = this;
        this.animationState = 'leave';
        this._ngZone.runOutsideAngular(function () {
            setTimeout(function () {
                _this._ngZone.run(function () {
                    _this.resolve({ closedWithOutResolving: type });
                });
            }, 450);
        });
    };
    /**
     * @param {?} how
     * @return {?}
     */
    ConfirmationComponent.prototype.resolve = function (how) {
        var _this = this;
        this.animationState = 'leave';
        this._ngZone.runOutsideAngular(function () {
            setTimeout(function () {
                _this._ngZone.run(function () {
                    _this.incomingData.resolve.next(how);
                });
            }, 450);
        });
    };
    ConfirmationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'jaspero-confirmation',
                    template: "\n        <div *ngIf=\"incomingData.overlay\" class=\"jaspero__overlay\" [@overlayAn]=\"animationState\" (click)=\"overlayClick()\"></div>\n        <div class=\"jaspero__dialog\" [@wrapperAn]=\"animationState\">\n            <div class=\"jaspero__dialog-title\">\n                {{incomingData.title}}\n            </div>\n            <div class=\"jaspero__dialog-content\">\n                {{incomingData.message}}\n            </div>\n            <div class=\"jaspero__dialog-actions\">\n                <button class=\"default\" (click)=\"resolve({resolved: false})\">{{incomingData.declineText}}</button>\n                <button class=\"primary\" (click)=\"resolve({resolved: true})\">{{incomingData.confirmText}}</button>\n            </div>\n        </div>\n    ",
                    styles: ["\n        :host {\n            display: block;\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-flow: column;\n            flex-flow: column;\n            -ms-flex-pack: center;\n            justify-content: center;\n            -ms-flex-align: center;\n            align-items: center;\n            position: fixed;\n            top: 0;\n            right: 0;\n            bottom: 0;\n            left: 0;\n            z-index: 108;\n        }\n\n        .jaspero__overlay {\n            top: 0;\n            right: 0;\n            bottom: 0;\n            left: 0;\n            background-color: rgba(0,0,0,.54);\n            transform: translateZ(0);\n            opacity: 0;\n            transition: all .5s cubic-bezier(.35,0,.25,1);\n            position: fixed;\n            z-index: 109;\n        }\n\n        .jaspero__dialog {\n            min-width: 300px;\n            max-width: 50%;\n            max-height: 50%;\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-flow: column;\n            flex-flow: column;\n            overflow: hidden;\n            position: relative;\n            z-index: 110;\n            outline: none;\n            border-radius: 2px;\n            opacity: 0;\n            box-shadow: 0 7px 9px -4px rgba(0,0,0,.2), 0 14px 21px 2px rgba(0,0,0,.14), 0 5px 26px 4px rgba(0,0,0,.12);\n            -ms-transform: scale(.9,.85);\n            transform: scale(.9,.85);\n            -ms-transform-origin: center center;\n            transform-origin: center center;\n            transition: opacity .4s cubic-bezier(.25,.8,.25,1),transform .4s cubic-bezier(.25,.8,.25,1) .05s;\n            will-change: opacity,transform;\n            background-color: #fff;\n            color: rgba(0, 0, 0, .87);\n        }\n\n        .jaspero__dialog-icon {\n            padding: 40px;\n            text-align: center;\n        }\n        .jaspero__dialog-icon svg {\n            width: 50px;\n            height: 50px;\n        }\n\n        .jaspero__dialog-icon svg path {\n            fill: white;\n        }\n\n        .jaspero__dialog-title {\n            font-size: 24px;\n            font-weight: 500;\n            letter-spacing: .005em;\n            line-height: 26px;\n            margin-bottom: 20px;\n            padding: 24px 24px 0;\n            text-transform: capitalize;\n        }\n\n        .jaspero__dialog-content {\n            padding: 0 24px 24px;\n            -ms-flex: 1;\n            flex: 1;\n            overflow: auto;\n            position: relative;\n        }\n\n        .jaspero__dialog-actions {\n            min-height: 52px;\n            padding: 8px 8px 8px 24px;\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-align: center;\n            align-items: center;\n            -ms-flex-pack: end;\n            justify-content: flex-end;\n            position: relative;\n        }\n\n        .jaspero__dialog-actions button {\n            min-width: 88px;\n            min-height: 36px;\n            margin: 6px 8px;\n            padding: 0 16px;\n            display: inline-block;\n            position: relative;\n            overflow: hidden;\n            outline: none;\n            -webkit-user-select: none;\n            -moz-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            cursor: pointer;\n            background: none;\n            border: 0;\n            border-radius: 2px;\n            transition: all .4s cubic-bezier(.25,.8,.25,1);\n            color: inherit;\n            font-family: inherit;\n            font-size: 14px;\n            font-style: inherit;\n            font-variant: inherit;\n            font-weight: 500;\n            letter-spacing: inherit;\n            line-height: 36px;\n            text-align: center;\n            text-transform: uppercase;\n            text-decoration: none;\n            vertical-align: top;\n            white-space: nowrap;\n        }\n\n        .jaspero__dialog-actions button.default {\n            color: inherit;\n        }\n\n        .jaspero__dialog-actions button.default:hover {\n            background-color: hsla(0,0%,60%,.2);\n        }\n\n        .jaspero__dialog-actions button.primary {\n            background-color: #ec4a1d;\n            color: rgba(255, 255, 255, .87);\n        }\n\n        .jaspero__dialog-actions button.primary:hover {\n            background-color: inherit;\n        }\n\n        .jaspero__dialog-actions button.raised {\n            box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);\n        }\n\n        :host(.success) .jaspero__dialog-icon {background: #17A398}\n        :host(.error) .jaspero__dialog-icon {background: #D64550}\n        :host(.warning) .jaspero__dialog-icon {background: #FFC857}\n        :host(.info) .jaspero__dialog-icon {background: #8FBFE0}\n    "],
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
    ConfirmationComponent.ctorParameters = function () { return [
        { type: Injector, },
        { type: NgZone, },
    ]; };
    return ConfirmationComponent;
}());

var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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

var JasperoConfirmationsModule = /** @class */ (function () {
    function JasperoConfirmationsModule() {
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
    JasperoConfirmationsModule.ctorParameters = function () { return []; };
    return JasperoConfirmationsModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { JasperoConfirmationsModule, ConfirmationsComponent, ConfirmationComponent, ConfirmationService };
//# sourceMappingURL=ng2-confirmations.es5.js.map
