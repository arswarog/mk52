import * as React from 'react';
import { Cmd } from '../elektronika/core/commands';

interface IParams {
    cmd: Cmd;
}

export const Code = ({cmd}: IParams) => {
    return <span>{cmd}</span>;
};