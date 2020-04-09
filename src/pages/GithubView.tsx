import * as React from 'react';

import './Github.scss';
import { useAtom } from '@reatom/react';
import { Github } from '../models/github/github.atom';
import { useParams } from 'react-router';

export const GithubView = () => {
    const params = useParams() as any; // FIXME G
    //props.match.params[0],
    console.log(params);
    const path = params[0];
    const uri = useAtom(Github, state => state.uri, []);
    const urlDetails = useAtom(Github, state => state.urlDetails, []);
    const dirs = useAtom(Github, state => state.dirs, []);
    const files = useAtom(Github, state => state.files, []);

    return <div className="page-github">
        <div className="center">ВСЕ ПРОГРАММЫ</div>
        <p>Файл: {path}</p>
    </div>;
};
