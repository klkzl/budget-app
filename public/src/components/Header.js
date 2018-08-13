import React, { Component } from 'react' ;

import HeaderList from './HeaderList';
import months from '../constant/months';

import { AppTitle } from '../styles/Titles';
import { HeaderContainer } from '../styles/Containers';
import { HeaderSubtitle, HeaderValue } from '../styles/Headers';

class Header extends Component {
    constructor(props) {
        super(props);
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();

        this.state = {
            currentMonth: months[month],
            currentYear: year
        }
    }

    render () {
        const { title, budgetValue, subtitle, budgetIncome, budgetExpenses } = this.props;
        const { currentMonth, currentYear } = this.state;

        return (
            <HeaderContainer>
                <AppTitle>{title}</AppTitle>
                <HeaderSubtitle>
                    {subtitle} {currentMonth} {currentYear}:
                </HeaderSubtitle>
                <HeaderValue>{budgetValue}</HeaderValue>

                <HeaderList
                    primary
                    title="Income" 
                    budgetPosition={budgetIncome}
                />
                <HeaderList 
                    title="Expenses" 
                    budgetPosition={budgetExpenses}
                />
            </HeaderContainer>
        );
    }
} 

Header.defaultProps = {
    title: 'Budget App',
    subtitle: 'Available budget in '
};

export default Header;