import { AnyAction } from 'redux';

const api  = 'https://api.github.com';
const repo = 'arswarog/mk52-programs';

export function loadList() {
    return (dispatch: (action: AnyAction) => void) => {

        fetch(`${api}/repos/${repo}/git/refs/heads/master`)
        .then(
            result => result.json(),
        )
        .then(
            ref => {
                console.log(ref);
                const sha = ref.object.sha;
                return fetch(`${api}/repos/${repo}/git/trees/${sha}?recursive=1`);
            },
        )
        .then(
            result => result.json(),
        )
        .then(
            tree => dispatch({
                type: 'LOAD_LIST',
                tree,
            }),
        );

        //dispatch({
        //    type : 'LOAD_LIST',
        //    files:,
        //});
    };
}

export function loadUri(uri: string) {
    return (dispatch: (action: AnyAction) => void) => {
        // GET /repos/:owner/:repo/git/blobs/:file_sha

        return {
            type: 'LOAD_URI',
        };
    };
}

