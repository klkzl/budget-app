import styled from 'styled-components';

const Button = styled.button`
    background-color: white;
    border: 1px solid ${props => props.theme.mediumBlue};
    border-radius: ${props => props.theme.basicSize / 6}px;
    box-sizing: border-box;
    cursor: pointer;
    color: ${props => props.theme.mediumBlue};
    font-size: ${props => props.theme.fontSize * 1.4}px;
`;

const AddButton = Button.extend`
    height: 35px;
    width: ${props => props.theme.basicSize * 3.5}px;
`;

const RemoveButton = Button.extend`
    height: 25px;
    font-size:  ${props => props.theme.fontSize * 1.2}px;
    position: absolute;
    right: 0px;
    top: 17px;
    width: ${props => props.theme.basicSize * 2.5}px;
`;

export {AddButton, RemoveButton };