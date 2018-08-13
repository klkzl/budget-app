import React, { Component } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import AddPosition from './AddPosition';
import BodyList from './BodyList';
import Header from './Header';

import { MainContainer, BodyContainer } from '../styles/Containers';
import theme, { BodyWrapper, DetailsInfo } from '../styles/Styles';
import { ThemeProvider } from '../../../node_modules/styled-components';

const URL = 'http://localhost:3000';

class BudgetApp extends Component {
    static propTypes = {
        budgetValue: PropTypes.number.isRequired,
    }

    state = {        
        budgetValue: 0,
        budgetIncome: 0,
        budgetExpenses: 0,
        expensesPositions: [], 
        incomePositions: [],
        transactionsNumber: 0,
        downloaded: [],
    }

    componentDidMount() {
        fetch(URL)
            .then(response => {
                console.log('response', response)
                return response.json();
            })
            .then(json => {
                console.log(json);
                this.setState(() => ({
                    downloaded: json
                }))
            })
            .catch(err => console.log(err));
    }

    handleDataToDatabase = (e) => {
        e.preventDefault();
        const dataToSafe = this.state.incomePositions[0];
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(dataToSafe),
            headers: {
                'Content-Type': 'application/json',
            }            
        })
        .then(response => response.json())
        .then(parsedData => console.log(parsedData))
        .catch(err => console.log(err));
    }

    handleAddPosition = (e) => {
        e.preventDefault();

        const position = {
            positionSign: e.target.elements.positionSign.value,
            positionName: e.target.elements.positionName.value,
            positionValue: Number(e.target.elements.positionValue.value),
            positionDisplay: ''
        }

        if (!position.positionName || !position.positionValue) {
            return 'Enter valid value';
        }

        if (position.positionSign === 'inc') {
            position.positionDisplay = `+ ${numeral(position.positionValue).format('0,000.00')}`
        } else {
            position.positionDisplay = `- ${numeral(position.positionValue).format('0,000.00')}`
        }

        if (position.positionSign === 'inc') {
            this.setState(prevState => ({
                incomePositions: prevState.incomePositions.concat(position),
                budgetIncome: prevState.budgetIncome + position.positionValue,
                budgetValue: prevState.budgetValue + position.positionValue
            }))
        } else {
            this.setState(prevState => ({
                expensesPositions: prevState.expensesPositions.concat(position),
                budgetExpenses: prevState.budgetExpenses - position.positionValue,
                budgetValue: prevState.budgetValue - position.positionValue
            }))
        }

        console.log(position);

        this.setState(prevState => ({
            transactionsNumber: prevState.transactionsNumber + 1
        }))

    }

    handleDeleteIncomePositions = () => {
        this.setState((prevState) => ({ 
            budgetValue: prevState.budgetExpenses, 
            budgetIncome: 0,
            incomePositions: [], 
            transactionsNumber: prevState.expensesPositions.length
        }));
    }

    handleDeleteExpensesPositions = () => {
        this.setState((prevState) => ({
            budgetValue: prevState.budgetIncome, 
            budgetExpenses: 0,
            expensesPositions: [], 
            transactionsNumber: prevState.incomePositions.length 
        }));
    }

    render() {
        
        return (
            <ThemeProvider theme={theme}>
                <MainContainer>
                    <Header 
                        budgetExpenses={this.state.budgetExpenses}
                        budgetIncome={this.state.budgetIncome}
                        budgetValue={this.state.budgetValue}
                    />

                    <AddPosition
                        handleAddPosition={this.handleAddPosition}
                    />
                    <BodyContainer>
                        <BodyList
                            title="Income"
                            budgetPositions={this.state.incomePositions}
                            handleDeleteBudgetPositions={this.handleDeleteIncomePositions}
                        />
                        
                        <BodyList
                            title="Expenses"
                            budgetPositions={this.state.expensesPositions}
                            handleDeleteBudgetPositions={this.handleDeleteExpensesPositions}
                        />
                    </BodyContainer>

                    <DetailsInfo>
                        Number of Transactions: {this.state.transactionsNumber}
                    </DetailsInfo>
                    <button onClick={this.handleDataToDatabase}>Save to Database</button>
                </MainContainer>
            </ThemeProvider>
        );
    }
}

// ?
BudgetApp.propTypes = {
    budgetIncome: PropTypes.number
}

export default BudgetApp;