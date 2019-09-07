import * as React from 'react'

export default class Loan extends React.Component {
    state = {
        name: '',
        principal: 0,
        interest: 0,
        balance: 0,
        minPmt: 0,
        beginRepaymentDate: null,
        dueOn: 0,
        rate: 0,
        dailyRate: 0,
        lifetimePrincipalPaid: 0,
        lifetimeInterestPaid: 0
    };

    calculateBeginRepaymentDate = (graduationDate) => {
        void(0)
    }

    create = (props) => {
        this.setState({
            name: props.name,
            principal: props.principal,
            interest: props.interest,
            balance: props.principal + props.interest,
            minPmt: props.minPmt,
            beginRepaymentDate: this.calculateBeginRepaymentDate(props.graduationDate),
            dueOn: props.graduationDate.getDate(),
            rate: props.rate,
            dailyRate: props.rate / 36525
        });
    };

    render () {
        return (
            <div>
                <span>${this.state.name}</span>
            </div>
        )
    };
};