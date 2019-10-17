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
    principal: number;
    rate: number;
    firstDisbursementDate: Date;
    secondDisbursementDate: Date;
    subsidized: boolean;
    graduationDate: Date;
    autopay: boolean;
}


class FutureLoanFormContainer extends React.Component<IProps, IState> {
    state = {
        name: '',
        principal: 0,
        rate: 0,
        firstDisbursementDate: undefined,
        secondDisbursementDate: undefined,
        subsidized: false,
        graduationDate: undefined,
        autopay: false
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
            principal: 0,
            rate: 0,
            firstDisbursementDate: undefined,
            secondDisbursementDate: undefined,
            subsidized: false,
            graduationDate: undefined,
            autopay: false
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
                    <form className="modal-content container-fluid" onSubmit={this.handleFormSubmit}>
                        <div className="modal-content-container">
                            <div className='form-group'>
                                <label htmlFor={'name'} className={'form-label'}>Loan Name: </label>
                                <input
                                    type={'text'}
                                    id={'futureLoanNameInput'}
                                    name={'name'}
                                    value={this.state.name}
                                    placeholder={'Enter a name for the loan'}
                                    onChange={this.handleInputChange}
                                /> {/* Loan Name */}
                            </div>

                            <div className='form-group'>
                                <label htmlFor={'principal'} className={'form-label'}>Principal: </label>
                                <input
                                    type={'number'}
                                    id={'futureLoanPrincipalInput'}
                                    name={'principal'}
                                    value={this.state.principal}
                                    placeholder={undefined}
                                    onChange={this.handleInputChange}
                                /> {/* Principal */}
                            </div>

                            <div className='form-group'>
                                <label htmlFor={'rate'} className={'form-label'}>Interest Rate: </label>
                                <input
                                    type={'number'}
                                    id={'futureLoanRateInput'}
                                    name={'rate'}
                                    value={this.state.rate}
                                    placeholder={undefined}
                                    onChange={this.handleInputChange}
                                /> {/* Interest Rate */}
                            </div>

                            <div className='form-group'>
                                <label htmlFor={'firstDisbursementDate'} className={'form-label'}>First Disbursement Date: </label>
                                <input
                                    type={'date'}
                                    id={'futureLoanFirstDisbursementDateInput'}
                                    name={'firstDisbursementDate'}
                                    value={this.state.firstDisbursementDate}
                                    placeholder={undefined}
                                    onChange={this.handleInputChange}
                                /> {/* First Disbursement Date */}
                            </div>

                            <div className='form-group'>
                                <label htmlFor={'secondDisbursementDate'} className={'form-label'}>Second Disbursement Date: </label>
                                <input
                                    type={'date'}
                                    id={'futureLoanSecondDisbursementDateInput'}
                                    name={'secondDisbursementDate'}
                                    value={this.state.secondDisbursementDate}
                                    placeholder={undefined}
                                    onChange={this.handleInputChange}
                                /> {/* Second Disbursement Date */}
                            </div>

                            <div className='form-group'>
                                <label htmlFor={'subsidized'} className={'form-label'}>Is this loan subsidized: </label>
                                <input
                                    type={'checkbox'}
                                    id={'futureLoanSubsidizedInput'}
                                    name={'subsidized'}
                                    checked={this.state.subsidized}
                                    onChange={this.handleInputChange}
                                /> {/* Subsidized */}
                            </div>

                            <div className='form-group'>
                                <label htmlFor={'graduationDate'} className={'form-label'}>Graduation Date: </label>
                                <input
                                    type={'date'}
                                    id={'futureLoanGraduationDateInput'}
                                    name={'graduationDate'}
                                    value={this.state.graduationDate}
                                    placeholder={undefined}
                                    onChange={this.handleInputChange}
                                /> {/* Graduation Date */}
                            </div>

                            <div className='form-group'>
                                <label htmlFor={'autopay'} className={'form-label'}>Will you use autopay: </label>
                                <input
                                    type={'checkbox'}
                                    id={'futureLoanAutopayInput'}
                                    name={'autopay'}
                                    checked={this.state.autopay}
                                    onChange={this.handleInputChange}
                                /> {/* Autopay */}
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
        )
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

export default FutureLoanFormContainer