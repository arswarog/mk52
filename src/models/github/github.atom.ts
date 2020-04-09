import { declareAtom } from '@reatom/core';
import { IGithubState, UrlType } from './github.types';
import { loadingUri, loadList, loadListFailed, loadUri, loadUriFailed } from './github.actions';

export const Github = declareAtom<IGithubState>(
    ['github'],
    {
        uri: 'arswarog/mk52-programs/blob/master',
        files: [
            //{
            //    path : '/math-basic/quadratic_equation.mk',
            //    title: 'Решение квадратного линейного уравнения',
            //},
        ],
        dirs: [],
        loading: false,
        urlDetails: {
            type: UrlType.Programm,
            vendor: 'arswarog',
            repo: 'mk52_programs',
            branch: 'master',
            path: '/',
        },
    },
    on => [
        on(loadList, (state, action) => {
            return {
                ...state,
                files: action.tree.tree
                             .filter((item: any) => item.type === 'blob' && item.path.match(/\.mk$/))
                             .map(
                                 (item: any) => ({
                                     path: item.path,
                                     title: '/' + item.path.match(/^(.+)\.mk$/)[1],
                                 }),
                             ),
            };
        }),
        on(loadListFailed, (state, action) => {
            console.error(action.error.message);
            console.info(`More info on ${action.error.documentation_url}`);
            return {
                ...state,
                loading: false,
            };
        }),
        on(loadingUri, (state) => {
            return {
                ...state,
                loading: true,
            };
        }),
        on(loadUri, (state) => {
            return {
                ...state,
                loading: true,
            };
        }),
        on(loadUriFailed, (state) => {
            return {
                ...state,
                loading: false,
            };
        }),
    ],
);
