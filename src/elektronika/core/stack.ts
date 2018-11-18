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
        if (!(this.x instanceof InputRegister || this.canInput))
            stack = stack.enter();
        console.log(stack);
        return new Stack({
            t       : stack.t,
            z       : stack.z,
            y       : stack.y,
            x       : stack.x.input(num),
            x1      : stack.x1,
            canInput: false,
        });
    }

    public enter(): Stack {
        let x = this.x;
        if (x instanceof InputRegister)
            x = new Register(x);
        return new Stack({
            t       : this.z,
            z       : this.y,
            y       : x,
            x,
            x1      : x,
            canInput: true,
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