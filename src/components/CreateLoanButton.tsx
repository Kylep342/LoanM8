import * as React from "react";
import { connect } from "react-redux";

import { beginLoanCreate } from "../store/actions/Actions";

import "./style.css";

interface IProps {
    begin: typeof beginLoanCreate;
}

class CreateLoanButton extends React.Component<IProps> {
    public render() {
        return (
            <button className={"button-primary"} onClick={this.handleCreateClick}>Add a Loan</button>
        )
    }

    private handleCreateClick = () => {
        this.props.begin();
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        begin: () => dispatch(beginLoanCreate())
    }
}

export default connect(null, mapDispatchToProps)(CreateLoanButton);
