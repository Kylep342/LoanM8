import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Button from '../components/Button'
import CurrentLoanFormContainer from './CurrentLoanForm'
import FutureLoanFormContainer from './FutureLoanForm'

class LoanTypeChoiceModal extends React.Component {
    constructor(props) {
        super(props);

        this.renderCurrentLoanForm = this.renderCurrentLoanForm.bind(this)
        this.renderFutureLoanForm = this.renderFutureLoanForm.bind(this)
    }
    renderCurrentLoanForm(event) {
        event.preventDefault();
        ReactDOM.render(<CurrentLoanFormContainer />, document.getElementById('form-div'))
    }

    renderFutureLoanForm(event) {
        event.preventDefault();
        ReactDOM.render(<FutureLoanFormContainer />, document.getElementById('form-div'))
    }

    render() {
        return (
            <div id='borrowingLoanInputModal' className='modal'>
                <div className='modal-content'>
                    <span className='section-label'>Have you begun repaying this loan?</span>
                    {/* <span className='close' onclick='closeModal()'>&times;</span> */}
                    <div className='margins'>
                        <div className='float-left'>
                            <Button action={this.renderCurrentLoanForm} type={'seconday'} title={'Yes'} style={buttonStyle} /> {/* Yes */}
                        </div>
                        <div>
                            <Button action={this.renderFutureLoanForm} type={'seconday'} title={'No'} style={buttonStyle} /> {/* Yes */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const buttonStyle = {
    margin: '10px 10px 10px 10px'
}

export default LoanTypeChoiceModal;