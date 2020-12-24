import * as React from "react";

import "./style.css";

const Header: React.FunctionComponent = () => {
    return (
        <header className="header">
            <div className="header-content align-left">
                <h1 className="header-title">LoanM8</h1>
            </div>
            <div className="header-content align-right">
                <a className="header-link" href="https://www.github.com/kylep342/LoanM8" target="_blank">
                    <i className="fab fa-github fa-lg white" aria-hidden="true"></i>
                </a>
            </div>
        </header>
    )
}

export default Header;
