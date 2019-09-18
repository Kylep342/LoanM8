import * as React from 'react';
import * as ReactDOM from 'react-dom';

import LoanTypeChoiceModal from './containers/LoanTypeChoiceModal';
import Button from './components/Button'
// import 

ReactDOM.render(
    <Button action={() => { ReactDOM.render(<LoanTypeChoiceModal />, document.getElementById('form-div')) }} type={'primary'} title={'Create Loan'} style={null} />, document.getElementById('main')
)