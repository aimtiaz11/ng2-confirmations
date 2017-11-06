import { Subject } from 'rxjs/Subject';
import { ConfirmSettings } from './interfaces/confirm-settings';
import { ConfirmEmit } from './interfaces/confirm-emit';
import { ResolveEmit } from './interfaces/resolve-emit';
export declare class ConfirmationService {
    confirmation$: Subject<ConfirmEmit>;
    create(title: string, message: string, override?: ConfirmSettings): Subject<ResolveEmit>;
}
