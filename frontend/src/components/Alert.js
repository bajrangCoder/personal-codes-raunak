import React from 'react';

function Alert(props){
    return(
        <>
        {props.alert && <div className={`${props.alert.classNme}`
        } role="alert">
            <p class="font-bold">{props.alert.title}</p>
            <p>{props.alert.msg}</p>
        </div>}
        </>
    )
}

export default Alert;