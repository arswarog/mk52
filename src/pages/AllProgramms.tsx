import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './AllProgramms.scss';

export const AllProgramms = connect()(
    () => {
        const list: Array<{
            title: string;
            author: string;
            link: string;
        }> = [
            {
                title : 'Посадка на Луну',
                author: 'Ярослав Садовский',
                link  : 'http://www.lordbss.pp.ru/pmk38.html',
            },
        ];

        return <div className="page-all-programms">
            <div className="center">ВСЕ ПРОГРАММЫ</div>
            {list.map(
                (item, index) =>
                    <Link key={index} to={item.link}><b>{item.title}</b> - {item.author}</Link>,
            )}
        </div>;
    },
);
