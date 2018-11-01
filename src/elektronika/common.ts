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