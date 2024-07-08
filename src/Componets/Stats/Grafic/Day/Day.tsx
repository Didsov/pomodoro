
import React from "react";
import styles from  './Day.module.css'
import classNames from "classnames";


interface IDay{
    minutes?: number;
    isActive?: boolean;
    children: React.ReactNode;
    onClick?: ()=>void;
}

const MAX = 125;
export function Day({minutes, isActive, children, onClick}:IDay){
    minutes = minutes?minutes:0;
    isActive = isActive?isActive:false;
    let isDisable = false;
    let height = minutes / MAX * 100; 
    let heighCSS = {
        'height' : height + '%',
    }

    if(height > 100 ){
        heighCSS = {
            'height' : '100%',
        }
    }
    if (height < 1){
        heighCSS = {
            'height' : '5px',
        }
        isDisable = true;
    }
    

    return (
        <div className={classNames(styles.day, {[styles.active]: isActive}, {[styles.disable]: isDisable})} style={heighCSS} onClick={onClick}>
            <div className={classNames(styles.dayName, {[styles.today]: isActive})}>{children}</div>
        </div>
    )
}