import React from 'react'
import ReactDOM from 'react-dom'
import classes from "./Modal.module.css"

function Backdrop(props){
    return <div className={classes.backdrop} onClick={props.closeCart}/>
} 

function ModalOverlay(props){
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
    
}

const portalElement = document.getElementById('overlay')

export default function Modal(props) {
  return (
    <>{
        ReactDOM.createPortal(<Backdrop closeCart={props.closeCart}/>, portalElement)
    }
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  )
}
