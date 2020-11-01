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

const LoansPanel: React.FunctionComponent<IProps> = props => {
    return (
        <div className={"cardsPanel"}>
            <div className={"cardsPanelTitle"}>
                <h2>Your Loans</h2>
            </div>
            <div className={"cardsPanelContent"}>
                {!props.loans.length ?
                    <p className={"cardsPanelNotifier"}>
                        You haven't added any loans. Click "Add a Loan" to get started.
                    </p> :
                    props.loans.map(loan => {
                        return <LoanCard key={loan.id} loan={loan}></LoanCard>
                    })
                }
            </div>
            <div className={"cardsPanelTitle"}>
                <CreateLoanButton />
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