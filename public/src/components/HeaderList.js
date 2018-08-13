import React from 'react';

import { HeaderListStyle } from '../styles/Styles';

const HeaderList = ({ title, budgetPosition }) => (
    <HeaderListStyle>
        <div>{title}</div>
        <div>{budgetPosition}</div>
    </HeaderListStyle>
);

export default HeaderList;