
import React from "react";
import styles from  './Navigation.module.css'


interface Navigation{
    children?: React.ReactNode;
}
export function Navigation({children}:Navigation){
    return (
        <div className={styles.nav}>
            {children}
        </div>
    )
}