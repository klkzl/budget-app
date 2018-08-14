import React from 'react';

import { RemoveSingleButton } from '../styles/Buttons';
import { PositionContainer } from '../styles/Containers';

const Position = ({ position, handleDeleteSingle }) => (
    <PositionContainer>
        <p>{position.positionName}</p>
        <p>{position.positionDisplay}</p>
        <RemoveSingleButton onClick={() => {
            handleDeleteSingle(position._id)}}
        >
            x
        </RemoveSingleButton>
    </PositionContainer>
);

export default Position;