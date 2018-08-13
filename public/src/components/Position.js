import React from 'react';

import { PositionStyle } from '../styles/Styles';

const Position = ({ index, position }) => (
    <PositionStyle key={index}>
        <p>{position.positionName}</p>
        <p>{position.positionDisplay}</p>
    </PositionStyle>
);

export default Position;