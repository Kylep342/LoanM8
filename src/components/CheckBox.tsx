import * as React from 'react'


const CheckBox = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name} className="form-label">{props.title}
                <input
                    id={props.name}
                    name={props.name}
                    onChange={props.handleChange}
                    checked={props.checked}
                    type="checkbox" />
            </label>
        </div>
    );
}


export default CheckBox;