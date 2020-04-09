import { declareAction } from '@reatom/core';
import { MKButton } from '../../elektronika/common';

const NS = 'mk-core';

export const pressButton = declareAction<MKButton>(NS + ':pressButton');
