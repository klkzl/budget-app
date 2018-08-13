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

export { MainContainer, AddContainer, BodyBackground, BodyContainer, HeaderContainer, ListTitleContainer };
