import React, { Component } from 'react';
import numeral from 'numeral';

import AddPosition from './AddPosition';
import BodyList from './BodyList';
import Header from './Header';

import theme from '../styles/Styles';
import { MainContainer, BodyContainer, DetailsContainer } from '../styles/Containers';
import { ThemeProvider } from '../../../node_modules/styled-components';

const URL = 'http://localhost:3000';

class BudgetApp extends Component {
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
        const { budgetIncome, budgetExpenses,  incomePositions, expensesPositions} = this.state;

        this.setState(() => ({
            transactionsNumber: incomePositions.length + expensesPositions.length,
            budgetValue: budgetIncome + budgetExpenses
        }));
    }

    fetchIncomes() {
        fetch(URL + '/incomes')
        .then(response => response.json())
        .then(json => {
            const budgetIncome = json.reduce((prevValue, currValue) => {
                return prevValue + currValue.positionValue;
            }, 0);
            this.setState(() => ({
                incomePositions: json,
                budgetIncome
            }));
            this.updateData();
        })
        .catch(err => console.log(err));
    }

    fetchExpenses() {
        fetch(URL + '/expenses')
        .then(response => response.json())
        .then(json => {
            const budgetExpenses = json.reduce((prevValue, currValue) => {
                return prevValue - currValue.positionValue;
            }, 0)
            this.setState(() => ({
                expensesPositions: json,
                budgetExpenses
            }));
            // for (let i = 0; i < json.length; i++) {
            //     this.setState((prevState) => ({
            //         budgetExpenses: prevState.budgetExpenses - json[i].positionValue
            //     }))
            // }
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

    handleDeleteSingle = (id) => {
        const deleteUrl = URL + '/position/' + id;
        fetch(deleteUrl, {
            method: 'DELETE',
        })
        .then(() => {
           this.fetchData();
        })
        .catch(err => console.log(err));
    }

    deleteIncome = () => {
        fetch(URL + '/income', {
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
        })
        .catch(err => console.log(err));
    }

    handleAddPosition = (e) => {
        e.preventDefault();
        const { target: { elements } } = e;
        // const elements = e.taget.elements;

        const position = {
            positionSign: elements.positionSign.value,
            positionName: elements.positionName.value,
            positionValue: Number(elements.positionValue.value),
            positionDisplay: ''
        }
        console.log(position);

        if (position.positionSign === 'inc') {
            position.positionDisplay = `+ ${numeral(position.positionValue).format('0,000.00')}`;

            this.setState(prevState => ({
                incomePositions: prevState.incomePositions.concat(position),
                budgetIncome: prevState.budgetIncome + position.positionValue,
                budgetValue: prevState.budgetValue + position.positionValue,
                transactionsNumber: prevState.transactionsNumber + 1
            }))
        } else {
            position.positionDisplay = `- ${numeral(position.positionValue).format('0,000.00')}`;

            this.setState(prevState => ({
                expensesPositions: prevState.expensesPositions.concat(position),
                budgetExpenses: prevState.budgetExpenses - position.positionValue,
                budgetValue: prevState.budgetValue - position.positionValue,
                transactionsNumber: prevState.transactionsNumber + 1
            }))
        }

        this.addPosition(position);
    }

    handleDeleteIncomePositions = () => {
        this.setState((prevState) => ({
            budgetValue: prevState.budgetExpenses,
            budgetIncome: 0,
            incomePositions: [],
            transactionsNumber: prevState.expensesPositions.length
        }));

        this.deleteIncome();
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

export default BudgetApp;