import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const Programms = connect()(
    () => {
        return <div>
            МОИ ПРОГРАММЫ<br/>
            <Link to={`/programm/1`}>Игра 1</Link><br/>
            <Link to={`/programm/2`}>Игра 2</Link><br/>
            <Link to={`/programm/3`}>Игра 3</Link><br/>
            <Link to={`/programm/4`}>Игра 4</Link><br/>
            <Link to={`/programm/5`}>Игра 5</Link><br/>
            <Link to={`/programm/6`}>Игра 6</Link><br/>
            <Link to={`/programm/7`}>Игра 7</Link>
        </div>;
    },
);
