export interface IGithubState {
    uri: string;
    dirs: IDir[];
    files: IFile[];
    loading: boolean;
    urlDetails: IGithubUrlDetails;
}

export interface IGithubUrlDetails {
    type: UrlType;
    vendor?: string;
    repo?: string;
    branch?: string;
    path?: string;
}

export enum UrlType {
    Invalid,
    Repository,
    Directory,
    Programm,
    OtherFile,
}

export interface IFile {
    path: string;
    title: string;
}

export interface IDir {
    name: string;
    path: string;
}

export interface IGithubTreeNode {
    path: string;
    mode: string;
    type: 'blob' | 'tree';
    size?: number;
    sha: string;
    url: string;
}
