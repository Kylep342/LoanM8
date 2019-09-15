import * as React from 'react'
import * as ReactDOM from 'react-dom'

import Button from '../components/Button'
import CurrentLoanFormContainer from './CurrentLoanForm'
import FutureLoanFormContainer from './FutureLoanForm'

import './style.css'

class LoanTypeChoiceModal extends React.Component {
    renderCurrentLoanForm = (event) => {
        event.preventDefault();
        ReactDOM.render(<CurrentLoanFormContainer />, document.getElementById('form-div'))
    }

    renderFutureLoanForm = (event) => {
        event.preventDefault();
        ReactDOM.render(<FutureLoanFormContainer />, document.getElementById('form-div'))
    }

    render() {
        return (
            <div className="modal">
                <div id='borrowingLoanInputModal' className='modal-content'>
                    <span className='section-label'>Have you begun repaying this loan?</span>
                    {/* <span className='close' onclick='closeModal()'>&times;</span> */}
                    <div className='float-left'>
                        <Button action={this.renderCurrentLoanForm} type={'seconday'} title={'Yes'} style={buttonStyle} /> {/* Yes */}
                    </div>
                    <div>
                        <Button action={this.renderFutureLoanForm} type={'seconday'} title={'No'} style={buttonStyle} /> {/* Yes */}
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