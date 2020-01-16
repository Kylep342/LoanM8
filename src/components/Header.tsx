import * as React from "react";

import "./style.css";

const Header: React.SFC = () => {
    return (
        <header className="header">
            {/* <h1 className="header-title"><a href="/">LoanM8</a></h1> */}
            <h1 className="header-title">LoanM8</h1>
            <a href="https://www.github.com/kylep342/LoanM8" target="_blank">
                <i className="fab fa-github fa-lg white" aria-hidden="true"></i>
            </a>
        </header>
    )
}

export default Header;