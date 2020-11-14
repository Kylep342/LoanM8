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
            <div key={this.props.key} className={"itemCard"}>
                <div className={"cardInfo"}>
                    <span className={"cardName"}>{this.props.loan.name}</span>
                    <br></br>
                    <span>${this.props.loan.balance.toFixed(2)} at {this.props.loan.interestRate}%</span>
                </div>
                {/* <div>
                    <button className={"editCardButton"} onClick={this.handleEdit}>
                        <i className={"fa fa-pen"} aria-hidden={"true"}></i>
                    </button>
                </div> */}
                <div className={"deleteButtonWrapper"}>
                    <button className={"deleteCardButton"} onClick={this.handleDelete}>
                        <i className={"fa fa-trash"} aria-hidden={"true"}></i>
                    </button>
                </div>
            </div>
        )
    }

    // TODO
    private handleEdit = () => {
        console.log(this.props.loan)
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
