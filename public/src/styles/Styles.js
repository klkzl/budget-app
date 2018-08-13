import styled from "styled-components";

// ThemeProvider settings 
const theme = {

    // colors 
    backgroundLight: '#f6f1ee',
    backgroundDark: '#e0dbd9',

    mediumRed: '#e65e68',
    mediumBlue: '#3d848a',
    darkBlue: '#68656e',

    // sizes
    fontSize: 10,
    basicSize: 30,

}; 


// HeaderList.js
const HeaderListStyle = styled.div`
    background-color: ${props => props.primary ? props.theme.red : props.theme.mediumBlue};
    color: white;
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    margin: 15px auto 0;
    padding: 10px 45px 10px 30px;
    text-transform: uppercase;
    width: 360px;
`;

// Position.js
const PositionStyle = styled.div`
    border-bottom: 1px solid ${props => props.theme.backgroundDark};
    display: flex;
    font-size: 16px;
    line-height: 10px;
    height: 32px;
    justify-content: space-between;
    // padding: 2px;
    // width: 300px;
    width: ${props => props.theme.basicSize * 20} px;
`;

const DetailsInfo = styled.div`
    font-size: 12px;
    margin-top: 5px;
`;

export default theme;
export { DetailsInfo, HeaderListStyle, PositionStyle };