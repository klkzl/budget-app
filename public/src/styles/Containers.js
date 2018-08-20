import styled from 'styled-components';

const MainContainer = styled.div`
    color: ${props => props.theme.darkBlue};
    font-family: 'Source Sans Pro', sans-serif;
    text-align: center;
`;

const HeaderContainer = styled.div`
    background-color: #fcf9f8;
    padding-bottom: 15px;
`;

const HeaderListContainer = styled.div`
    background-color: ${props => props.primary ? '#3d848a' : '#e65e68' };
    letter-spacing: 1px;
    margin: 0 auto;
    width: ${props => props.theme.basicSize * 12}px;
`;

const HeaderListStyle = styled.div`
    color: white;
    display: flex;
    justify-content: space-between;
    margin-top: ${props => props.theme.basicSize * 0.5}px;
    padding: 10px 45px 10px 30px;
    text-transform: uppercase;
`;

const AddContainer = styled.div`
    background-color: ${props => props.theme.backgroundLight};
    border-bottom: 1px solid ${props => props.theme.backgroundDark};
    border-top: 1px solid ${props => props.theme.backgroundDark};
    padding: 10px;   
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;

const BodyBackground = styled.div`
    background-color: white;
`;

const BodyContainer = Container.extend`
    margin: 0 auto;
    width: ${props => props.theme.basicSize * 21}px;
`;

const ListTitleContainer = Container.extend`
    border-bottom: 1px solid ${props => props.theme.backgroundDark};
    height: ${props => props.theme.basicSize * 1.5}px;
    margin-top: 10px;
    position: relative;
    width: ${props => props.theme.basicSize * 10}px;
`;

const PositionContainer = styled.div`
    border-bottom: 1px solid ${props => props.theme.backgroundDark};
    display: flex;
    font-size: 16px;
    height: 32px;
    justify-content: space-between;
    line-height: 10px;
    padding-right: ${props => props.theme.basicSize}px;
    position: relative;
    width: ${props => props.theme.basicSize * 20} px;
    &:hover {
        background-color: #fcf9f8;
    }
`;

const DetailsContainer = styled.div`
    font-size: 12px;
    margin: 10px 5px;
`;

export { MainContainer, AddContainer, BodyBackground, BodyContainer, DetailsContainer, HeaderContainer, HeaderListContainer, HeaderListStyle, ListTitleContainer, PositionContainer };
