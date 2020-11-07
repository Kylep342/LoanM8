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
            <button className={"add-button align-right"} onClick={this.handleCreateClick}>+</button>
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
