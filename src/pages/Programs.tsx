import * as React from 'react';
import { Link } from 'react-router-dom';

export const Programs = () => {
    return <div>
        МОИ ПРОГРАММЫ<br/>
        <Link to={`/program/1`}>Игра 1</Link><br/>
        <Link to={`/program/2`}>Игра 2</Link><br/>
        <Link to={`/program/3`}>Игра 3</Link><br/>
        <Link to={`/program/4`}>Игра 4</Link><br/>
        <Link to={`/program/5`}>Игра 5</Link><br/>
        <Link to={`/program/6`}>Игра 6</Link><br/>
        <Link to={`/program/7`}>Игра 7</Link>
    </div>;
};
