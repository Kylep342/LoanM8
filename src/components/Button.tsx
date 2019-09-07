import * as React from 'react'


const Button = (props) => {
    // console.log(props.style)
    return (
        <button
            style={props.style}
            className={props.type === "primary" ? "btn btn-primary" : "btn btn-secondary"}
            onClick={props.action} >
        </button>
    )
}

export default Button; 