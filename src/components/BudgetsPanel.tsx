import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../store/Store";
import BudgetCard from "./BudgetCard";
import { Budget } from "../Budget";

import "./style.css";
import CreateBudgetButton from "./CreateBudgetButton";


interface IProps {
    budgets: Budget[];
}

const PaymentsPanel: React.FunctionComponent<IProps> = props => {
    return (
        <div className={"cardsPanel"}>
            <div className={"cardsPanelTitle"}>
                <h2 className={"align-left"}>Your Budgets</h2>
                <CreateBudgetButton />
            </div>
            <div className={"cardsPanelContent"}>
                {!props.budgets.length ?
                    <p className={"cardsPanelNotifier"}>
                        You haven't added any monthly payment budgets. Click the "+" to get started.
                    </p> :
                    props.budgets.map(budget => {
                        return <BudgetCard key={budget.id} budget={budget}></BudgetCard>
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = (store: IApplicationState) => {
    return {
        budgets: store.app.budgets
    }
}

export default connect(mapStateToProps, null)(PaymentsPanel);