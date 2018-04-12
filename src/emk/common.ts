import { Register } from "./register";

export interface IControllerState {
    core: ICoreState

}

export interface Stack<T> {
    x1: T,
    x: T,
    y: T,
    z: T,
    t: T,
}

export class MKButton {
    constructor(
        public key: string,
        public text: string,
        public color: 'f' | 'k' | 'b' | 'w' | 'r' = 'b',
        public code: string,
        public f?: string,
        public codef?: string,
        public k?: string,
        public codek?: string,
        public register?: string,
    ) {
    }
}

export interface Registers {
    [key: string]: Register
}

export enum CoreMode {
    Default        = 0,
    AddToMantissa  = 1,
    AddToMagnitude = 2,
    Added          = 3,
}

interface IInputBuffer {
    sign: 1 | -1,
    mantissa: string,
    m_sign: 1 | -1,
    magnitude: string
}

export interface ICoreState {
    mode: CoreMode;
    x1: Register;
    x: Register;
    y: Register;
    z: Register;
    t: Register;
    ip: number;
    registers: Registers;
    inputBuffer: IInputBuffer;
}