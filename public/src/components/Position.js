import React from 'react';

import { PositionStyle } from '../styles/Styles';

const Position = ({ position, handleDeleteSingle }) => (
    <PositionStyle>
        <p>{position.positionName}</p>
        <p>{position.positionDisplay}</p>
        <button onClick={() => {
            handleDeleteSingle(position._id)}}
        >
            del
        </button>
    </PositionStyle>
);

export default Position;