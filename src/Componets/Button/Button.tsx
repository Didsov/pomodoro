
import React from "react";
import styles from  './Button.module.css'
import classNames from "classnames";


interface IButton{
    type?: 'red' | 'green' | 'disable',
    onClick : ()=>void,
    style?: string;
    children?: React.ReactNode;
}
export function Button({onClick, type, children }:IButton){
    const color = type?type:'disable';
    
    return (
        <button className={classNames(styles.btn, styles[color])} onClick={onClick}>
            {children}
        </button>
    )
}