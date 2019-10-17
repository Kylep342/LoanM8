import * as React from 'react'


import './style.css'

interface IProps {
    open: boolean;
    onCreateClick: () => void;
    onClearClick: () => void;
    onBackClick: () => void;
}

interface IState {
    name: string;
    balance: number;
    rate: number;
    minPmt: number;
    lastPaidOn: Date;
}

class CurrentLoanFormContainer extends React.Component<IProps, IState> {
    state = {
        name: '',
        balance: 0,
        rate: 0,
        minPmt: 0,
        lastPaidOn: undefined
    }

    /* */
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(prevState => (
            { ...prevState, [name]: value }
        ))
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
    }

    handleClearForm = (event) => {
        event.preventDefault();
        this.setState({
            name: '',
            balance: 0,
            rate: 0,
            minPmt: 0,
            lastPaidOn: undefined
        })
    }

    handleBack = (event) => {
        event.preventDefault();
        // ReactDOM.render(<LoanTypeChoiceModal />, document.getElementById('form-div'));
    }

    public render() {
        return (
            <div className={this.props.open ? "modal-wrapper modal-visible" : "modal-wrapper"}>
                <div className="modal-container">
                    <form className="modal-content" onSubmit={this.handleFormSubmit}>
                        <div className="modal-content-container">
                            <div className="form-group">
                                <label htmlFor={'name'} className={'form-label'}>Loan Name: </label>
                                <input
                                    type={'text'}
                                    id={'currentLoanNameInput'}
                                    name={'name'}
                                    value={this.state.name}
                                    placeholder={'Enter a name for the loan'}
                                    onChange={this.handleInputChange}
                                /> {/* Loan Name */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={'balance'} className={'form-label'}>Balance: </label>
                                <input
                                    type={'number'}
                                    id={'currentLoanBalanceInput'}
                                    name={'balance'}
                                    value={this.state.balance}
                                    placeholder={'Enter the balance'}
                                    onChange={this.handleInputChange}
                                /> {/* Balance */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={'rate'} className={'form-label'}>Interest Rate: </label>
                                <input
                                    type={'number'}
                                    id={'currentLoanRateInput'}
                                    name={'rate'}
                                    value={this.state.rate}
                                    placeholder={'Enter the interest rate'}
                                    onChange={this.handleInputChange}
                                /> {/* Interest Rate */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={'minPmt'} className={'form-label'}>Minimum Payment: </label>
                                <input
                                    type={'number'}
                                    id={'currentLoanMinPmtInput'}
                                    name={'minPmt'}
                                    value={this.state.minPmt}
                                    placeholder={'Enter the minimum payment'}
                                    onChange={this.handleInputChange}
                                /> {/* Minimum Payment */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={'lastPaidOn'} className={'form-label'}>Last Paid On: </label>
                                <input
                                    type={'date'}
                                    id={'currentLoanLastPaidOn'}
                                    name={'lastPaidOn'}
                                    value={this.state.lastPaidOn}
                                    placeholder={undefined}
                                    onChange={this.handleInputChange}
                                /> {/* Last Paid On */}
                            </div>
                        </div>

                        <div className="modal-buttons-container">
                            <button
                                className={'button-primary'}
                                onClick={this.handleCreateClick}>
                                Create
                            </button>
                            <button
                                className={'button-secondary'}
                                onClick={this.handleClearClick}>
                                Clear
                            </button>
                            <button
                                className={'button-secondary'}
                                onClick={this.handleBackClick}>
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    private handleCreateClick = () => {
        this.props.onCreateClick();
    }

    private handleClearClick = () => {
        this.props.onClearClick();
    }

    private handleBackClick = () => {
        this.props.onBackClick();
    }
}

export default CurrentLoanFormContainer;