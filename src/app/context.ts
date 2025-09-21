import { connectLogger, createCtx } from '@reatom/framework';

export const ctx = createCtx();
connectLogger(ctx);
