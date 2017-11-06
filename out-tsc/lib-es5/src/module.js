import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationsComponent } from './confirmations.component';
import { ConfirmationComponent } from './confirmation.component';
import { ConfirmationService } from './confirmations.service';
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
export { JasperoConfirmationsModule };
function JasperoConfirmationsModule_tsickle_Closure_declarations() {
    /** @type {?} */
    JasperoConfirmationsModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JasperoConfirmationsModule.ctorParameters;
}
//# sourceMappingURL=module.js.map