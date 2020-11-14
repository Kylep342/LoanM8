import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../store/Store";
import { futureCreate, futureBack, futureExit } from "../store/actions/Actions";
import { IFutureLoanState } from "../types/LoanStateTypes";
import { createFutureLoan } from "../creators/futureLoanCreator";

import "./style.css";

interface IProps {
    open: boolean;
    create: typeof futureCreate;
    back: typeof futureBack;
    exit: typeof futureExit;
}

class FutureLoanFormContainer extends React.Component<IProps, IFutureLoanState> {
    state = {
        name: undefined,
        principal: undefined,
        interestRate: undefined,
        firstDisbursementDate: undefined,
        secondDisbursementDate: undefined,
        subsidized: undefined,
        graduationDate: undefined,
        autopay: undefined
    }

    /* */
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
                                <span className="modal-title">Creating a Future Loan</span>
                                <span className="close" onClick={this.handleExitClick}>&times;</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor={"name"} className={"form-label"}>Loan Name: </label>
                                <input
                                    type={"text"}
                                    id={"futureLoanNameInput"}
                                    name={"name"}
                                    value={this.state.name || ""}
                                    placeholder={"Enter a name for the loan"}
                                    onChange={this.handleInputChange}
                                /> {/* Loan Name */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={"principal"} className={"form-label"}>Principal: </label>
                                <input
                                    type={"number"}
                                    id={"futureLoanPrincipalInput"}
                                    name={"principal"}
                                    value={this.state.principal || ""}
                                    step={"0.01"}
                                    placeholder={"Enter the principal"}
                                    onChange={this.handleInputChange}
                                /> {/* Principal */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={"interestRate"} className={"form-label"}>Interest Rate: </label>
                                <input
                                    type={"number"}
                                    id={"futureLoanRateInput"}
                                    name={"interestRate"}
                                    value={this.state.interestRate || ""}
                                    step={"0.01"}
                                    placeholder={"Enter the interest rate"}
                                    onChange={this.handleInputChange}
                                /> {/* Interest interestRate */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={"firstDisbursementDate"} className={"form-label"}>First Disbursement Date: </label>
                                <input
                                    type={"date"}
                                    id={"futureLoanFirstDisbursementDateInput"}
                                    name={"firstDisbursementDate"}
                                    value={this.state.firstDisbursementDate || ""}
                                    placeholder={"Enter the first disbursement date"}
                                    onChange={this.handleInputChange}
                                /> {/* First Disbursement Date */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={"secondDisbursementDate"} className={"form-label"}>Second Disbursement Date: </label>
                                <input
                                    type={"date"}
                                    id={"futureLoanSecondDisbursementDateInput"}
                                    name={"secondDisbursementDate"}
                                    value={this.state.secondDisbursementDate || ""}
                                    placeholder={"Enter the second disbursement date"}
                                    onChange={this.handleInputChange}
                                /> {/* Second Disbursement Date */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={"subsidized"} className={"form-label"}>Is this loan subsidized: </label>
                                <input
                                    type={"checkbox"}
                                    id={"futureLoanSubsidizedInput"}
                                    name={"subsidized"}
                                    checked={this.state.subsidized || false}
                                    onChange={this.handleInputChange}
                                /> {/* Subsidized */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={"graduationDate"} className={"form-label"}>Graduation Date: </label>
                                <input
                                    type={"date"}
                                    id={"futureLoanGraduationDateInput"}
                                    name={"graduationDate"}
                                    value={this.state.graduationDate || ""}
                                    placeholder={"Enter your graduation date"}
                                    onChange={this.handleInputChange}
                                /> {/* Graduation Date */}
                            </div>

                            <div className="form-group">
                                <label htmlFor={"autopay"} className={"form-label"}>Will you use autopay: </label>
                                <input
                                    type={"checkbox"}
                                    id={"futureLoanAutopayInput"}
                                    name={"autopay"}
                                    checked={this.state.autopay || false}
                                    onChange={this.handleInputChange}
                                /> {/* Autopay */}
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
        )
    }

    private clearFields = () => {
        this.setState({
            name: undefined,
            principal: undefined,
            interestRate: undefined,
            firstDisbursementDate: undefined,
            secondDisbursementDate: undefined,
            subsidized: undefined,
            graduationDate: undefined,
            autopay: undefined
        })
    }

    private handleCreateClick = () => {
        const newFutureLoan = createFutureLoan(this.state)
        this.props.create(newFutureLoan);
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
        open: store.app.futureLoanFormOpen
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        create: (newFutureLoan) => dispatch(futureCreate(newFutureLoan)),
        back: () => dispatch(futureBack()),
        exit: () => dispatch(futureExit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FutureLoanFormContainer);
