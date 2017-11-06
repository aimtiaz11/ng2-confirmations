import { Component, Injector, NgZone } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
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
export { ConfirmationComponent };
function ConfirmationComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ConfirmationComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ConfirmationComponent.ctorParameters;
    /** @type {?} */
    ConfirmationComponent.prototype.animationState;
    /** @type {?} */
    ConfirmationComponent.prototype.incomingData;
    /** @type {?} */
    ConfirmationComponent.prototype._injector;
    /** @type {?} */
    ConfirmationComponent.prototype._ngZone;
}
//# sourceMappingURL=confirmation.component.js.map