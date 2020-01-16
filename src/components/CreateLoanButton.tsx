import * as React from "react";
import { connect } from "react-redux";

import { begin } from "../store/actions/FormsActions";

import "./style.css";

interface IProps {
    begin: typeof begin;
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
        begin: () => dispatch(begin())
    }
}

export default connect(null, mapDispatchToProps)(CreateLoanButton);