
import React, { ReactElement } from "react";
import styles from  './TaskDropdownItem.module.css'
import classNames from "classnames";


interface TaskDropdownItem{
    children?: React.ReactNode;
    isDisabled?: boolean;
    onClick: ()=>void;
    icon: ReactElement;
}
export function TaskDropdownItem({children, isDisabled = false, icon, onClick}:TaskDropdownItem){

    return (
        <button onClick={onClick} disabled={isDisabled} className={classNames(styles.container, {[styles.disabled]: isDisabled})}>
            <span className={styles.icon}> {icon}</span>
            <span className={styles.name}>{children}</span>
        </button>
    )
}