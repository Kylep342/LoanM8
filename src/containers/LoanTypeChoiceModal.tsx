import * as React from 'react'

import './style.css'

interface IProps {
    open: boolean;
    onCreateCurrentLoanClick: () => void;
    onCreateFutureLoanClick: () => void;
}

class LoanTypeChoiceModal extends React.Component<IProps> {
    public render() {
        return (
            <div className={this.props.open ? "modal-wrapper modal-visible" : "modal-wrapper"}>
                <div className="modal-container">
                    <div id='borrowingLoanInputModal' className='modal-content'>
                        <div className="modal-title-container">
                            <span className='section-label'>Is this a loan you currently have, or are you looking to borrow?</span>
                            {/* <span className='close' onclick='closeModal()'>&times;</span> */}
                        </div>
                        <div className='modal-buttons-container'>
                            <button
                                onClick={this.handleCreateCurrentLoanClick}
                                className={'button-primary'}>
                                Current
                            </button>
                            <button
                                onClick={this.handleCreateFutureLoanClick}
                                className={'button-primary'}>
                                Future
                            </button>
                        </div>
                    </div>
                </div >
            </div >
        )
    }

    private handleCreateCurrentLoanClick = () => {
        this.props.onCreateCurrentLoanClick();
    }

    private handleCreateFutureLoanClick = () => {
        this.props.onCreateFutureLoanClick();
    }
}

export default LoanTypeChoiceModal;