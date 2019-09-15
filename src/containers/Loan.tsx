import * as React from 'react'

interface Props { }
interface State {
    type: string;
    name: string;
    principal: number,
    interest: number,
    balance: number,
    minPmt: number,
    beginRepaymentDate: Date,
    dueOn: number,
    rate: number,
    dailyRate: number,
    lifetimePrincipalPaid: number,
    lifetimeInterestPaid: number
}

}

export default class Loan extends React.Component<Props, State> {
    constructor(props) {
        super(props)

        this.createCurrent = this.createCurrent.bind(this);
        this.createFuture = this.createFuture.bind(this);

        this.state = props.type === 'current' ? this.createCurrent(props) : this.createFuture(props)
    }
    ;

    calculateBeginRepaymentDate = (graduationDate) => {
        void (0)
    }

    render() {
        return (
            <div>
                <span>${this.state.name}</span>
            </div>
        )
    };
};