import styled, { css } from "styled-components";

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

const DetailsInfo = styled.div`
    font-size: 12px;
    margin: 10px 5px;
`;

export default theme;
export { DetailsInfo };