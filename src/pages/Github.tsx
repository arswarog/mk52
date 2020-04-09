import * as React from 'react';
import { Link } from 'react-router-dom';

import './Github.scss';
import { useAction, useAtom } from '@reatom/react';
import { Github } from '../models/github/github.atom';
import { loadUri } from '../models/github/github.actions';

export const GithubPage = () => {
    const uri = useAtom(Github, state => state.uri, []);
    const urlDetails = useAtom(Github, state => state.urlDetails, []);
    const dirs = useAtom(Github, state => state.dirs, []);
    const files = useAtom(Github, state => state.files, []);

    const handleLoadUri = useAction(loadUri);

    return <div className="page-github">
        <div className="center">ВСЕ ПРОГРАММЫ</div>
        {/*<form action="#/github" method="get">*/}
        {/*/!*<input name="uri" placeholder="https://github.com/arswarog/mk52-programs" value={uri}/>*!/*/}
        {/*<input name="uri" placeholder="https://github.com/arswarog/mk52-programs"*/}
        {/*value="https://github.com/arswarog/mk52-programs/blob/master/math-basic/quadratic_equation.mk"/>*/}
        {/*<button type="submit">Загрузить</button>*/}
        {/*</form>*/}
        <div className="url_info">
            {/*<div className="repository">*/}
            {/*Репозиторий: <a href={`https://github.com/${urlDetails.vendor}`}*/}
            {/*target="_blank" className="author">{urlDetails.vendor}</a>*/}
            {/*/<a href={`https://github.com/${urlDetails.vendor}/${urlDetails.repo}`}*/}
            {/*target="_blank" className="repo">{urlDetails.repo}</a>*/}
            {/*</div>*/}
            {/*<div className="branch">*/}
            {/*Ветка: <Link to={`/github/${urlDetails.vendor}/${urlDetails.repo}/${urlDetails.branch}`}>*/}
            {/*{urlDetails.branch}</Link>*/}
            {/*</div>*/}
            {/*<div className="path">*/}
            {/*Фаил: <span>/</span><span>math-basic/</span><span>quadratic_equation.mk</span>*/}
            {/*</div>*/}
        </div>
        {dirs.length ? [
            <h2 key="title">Директории</h2>,
            <ul key="list">
                {dirs.map(
                    (item, index) =>
                        <li key={index}><Link to={`${item}`}><b>{item}</b></Link></li>,
                )}
            </ul>,
        ] : null}
        {files.length ? [
            <h2 key="title">Файлы</h2>,
            <ul key="list">
                {files.map(
                    (item, index) =>
                        <li key={index}><a /*to={`/github/${item.path}`}*/
                            onClick={() => handleLoadUri(item.path)}>{item.title}</a>
                        </li>,
                )}
            </ul>,
        ] : null}
    </div>;
};
