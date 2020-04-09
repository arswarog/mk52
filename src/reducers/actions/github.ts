//const api  = 'https://api.github.com';
import { loadListFailed } from '../../models/github/github.actions';
import { declareAction, declareAtom } from '@reatom/core';

const NS = 'github';

const api = '/demo-api';
const repo = 'arswarog/mk52-programs';
//
// export const loadList = declareAction(
//     NS + ':loadList',
//     (dispatch: (action: any) => void) => {
//
//         fetch(`${api}/repos/${repo}/git/refs/heads/master`)
//             .then(
//                 result => {
//                     console.log(result);
//                     if (result.status >= 400) {
//                         result.json().then(
//                             error => store.dispatch(
//                                 loadListFailed(error),
//                             ),
//                         );
//
//                         if (result.headers.has('X-RateLimit-Reset')) {
//                             console.log(`Github rate limits per hour ${result.headers.get('X-RateLimit-Limit')}, remaining ${result.headers.get('X-RateLimit-Remaining')}`);
//                             console.log(`   reset on ${Math.ceil(+result.headers.get('X-RateLimit-Reset') / 60 - (new Date).getTime() / 60000)} min`);
//                         }
//
//                         throw new Error();
//                     }
//                     return result.json();
//                 },
//             )
//             .then(
//                 ref => {
//                     console.log(ref);
//                     const sha = ref.object.sha;
//                     return fetch(`${api}/repos/${repo}/git/trees/${sha}?recursive=1`);
//                 },
//             )
//             .then(
//                 result => result.json(),
//             )
//             .then(
//                 tree => dispatch({
//                     type: ActionTypeGithub.LoadList,
//                     tree,
//                 }),
//             )
//             .catch(
//                 error => console.log,
//             );
//     };
// }
//
// export function loadUri(uri: string) {
//     return (dispatch: (action: AnyAction) => void) => {
//         return () => {
//             dispatch({
//                 type: ActionTypeGithub.LoadingUri,
//                 uri,
//             });
//
//             // GET /repos/:owner/:repo/git/blobs/:file_sha
//
//             fetch(`${api}/repos/${repo}/git/refs/heads/master`)
//                 .then(
//                     result => result.json(),
//                 )
//                 .then(
//                     ref => {
//                         console.log(ref);
//                         const sha = ref.object.sha;
//                         return fetch(`${api}/repos/${repo}/git/trees/${sha}?recursive=1`);
//                     },
//                 )
//                 .then(
//                     result => result.json(),
//                 )
//                 .then(
//                     tree => dispatch({
//                         type: 'LOAD_LIST',
//                         tree,
//                     }),
//                 );
//         };
//     };
// }

