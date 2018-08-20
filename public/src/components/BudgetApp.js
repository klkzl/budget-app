import React, { Component } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import AddPosition from './AddPosition';
import BodyList from './BodyList';
import Header from './Header';

import theme from '../styles/Styles';
import { MainContainer, BodyContainer, DetailsContainer } from '../styles/Containers';
import { ThemeProvider } from '../../../node_modules/styled-components';

const URL = 'http://localhost:3000';

class BudgetApp extends Component {
    // static propTypes = {
    //     budgetIncome: PropTypes.number.isRequired,
    //     budgetExpenses: PropTypes.number.isRequired,
    //     budgetValue: PropTypes.number.isRequired,
    //     transactionsNumber: PropTypes.number.isRequired,
    // }

    state = {        
        budgetIncome: 0,
        budgetExpenses: 0,
        budgetValue: 0,
        expensesPositions: [], 
        incomePositions: [],
        transactionsNumber: 0,
        downloaded: [],
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.fetchIncomes();
        this.fetchExpenses();
    }

    updateData() {
        this.setState(() => ({
            transactionsNumber: this.state.incomePositions.length + this.state.expensesPositions.length,
            budgetValue: this.state.budgetIncome + this.state.budgetExpenses
        }));
    }

    fetchIncomes() {
        fetch(URL + '/incomes')
        .then(response => {
            // console.log('response', response);
            return response.json();
        })
        .then(json => {
            // console.log(json);
            this.setState(() => ({
                incomePositions: json,
                budgetIncome: 0
            }));
            for (let i = 0; i < json.length; i++) {
                this.setState((prevState) => ({
                    budgetIncome: prevState.budgetIncome + json[i].positionValue
                }))
            }
            this.updateData();
        })
        .catch(err => console.log(err));
    }

    fetchExpenses() {
        fetch(URL + '/expenses')
        .then(response => {
            // console.log('response', response);
            return response.json();
        })
        .then(json => {
            // console.log(json);
            this.setState(() => ({
                expensesPositions: json,
                budgetExpenses: 0
            }));
            for (let i = 0; i < json.length; i++) {
                this.setState((prevState) => ({
                    budgetExpenses: prevState.budgetExpenses - json[i].positionValue
                }))
            }
            this.updateData();
        })
        .catch(err => console.log(err));
    }

    addPosition(dataToSafe) {
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(dataToSafe),
            headers: {
                'Content-Type': 'application/json',
            }            
        })
        .then(() => this.fetchData())
        .catch(err => console.log(err));
    }

    handleDataToDatabase = (e) => {
        e.preventDefault();
        const dataToSafe = this.state.incomePositions[0];
        this.addPosition(dataToSafe);
    }

    handleDeleteSingle = (id) => {
        const DeleteURL = URL + '/' + id;
        fetch(DeleteURL, {
            method: 'DELETE',         
        })
        .then(() => {
           this.fetchData();
        })
        .catch(err => console.log(err));
    }

    deleteExpenses = () => {
        fetch(URL + '/expenses', {
            method: 'DELETE',
        })
        .then(() => {
            this.fetchData();
            console.log('cos sie stalo')
        })
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

        if (position.positionSign === 'inc') {
            position.positionDisplay = `+ ${numeral(position.positionValue).format('0,000.00')}`;

            this.setState(prevState => ({
                incomePositions: prevState.incomePositions.concat(position),
                budgetIncome: prevState.budgetIncome + position.positionValue,
                budgetValue: prevState.budgetValue + position.positionValue
            }))
        } else {
            position.positionDisplay = `- ${numeral(position.positionValue).format('0,000.00')}`;

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

        this.addPosition(position); 
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

        this.deleteExpenses();
    }

    render() {
        const { budgetExpenses, budgetIncome, budgetValue, incomePositions, expensesPositions, transactionsNumber} = this.state;
        const displayBudget = numeral(budgetValue).format('+/-0,000.00');
        const displayIncome = numeral(budgetIncome).format('+/-0,000.00');
        const displayExpenses = numeral(budgetExpenses).format('+/-0,000.00');

        return (
            <ThemeProvider theme={theme}>
                <MainContainer>
                    <Header 
                        budgetExpenses={displayExpenses}
                        budgetIncome={displayIncome}
                        budgetValue={displayBudget}
                    />

                    <AddPosition
                        handleAddPosition={this.handleAddPosition}
                    />
                    <BodyContainer>
                        <BodyList
                            title="Income"
                            budgetPositions={incomePositions}
                            handleDeleteSingle={this.handleDeleteSingle}
                            handleDeleteBudgetPositions={this.handleDeleteIncomePositions}
                        />
                        
                        <BodyList
                            title="Expenses"
                            budgetPositions={expensesPositions}
                            handleDeleteSingle={this.handleDeleteSingle}
                            handleDeleteBudgetPositions={this.handleDeleteExpensesPositions}
                        />
                    </BodyContainer>

                    <DetailsContainer>
                        Number of Transactions: {transactionsNumber}
                    </DetailsContainer>
                </MainContainer>
            </ThemeProvider>
        );
    }
}

// ?
// BudgetApp.propTypes = {
//     budgetIncome: PropTypes.number
// }

export default BudgetApp;