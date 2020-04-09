import { Cmd } from './core/commands';
import { Program } from './core/program';
import { keyLabels } from './l18n';

const addressCommands: string[] = [
    Cmd.NEQ, Cmd.EQ, Cmd.GT, Cmd.LT,
    Cmd.L0, Cmd.L1, Cmd.L2, Cmd.L3,
    Cmd.goto,
];

export const codeLabels: {[key: string]: string} = {
    ...keyLabels,
    [Cmd.GT] : 'x>=0',//'x⩾0',
    [Cmd.NEQ]: 'x!=0',//'x≠0',
    [Cmd.RtX]: 'ПX',
    [Cmd.XtR]: 'XП',
};

export function programToView(program: Program): string[][] {
    let isNextAddress = false;

    return program.bytes.reduce(
        (codes: string[][], command: Cmd): string[][] => {
            const cmd: string = (command as string).toLowerCase();
            let line          = codes[codes.length - 1];
            if (line.length >= 10)
                line = codes[codes.length] = [];

            if (isNextAddress) {
                line.push(cmd.toLowerCase());
                isNextAddress = false;
            } else {
                let code = codeLabels[cmd];
                if (!code)
                    if (codeLabels[cmd.substr(0, 1) + 'x'])
                        code = codeLabels[cmd.substr(0, 1) + 'x'] + cmd.substr(1).toLowerCase();
                    else
                        code = '???';

                line.push(code);
                isNextAddress = addressCommands.indexOf(cmd) !== -1;
            }

            return codes;
        }, [[]],
    );
}