import * as React from "react";

import { Loan } from "../Loan";

import "./style.css";

interface IProps {
    key: string;
    loan: Loan;
}

const LoanCard: React.SFC<IProps> = props => {
    return (
        <React.Fragment>
            <div key={props.key} className={"loanCard"}>
                <span className={"loanCardName"}>{props.loan.name}</span>
                <br></br>
                <span>${props.loan.balance.toFixed(2)} at {props.loan.interestRate}%</span>
            </div>
        </React.Fragment>
    )
}

export default LoanCard;