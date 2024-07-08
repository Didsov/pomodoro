
import React from "react";
import { Wrapper } from "../Wrapper/Wrapper";
import styles from  './Header.module.css'


interface Header{
    children?: React.ReactNode;
}
export function Header({children}:Header){
    return (
        <div className={styles.wrap}>
        <Wrapper>
            <div className={styles.header}>
                {children}
            </div>
        </Wrapper>
        </div>
    )
}