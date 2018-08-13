import styled from 'styled-components';

const Select = styled.select`
    background-color: white;
    border: 1px solid ${props => props.theme.backgroundDark};
    border-radius: ${props => props.theme.basicSize / 6}px;
    color: ${props => props.theme.darkBlue};
    font-size: ${props => props.theme.fontSize * 1.4}px;
    height: 35px;
    margin-right: 10px;
    padding: ${props => props.theme.basicSize / 6}px;
    width: ${props => props.theme.basicSize * 2}px;
`;

const Input = styled.input`
    border: 1px solid ${props => props.theme.backgroundDark};
    border-radius: ${props => props.theme.basicSize / 6}px;
    box-sizing: border-box;
    color: ${props => props.theme.darkBlue};
    font-size: ${props => props.theme.fontSize * 1.4}px;
    height: 35px;
    margin-right: 10px;
    padding: ${props => props.theme.basicSize / 6}px;
    width: ${props => props.step ? '120px' : '240px'};
`;

export { Select, Input };