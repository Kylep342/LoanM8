import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Button from '../components/Button'
import Input from '../components/Input'
import LoanTypeChoiceModal from './LoanTypeChoiceModal'

interface Props { }

interface State {
    name: string;
    balance: number;
    rate: number;
    minPmt: number;
    lastPaidOn: Date;
}

class CurrentLoanFormContainer extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            balance: 0,
            rate: 0,
            minPmt: 0,
            lastPaidOn: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    /* */
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(prevState => (
            { ...prevState, [name]: value }
        ))
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log(this.state)
    }

    handleClearForm(event) {
        event.preventDefault();
        this.setState({
            name: '',
            balance: 0,
            rate: 0,
            minPmt: 0,
            lastPaidOn: undefined
        })
    }

    handleBack(event) {
        event.preventDefault();
        ReactDOM.render(<LoanTypeChoiceModal />, document.getElementById('form-div'));
    }

    render() {
        return (
            <form className="container-fluid" onSubmit={this.handleFormSubmit}>

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

                <Button
                    action={this.handleFormSubmit}
                    type={'primary'}
                    title={'Create'}
                    style={buttonStyle}
                /> {/* Create */}

                <Button
                    action={this.handleClearForm}
                    type={'secondary'}
                    title={'Clear'}
                    style={buttonStyle}
                /> {/* Clear */}

                <Button
                    action={this.handleBack}
                    type={'secondary'}
                    title={'Back'}
                    style={buttonStyle}
                /> {/* Back */}
            </form>
        );
    }
}

const buttonStyle = {
    margin: '10px 10px 10px 10px'
}

export default CurrentLoanFormContainer;