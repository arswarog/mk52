import * as React from 'react';
import { connect } from 'react-redux';
import {  match as Match } from 'react-router-dom';

import './Github.scss';
//import { createSelector } from 'reselect';
import { IGlobalState } from '../reducers';

interface IProps {
    path: string;
}

//const detailsSelector = createSelector(
//    (state, props) => props.match.params[0],
//
//);

export const GithubView = connect(
    (state: IGlobalState, props: {match: Match<any>}) => ({
        path      : props.match.params[0],
        uri       : state.github.uri,
        urlDetails: state.github.urlDetails,
        dirs      : state.github.dirs,
        files     : state.github.files,
    }),
)(
    // tslint:ignore-line
    ({ path}: IProps) => {
        return <div className="page-github">
            <div className="center">ВСЕ ПРОГРАММЫ</div>
            <p>Файл: {path}</p>

        </div>;
    },
);
