import React from 'react';
import PropTypes from 'prop-types';

import Position from './Position';
import { RemoveAllButton } from '../styles/Buttons';
import { DetailsContainer, ListTitleContainer } from '../styles/Containers';
import { ListTitle } from '../styles/Titles';

const BodyList = ({ budgetPositions, handleDeleteSingle, handleDeleteBudgetPositions, title}) => (
    <div>
    <ListTitleContainer>
        <ListTitle>{title}</ListTitle>
        {budgetPositions.length > 0 && <RemoveAllButton onClick={handleDeleteBudgetPositions}>Remove All</RemoveAllButton>}
    </ListTitleContainer>
        {budgetPositions.length > 0 && <DetailsContainer>
            Number of {title} Positions: {budgetPositions.length}
        </DetailsContainer>}
        {budgetPositions.length < 1 && <DetailsContainer>No position to display</DetailsContainer>}
        <div>
            {budgetPositions.map(position => (
                <Position
                    key={position._id}
                    position={position}
                    handleDeleteSingle={handleDeleteSingle}
                />
            ))}
        </div>
    </div>
    );

    BodyList.propTypes = {
        budgetPositions: PropTypes.arrayOf(
            PropTypes.shape({
                positionSign: PropTypes.string.isRequired,
                positionName: PropTypes.string.isRequired,
                positionValue: PropTypes.number.isRequired,
                positionDisplay: PropTypes.string.isRequired
            }).isRequired
        ).isRequired,
        handleDeleteSingle: PropTypes.func.isRequired,
        handleDeleteBudgetPositions: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    }

export default BodyList;