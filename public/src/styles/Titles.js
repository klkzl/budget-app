import styled from 'styled-components';

const AppTitle = styled.h1`
    border-bottom: 1px solid ${props => props.theme.backgroundDark};
    font-size: ${props => props.theme.fontSize * 2.4}px;
    color: ${props => props.theme.mediumBlue};
    margin: 0;
    padding: 10px 0;
    text-transform: uppercase;
`;

const ListTitle = styled.h3`
    font-size: ${props => props.theme.fontSize * 1.8}px;
    font-weight: 400;
    text-align: left;
    text-transform: uppercase;
    color: ${props => props.theme.darkBlue}
`;

export { AppTitle, ListTitle };

    // border-bottom: 1px solid ${props => props.theme.backgroundDark};
    // box-sizing: border-box;
    // display: block;