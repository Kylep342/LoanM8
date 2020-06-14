import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../store/Store";
import { currentCreate, currentBack, currentExit } from "../store/actions/Actions";
import { ICurrentLoanState } from "../types/LoanTypes";
import { createCurrentLoan } from "../creators/currentLoanCreator";

import "./style.css";

interface IProps {
    open: boolean;
    create: typeof currentCreate;
    back: typeof currentBack;
    exit: typeof currentExit;
}

class CurrentLoanFormContainer extends React.Component<IProps, ICurrentLoanState> {
    /* */
    state = {
        name: undefined,
        balance: undefined,
        interestRate: undefined,
        minPmt: undefined,
        lastPaidOn: undefined
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState(prevState => (
            { ...prevState, [name]: value }
        ))
    }

    public render() {
        return (
            <div className={this.props.open ? "modal-wrapper modal-visible" : "modal-wrapper"}>
                <div className="modal-container">
                    <div className="modal-content-container">
                        <div className="modal-content">
                            <div className="modal-header">
                                <span className="modal-title">Creating a Current Loan</span>
                                <span className="close" onClick={this.handleExitClick}>&times;</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor={"name"} className={"form-label"}>Loan Name: </label>
                                <input
                                    type={"text"}
                                    id={"currentLoanNameInput"}
                                    name={"name"}
                                    value={this.state.name || ""}
                                    placeholder={"Enter a name for the loan"}
                                    onChange={this.handleInputChange}
                                /> {/* Loan Name */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={"balance"} className={"form-label"}>Balance: </label>
                                <input
                                    type={"number"}
                                    id={"currentLoanBalanceInput"}
                                    name={"balance"}
                                    value={this.state.balance || ""}
                                    step={"0.01"}
                                    placeholder={"Enter the balance"}
                                    onChange={this.handleInputChange}
                                /> {/* Balance */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={"interestRate"} className={"form-label"}>Interest Rate: </label>
                                <input
                                    type={"number"}
                                    id={"currentLoanRateInput"}
                                    name={"interestRate"}
                                    value={this.state.interestRate || ""}
                                    step={"0.01"}
                                    placeholder={"Enter the interest rate"}
                                    onChange={this.handleInputChange}
                                /> {/* Interest Rate */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={"minPmt"} className={"form-label"}>Minimum Payment: </label>
                                <input
                                    type={"number"}
                                    id={"currentLoanMinPmtInput"}
                                    name={"minPmt"}
                                    value={this.state.minPmt || ""}
                                    step={"0.01"}
                                    placeholder={"Enter the minimum payment"}
                                    onChange={this.handleInputChange}
                                /> {/* Minimum Payment */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={"lastPaidOn"} className={"form-label"}>Last Paid On: </label>
                                <input
                                    type={"date"}
                                    id={"currentLoanLastPaidOn"}
                                    name={"lastPaidOn"}
                                    value={this.state.lastPaidOn || ""}
                                    placeholder={undefined}
                                    onChange={this.handleInputChange}
                                /> {/* Last Paid On */}
                            </div>
                        </div>
                    </div>
                    <div className="modal-buttons-container">
                        <button
                            className={"button-primary"}
                            onClick={this.handleCreateClick}>
                            Create
                        </button>
                        <button
                            className={"button-secondary"}
                            onClick={this.clearFields}>
                            Clear
                        </button>
                        <button
                            className={"button-secondary"}
                            onClick={this.handleBackClick}>
                            Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private clearFields = () => {
        this.setState({
            name: undefined,
            balance: undefined,
            interestRate: undefined,
            minPmt: undefined,
            lastPaidOn: undefined,
        })
    }

    private handleCreateClick = () => {
        const newCurrentLoan = createCurrentLoan(this.state);
        this.props.create(newCurrentLoan);
        this.clearFields();
    }

    private handleBackClick = () => {
        this.clearFields();
        this.props.back();
    }

    private handleExitClick = () => {
        this.clearFields();
        this.props.exit();
    }
}

const mapStateToProps = (store: IApplicationState) => {
    return {
        open: store.app.currentLoanFormOpen
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        create: (newCurrentLoan) => dispatch(currentCreate(newCurrentLoan)),
        back: () => dispatch(currentBack()),
        exit: () => dispatch(currentExit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLoanFormContainer);
