import * as React from "react";
import { connect } from "react-redux";

import { Loan } from "../Loan";
import { deleteLoan } from "../store/actions/Actions";

import "./style.css";

interface IProps {
    key: string;
    loan: Loan;
    delete: typeof deleteLoan;
}

class LoanCard extends React.Component<IProps> {
    public render() {
        return (
            <div key={this.props.key} className={"loanCard"}>
                <div className={"loanInfo"}>
                    <span className={"loanCardName"}>{this.props.loan.name}</span>
                    <br></br>
                    <span>${this.props.loan.balance.toFixed(2)} at {this.props.loan.interestRate}%</span>
                </div>
                <div className="deleteButtonWrapper">
                    <button className={"deleteLoanButton"} onClick={this.handleDelete}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        )
    }

    private handleDelete = () => {
        this.props.delete(this.props.loan.id)
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        delete: (loanKey) => dispatch(deleteLoan(loanKey)),
    }
}

export default connect(null, mapDispatchToProps)(LoanCard);