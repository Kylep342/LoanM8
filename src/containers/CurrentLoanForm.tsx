import * as React from 'react'

import Input from '../components/Input'

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
                        <Input
                            inputType={'text'}
                            title={'Loan Name'}
                            name={'name'}
                            value={this.state.name}
                            placeholder={'Enter a name for the loan'}
                            handleChange={this.handleInputChange}
                        /> {/* Loan Name */}

                        <Input
                            inputType={'number'}
                            title={'Balance'}
                            name={'balance'}
                            value={this.state.balance}
                            placeholder={'Enter the balance'}
                            handleChange={this.handleInputChange}
                        /> {/* Balance */}

                        <Input
                            inputType={'number'}
                            title={'Interest Rate'}
                            name={'rate'}
                            value={this.state.rate}
                            placeholder={'Enter the interest rate'}
                            handleChange={this.handleInputChange}
                        /> {/* Interest Rate */}

                        <Input
                            inputType={'number'}
                            title={'Minimum Payment'}
                            name={'minPmt'}
                            value={this.state.minPmt}
                            placeholder={'Enter the minimum payment'}
                            handleChange={this.handleInputChange}
                        /> {/* Minimum Payment */}

                        <Input
                            inputType={'date'}
                            title={'Last Paid On'}
                            name={'lastPaidOn'}
                            value={this.state.lastPaidOn}
                            placeholder={undefined}
                            handleChange={this.handleInputChange}
                        /> {/* Last Paid On */}

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