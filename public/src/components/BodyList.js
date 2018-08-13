import React from 'react';

import Position from './Position';
import { DetailsInfo, BodyListTitleContainer } from '../styles/Styles';
import { RemoveButton } from '../styles/Buttons';
import { ListTitleContainer } from '../styles/Containers';
import { ListTitle } from '../styles/Titles';

const BodyList = ({ budgetPositions, handleDeleteSingle, handleDeleteBudgetPositions, title}) => (
    <div>
    <ListTitleContainer>
        <ListTitle>{title}</ListTitle>
        {budgetPositions.length > 0 && <RemoveButton onClick={handleDeleteBudgetPositions}>Remove All</RemoveButton>}
    </ListTitleContainer>
        {budgetPositions.length > 0 && <DetailsInfo>
            Number of {title} Positions: {budgetPositions.length}
        </DetailsInfo>}
        {budgetPositions.length < 1 && <DetailsInfo>No position to display</DetailsInfo>}
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

export default BodyList;