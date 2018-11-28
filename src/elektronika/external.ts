export interface IExternalProgram {
    title: string;
    description?: string;
    code: string | string[];
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
}