import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../store/Store";
import LoanCard from "./LoanCard";
import { Loan } from "../Loan";
import CreateLoanButton from "./CreateLoanButton";

import "./style.css";


interface IProps {
    loans: Loan[];
}

const LoansPanel: React.SFC<IProps> = props => {
    return (
        <div className={"loansPanel"}>
            <div className={"loansPanelTitle"}>
                <h2>Your Loans</h2>
                <CreateLoanButton />
            </div>
            <div className={"loansPanelContent"}>
                {!props.loans.length ?
                    <p className={"loansPanelNotifier"}>
                        You haven't added any loans. Click "Add a Loan" to get started.
                        </p> :
                    props.loans.map(loan => {
                        return <LoanCard key={loan.name} loan={loan}></LoanCard>
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = (store: IApplicationState) => {
    return {
        loans: store.app.loans
    }
}

export default connect(mapStateToProps, null)(LoansPanel);