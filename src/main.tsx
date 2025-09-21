import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { reatomContext } from '@reatom/npm-react';

import './index.css';

import { App, ctx } from './app';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <reatomContext.Provider value={ctx}>
            <App />
        </reatomContext.Provider>
    </StrictMode>,
);
