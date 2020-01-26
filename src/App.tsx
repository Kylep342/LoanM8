import * as React from "react";
import * as ReactDOM from "react-dom";
import { Store } from "redux";
import { Provider } from "react-redux";

import configureStore from "./store/Store";
import { IApplicationState } from "./store/Store";
import Header from "./components/Header";
import LoanTypeChoiceModal from "./components/LoanTypeChoiceModal";
import CurrentLoanFormContainer from "./components/CurrentLoanForm";
import FutureLoanFormContainer from "./components/FutureLoanForm";
import CreateLoanButton from "./components/CreateLoanButton";


class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Header />
                <CreateLoanButton />
                <LoanTypeChoiceModal />
                <CurrentLoanFormContainer />
                <FutureLoanFormContainer />
            </div>
        )
    }
}

interface IProps {
    store: Store<IApplicationState>;
}

const Root: React.SFC<IProps> = props => {
    return (
        <Provider store={props.store}>
            <App />
        </Provider>
    );
}

const store = configureStore();
ReactDOM.render(<Root store={store} />, document.getElementById("main"))