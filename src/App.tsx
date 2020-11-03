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
import BudgetFormContainer from "./components/BudgetForm";
import BudgetsPanel from "./components/BudgetsPanel";
import LoansPanel from "./components/LoansPanel";


const App: React.FunctionComponent = () => {
    return (
        <div className="App">
            <Header />
            <LoanTypeChoiceModal />
            <CurrentLoanFormContainer />
            <FutureLoanFormContainer />
            <BudgetFormContainer />
            <LoansPanel />
            <BudgetsPanel />
        </div>
    )
}

interface IProps {
    store: Store<IApplicationState>;
}

const Root: React.FunctionComponent<IProps> = props => {
    return (
        <Provider store={props.store}>
            <App />
        </Provider>
    );
}

const store = configureStore();
ReactDOM.render(<Root store={store} />, document.getElementById("main"))
