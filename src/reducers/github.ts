// https://developer.github.com/v3/git/trees/

import { AnyAction } from 'redux';

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

export function github(state: IGithubState, action: AnyAction): IGithubState {
    if (!state) {
        state = {
            uri       : 'arswarog/mk52-programs/blob/master',
            files     : [
                //{
                //    path : '/math-basic/quadratic_equation.mk',
                //    title: 'Решение квадратного линейного уравнения',
                //},
            ],
            dirs      : [],
            loading   : false,
            urlDetails: {
                type  : UrlType.Programm,
                vendor: 'arswarog',
                repo  : 'mk52_programs',
                branch: 'master',
                path  : '/',
            },
        };
    }

    switch (action.type) {
        case 'LOAD_LIST':
            return {
                ...state,
                files: action.tree.tree
                             .filter((item: any) => item.type === 'blob' && item.path.match(/\.mk$/))
                             .map(
                                 (item: any) => ({
                                     path : item.path,
                                     title: '/' + item.path.match(/^(.+)\.mk$/)[1],
                                 }),
                             ),
            };
        case 'LOAD_URI':
            return {
                ...state,
                loading: true,
            };
        case 'LOAD_SUCCESS':
            return {
                ...state,
                loading: false,
            };
        case 'LOAD_ERROR':
            return {
                ...state,
                loading: false,
            };
    }
    return state;
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

export function parseGithubUrl(url: string): IGithubUrlDetails {
    let match: RegExpMatchArray = null;
    if (!url.match(/^https:\/\/github.com/))
        return parseGithubUrlResult(UrlType.Invalid, match);

    if (match = url.match(/^https:\/\/github.com\/([\w-\.]+)\/([\w-\.]+)$/))
        return parseGithubUrlResult(UrlType.Repository, match);

    if (match = url.match(/^https:\/\/github.com\/([\w-\.]+)\/([\w-\.]+)\/tree\/([-\w]+)(.*)$/))
        return parseGithubUrlResult(UrlType.Directory, match);

    if (match = url.match(/^https:\/\/github.com\/([\w-\.]+)\/([\w-\.]+)\/blob\/([-\w]+)(.*\.mk)$/))
        return parseGithubUrlResult(UrlType.Programm, match);

    if (match = url.match(/^https:\/\/github.com\/([\w-\.]+)\/([\w-\.]+)\/blob\/([-\w]+)(.*)$/))
        return parseGithubUrlResult(UrlType.OtherFile, match);

    return parseGithubUrlResult(UrlType.Invalid, match);
}

function parseGithubUrlResult(type: UrlType, match: RegExpMatchArray): IGithubUrlDetails {
    const result = {
        type,
    };

    switch (type) {
        case UrlType.Programm:
        case UrlType.OtherFile:
        case UrlType.Directory:
            result['path']   = match[4] ? match[4] : '/';
            result['branch'] = match[3];
        case UrlType.Repository        :
            result['repo']   = match[2];
            result['vendor'] = match[1];
        case UrlType.Invalid:
        default:
    }

    return result as IGithubUrlDetails;
}