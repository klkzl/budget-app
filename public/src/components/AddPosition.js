import React from 'react';
import PropTypes from 'prop-types';

import { AddButton } from '../styles/Buttons';
import { AddContainer } from '../styles/Containers';
import { Input, Select } from '../styles/Inputs';

const AddPosition = (props) => (
    <AddContainer>
        <form
            autoComplete="off"
            onSubmit={props.handleAddPosition}
        >
            <Select name="positionSign">
                <option value="inc" defaultChecked>+</option>
                <option value="exp">-</option>
            </Select>
            <Input
                type="text"
                name="positionName"
                placeholder="Add description"
                required
            />
            <Input
                max="100000"
                min="0"
                name="positionValue"
                placeholder="Value"
                step="0.01"
                type="number"
                required
            />
            <AddButton>Add Position</AddButton>
        </form>
    </AddContainer>
);

AddPosition.propTypes = {
    handleAddPosition: PropTypes.func.isRequired
}

export default AddPosition;