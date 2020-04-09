import { Cmd } from './core/commands';

export interface IExternalProgram {
    title: string;
    description?: string;
    code?: string | string[];
    bytes: string | string[];
    instruction?: Array<{
        text: string;
        position?: number;
        action?: string;
    }>;
    authors: Array<{
        author: string;
        email?: string;
        url?: string;
    }>;
    url?: string;
    tests?: Array<{
        name?: string;
        description?: string;
        steps: Array<{
            in?: Cmd[];
            out?: string;
        }>
    }>
}