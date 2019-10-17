import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LoanTypeChoiceModal from './containers/LoanTypeChoiceModal';
import CurrentLoanFormContainer from './containers/CurrentLoanForm';
import FutureLoanFormContainer from './containers/FutureLoanForm';


interface IState {
    loanTypeChoiceFormOpen: boolean;
    currentLoanFormOpen: boolean;
    futureLoanFormOpen: boolean;
}


class App extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            loanTypeChoiceFormOpen: false,
            currentLoanFormOpen: false,
            futureLoanFormOpen: false,
        }
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>Placeholder header</p>
                </header>
                <button onClick={this.handleCreateClick}>Add a Loan</button>
                <LoanTypeChoiceModal
                    open={this.state.loanTypeChoiceFormOpen}
                    onCreateCurrentLoanClick={this.handleChoiceFormChooseCurrentLoanClick}
                    onCreateFutureLoanClick={this.handleChoiceFormChooseFutureLoanClick}
                />
                <CurrentLoanFormContainer
                    open={this.state.currentLoanFormOpen}
                    onCreateClick={this.handleCurrentLoanFormCreateClick}
                    onClearClick={this.handleCurrentLoanFormClearClick}
                    onBackClick={this.handleCurrentLoanFormBackClick}
                />
                <FutureLoanFormContainer
                    open={this.state.futureLoanFormOpen}
                    onCreateClick={this.handleFutureLoanFormCreateClick}
                    onClearClick={this.handleFutureLoanFormClearClick}
                    onBackClick={this.handleFutureLoanFormBackClick}
                />
            </div>
        )
    }

    private handleCreateClick = () => {
        this.setState({ loanTypeChoiceFormOpen: true });
    }

    private handleChoiceFormChooseCurrentLoanClick = () => {
        this.setState({ loanTypeChoiceFormOpen: false, currentLoanFormOpen: true });
    }

    private handleChoiceFormChooseFutureLoanClick = () => {
        this.setState({ loanTypeChoiceFormOpen: false, futureLoanFormOpen: true });
    }

    private handleChoiceFormExit = () => {
        this.setState({ loanTypeChoiceFormOpen: false });
    }

    private handleCurrentLoanFormCreateClick = () => {
        this.setState({ currentLoanFormOpen: false });
    }

    private handleCurrentLoanFormClearClick = () => {
        void (0);
        // this.setState({loanTypeChoiceFormOpen: true });
    }

    private handleCurrentLoanFormBackClick = () => {
        this.setState({ currentLoanFormOpen: false, loanTypeChoiceFormOpen: true });
    }

    private handleFutureLoanFormCreateClick = () => {
        this.setState({ futureLoanFormOpen: false });
    }

    private handleFutureLoanFormClearClick = () => {
        void (0);
        // this.setState({loanTypeChoiceFormOpen: true });
    }

    private handleFutureLoanFormBackClick = () => {
        this.setState({ futureLoanFormOpen: false, loanTypeChoiceFormOpen: true });
    }
}

ReactDOM.render(<App />, document.getElementById('main'))