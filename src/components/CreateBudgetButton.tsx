import * as React from "react";
import { connect } from "react-redux";

import { beginBudgetCreate } from "../store/actions/Actions";

import "./style.css";


interface IProps {
    begin: typeof beginBudgetCreate;
}

class CreatePaymentButton extends React.Component<IProps> {
    public render() {
        return (
            <button className={"add-button align-right"} onClick={this.handleCreateClick}>+</button>
        )
    }

    private handleCreateClick = () => {
        this.props.begin();
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        begin: () => dispatch(beginBudgetCreate())
    }
}

export default connect(null, mapDispatchToProps)(CreatePaymentButton);
