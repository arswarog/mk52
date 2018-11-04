import { Cmd } from './core/commands';

export class MKButton {
    public key: string;
    public text: string;
    public color: 'f' | 'k' | 'b' | 'w' | 'r' = 'b';
    public cmd: Cmd;
    public cmdf?: Cmd;
    public textf?: string;
    public cmdk?: Cmd;
    public textk?: string;
    public register?: string;
    public registerText?: string;
}

export function makeButton(labels: {[key: string]: string}) {
    return (
        color: 'f' | 'k' | 'b' | 'w' | 'r' = 'b',
        main: Cmd,
        f?: Cmd,
        k?: Cmd,
        reg?: string,
    ) => {
        const button        = new MKButton();
        button.color        = color;
        button.cmd          = main;
        button.text         = labels[main];
        button.cmdf         = f;
        button.textf        = labels[f];
        button.cmdk         = k;
        button.textk        = labels[k];
        button.register     = reg;
        button.registerText = (reg && Number.isNaN(+reg)) ? reg : null;
        return button;
    };
}