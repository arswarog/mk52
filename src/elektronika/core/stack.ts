import { InputRegister, Register } from './register';

interface IStack {
    x1: Register;
    x: Register;
    y: Register;
    z: Register;
    t: Register;
    canInput: boolean;
}

export class Stack implements IStack {
    public x1: Register = new Register(0.000000056723);
    public x: Register  = new Register(5735.23);
    public y: Register  = new Register(34536343634534535);
    public z: Register  = new Register(67835.3437345634534);
    public t: Register  = new Register(100000000000000000000000000);

    public canInput: boolean = false;

    constructor(stack?: IStack) {
        if (stack)
            Object.assign(this, stack);
    }

    public input(num: number): Stack {
        let stack: Stack = this;
        if (!this.canInput)
            stack = stack.enter();
        return new Stack({
            t       : stack.t,
            z       : stack.z,
            y       : stack.y,
            x       : stack.x.input(num),
            x1      : stack.x1,
            canInput: true,
        });
    }

    public completeInput(): Stack {
        if (this.x instanceof InputRegister || this.canInput)
            return new Stack({
                t       : this.t,
                z       : this.z,
                y       : this.y,
                x       : new Register(this.x),
                x1      : this.x1,
                canInput: false,
            });
        return this;
    }

    public enter(insert?: Register): Stack {
        const stack = this.completeInput();
        if (!insert) insert = stack.x;
        return new Stack({
            t       : stack.z,
            z       : stack.y,
            y       : stack.x,
            x       : insert,
            x1      : stack.x,
            canInput: true,
        });
    }

    public swap(): Stack {
        const stack = this.completeInput();
        return new Stack({
            t       : stack.t,
            z       : stack.z,
            y       : stack.x,
            x       : stack.y,
            x1      : stack.x,
            canInput: false,
        });
    }

    public op1(reg: Register): Stack {
        return new Stack({
            t       : this.t,
            z       : this.z,
            y       : this.y,
            x       : reg,
            x1      : this.x,
            canInput: false,
        });
    }

    public op2(reg: Register): Stack {
        return new Stack({
            t       : this.t,
            z       : this.t,
            y       : this.z,
            x       : reg,
            x1      : this.x,
            canInput: false,
        });
    }
}