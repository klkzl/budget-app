import React from 'react';
import PropTypes from 'prop-types';

import { HeaderListStyle } from '../styles/Containers';

const HeaderList = ({ title, budgetPosition }) => (
    <HeaderListStyle>
        <div>{title}</div>
        <div>{budgetPosition}</div>
    </HeaderListStyle>
);

HeaderList.propTypes = {
    title: PropTypes.string.isRequired,
    budgetPosition: PropTypes.string.isRequired
}

export default HeaderList;