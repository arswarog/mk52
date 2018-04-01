import { CoreMode, MK52Core } from "./MK52Core";
import { Register } from "./register";
import { DisplayMode, MKDisplay } from "./MK52";

export interface Stack<T> {
    x1: T,
    x: T,
    y: T,
    z: T,
    t: T,
}

export enum ControllerMode {
    Loading,
    User,
    Programming,
    Run,
}

export class MKController {
    private _mode: ControllerMode = ControllerMode.Loading;
    private core: MK52Core        = new MK52Core();

    get display(): MKDisplay {
        if (this._mode === ControllerMode.Loading)
            return new MKDisplay(DisplayMode.Loading);

        switch (this.core.mode) {
//            case CoreMode.AddToMantissa:
//                return new
//            case CoreMode.AddToMagnitude:
            case CoreMode.Default:
            default:
                return new MKDisplay(this.core.display);
        }

    }

    get mode(): ControllerMode {
        return this._mode;
    }

    get stack(): Stack<Register> {
        return {
            x1: this.core.x1,
            x : this.core.x,
            y : this.core.y,
            z : this.core.z,
            t : this.core.t,
        };
    }

    start() {
        this._mode = ControllerMode.User;
    }

    press(code: string) {
        console.log(`CODE ${code}`);
        this.core.exec(code);
    }

}