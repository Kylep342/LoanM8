import * as React from "react"
import { connect } from "react-redux";

import { IApplicationState } from "../store/Store";
import { chooseCurrent, chooseFuture, choiceExit } from "../store/actions/FormsActions";

import "./style.css"

interface IProps {
    open: boolean;
    current: typeof chooseCurrent;
    future: typeof chooseFuture;
    exit: typeof choiceExit;
}

class LoanTypeChoiceModal extends React.Component<IProps> {
    public render() {
        return (
            <div className={this.props.open ? "modal-wrapper modal-visible" : "modal-wrapper"}>
                <div className="modal-container">
                    <div id="borrowingLoanInputModal" className="modal-content">
                        <div className="modal-title-container">
                            <div className="form-group">
                                <span className="close" onClick={this.handleExitClick}>&times;</span>
                            </div>
                            <span className="section-label">Is this a loan you currently have, or are you looking to borrow?</span>
                        </div>
                        <div className="modal-buttons-container">
                            <button
                                onClick={this.handleCreateCurrentLoanClick}
                                className={"button-primary"}>
                                Current
                            </button>
                            <button
                                onClick={this.handleCreateFutureLoanClick}
                                className={"button-primary"}>
                                Future
                            </button>
                        </div>
                    </div>
                </div >
            </div >
        )
    }

    private handleCreateCurrentLoanClick = () => {
        this.props.current();
    }

    private handleCreateFutureLoanClick = () => {
        this.props.future();
    }

    private handleExitClick = () => {
        this.props.exit();
    }
}

const mapStateToProps = (store: IApplicationState) => {
    return {
        open: store.forms.loanTypeChoiceFormOpen
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        current: () => dispatch(chooseCurrent()),
        future: () => dispatch(chooseFuture()),
        exit: () => dispatch(choiceExit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanTypeChoiceModal);