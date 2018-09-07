import React from 'react';
import PropTypes from 'prop-types';

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

Position.propTypes = {
    position: PropTypes.arrayOf(
        PropTypes.shape({
            positionSign: PropTypes.string.isRequired,
            positionName: PropTypes.string.isRequired,
            positionValue: PropTypes.number.isRequired,
            positionDisplay: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    handleDeleteSingle: PropTypes.func.isRequired
}

export default Position;