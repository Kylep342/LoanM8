import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../store/Store";
import { monthlyPayment } from "../monthlyPayment";

import "./style.css";


interface IProps {
    monthlyPaymentBudgets: monthlyPayment[];
}

const PaymentsPanel: React.SFC<IProps> = props => {
    return (
        <div className={"monthlyPaymentBudgetsPanel"}>
            <div className={"mpbTitle"}>
                <h2>Your Monthly Payment Budgets</h2>
            </div>
            <div className={"mpbPanelContent"}>
                {
                    props.monthlyPaymentBudgets.map(budget => {
                        return <React.Fragment>TODO</React.Fragment>
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = (store: IApplicationState) => {
    return {
        monthlyPaymentBudgets: store.app.monthlyPaymentBudgets
    }
}

export default connect(mapStateToProps, null)(PaymentsPanel);