
import React from "react";
import styles from './Layout.module.css'


interface ILayout{
    children?: React.ReactNode;
}
export function Layout({children}:ILayout){
    return (
        <div className={styles.layout}>
            {children}
        </div>
    )
}