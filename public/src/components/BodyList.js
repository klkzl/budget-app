import React from 'react';

import Position from './Position';
import { DetailsInfo, BodyListTitleContainer } from '../styles/Styles';
import { RemoveButton } from '../styles/Buttons';
import { ListTitleContainer } from '../styles/Containers';
import { ListTitle } from '../styles/Titles';

const BodyList = ({ budgetPositions, handleDeleteBudgetPositions, title}) => (
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
            {budgetPositions.map((position, index) => (
                <Position 
                    key={index}
                    position={position}
                />
            ))}
        </div>
    </div>
    );

export default BodyList;