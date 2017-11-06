import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
export class ConfirmationService {
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