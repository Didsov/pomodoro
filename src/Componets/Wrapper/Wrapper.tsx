
import React from "react";
import styles from  './Wrapper.module.css'


interface Wrapper{
    children?: React.ReactNode;
}
export function Wrapper({children}:Wrapper){
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}