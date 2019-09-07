import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Button from '../components/Button'
import CheckBox from '../components/CheckBox'
import Input from '../components/Input'
import LoanTypeChoiceModal from './LoanTypeChoiceModal'

interface Props { }

interface State {
    name: string;
    principal: number;
    rate: number;
    firstDisbursementDate: Date;
    secondDisbursementDate: Date;
    subsidized: boolean;
    graduationDate: Date;
    autopay: boolean;
}


class FutureLoanFormContainer extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            principal: 0,
            rate: 0,
            firstDisbursementDate: undefined,
            secondDisbursementDate: undefined,
            subsidized: false,
            graduationDate: undefined,
            autopay: false
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
            principal: 0,
            rate: 0,
            firstDisbursementDate: undefined,
            secondDisbursementDate: undefined,
            subsidized: false,
            graduationDate: undefined,
            autopay: false
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
                    title={'Principal'}
                    name={'principal'}
                    value={this.state.principal}
                    placeholder={'Enter the loan amount'}
                    handleChange={this.handleInputChange}
                /> {/* Principal */}

                <Input
                    inputType={'number'}
                    title={'Interest Rate'}
                    name={'rate'}
                    value={this.state.rate}
                    placeholder={null}
                    handleChange={this.handleInputChange}
                /> {/* Interest Rate */}

                <Input
                    inputType={'date'}
                    title={'First Disbursement Date'}
                    name={'firstDisbursementDate'}
                    value={this.state.firstDisbursementDate}
                    placeholder={null}
                    handleChange={this.handleInputChange}
                /> {/* First Disbursement Date */}

                <Input
                    inputType={'date'}
                    title={'Second Disbursement Date'}
                    name={'secondDisbursementDate'}
                    value={this.state.secondDisbursementDate}
                    placeholder={'Enter the second disbursement date'}
                    handleChange={this.handleInputChange}
                /> {/* Second Disbursement Date */}

                <CheckBox
                    title={'Subsidized'}
                    name={'subsidized'}
                    checked={this.state.subsidized}
                    placeholder={false}
                    handleChange={this.handleInputChange}
                /> {/* Subsidized */}

                <Input
                    inputType={'date'}
                    title={'Graduation Date'}
                    name={'graduationDate'}
                    value={this.state.graduationDate}
                    placeholder={null}
                    handleChange={this.handleInputChange}
                /> {/* Graduation Date */}

                <CheckBox
                    title={'Autopay'}
                    name={'autopay'}
                    checked={this.state.autopay}
                    placeholder={false}
                    handleChange={this.handleInputChange}
                /> {/* Autopay */}

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
        )
    }
}

const buttonStyle = {
    margin: '10px 10px 10px 10px'
}

export default FutureLoanFormContainer