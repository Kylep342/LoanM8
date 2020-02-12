import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../store/Store";

import "./style.css";


interface IProps {
    monthlyPaymentBudgets: number[];
}

const PaymentsPanel: React.SFC<IProps> = props => {
    return (
        <React.Fragment>
            TODO
        </React.Fragment>
    )
}

const mapStateToProps = (store: IApplicationState) => {
    return {
        monthlyPaymentBudgets: store.app.monthlyPaymentBudgets
    }
}

export default connect(mapStateToProps, null)(PaymentsPanel);