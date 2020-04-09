import { declareAction } from '@reatom/core';

const NS = 'github';

export const loadList = declareAction<any>(NS + ':loadList');
export const loadListFailed = declareAction<any>(NS + ':loadListFailed');
export const loadUri = declareAction<any>(NS + ':loadUri');
export const loadingUri = declareAction<any>(NS + ':loadingUri');
export const loadUriFailed = declareAction<any>(NS + ':loadUriFailed');
