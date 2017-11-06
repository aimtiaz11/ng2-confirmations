import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
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
export { ConfirmationService };
function ConfirmationService_tsickle_Closure_declarations() {
    /** @type {?} */
    ConfirmationService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ConfirmationService.ctorParameters;
    /** @type {?} */
    ConfirmationService.prototype.confirmation$;
}
//# sourceMappingURL=confirmations.service.js.map