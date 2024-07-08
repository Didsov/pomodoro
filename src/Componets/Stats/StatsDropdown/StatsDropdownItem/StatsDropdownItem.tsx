
import React from "react";
import styles from  './StatsDropdownItem.module.css'

type Tweek = 0 | 1 | 2
interface StatsDropdownItem{
    children?: React.ReactNode;
    onClose: (week: Tweek)=>void;
    week: Tweek,
}



export function StatsDropdownItem({children, onClose, week}:StatsDropdownItem){



    function handleClick( ){
        onClose(week);
    }
    return (
        <button className={styles.btn} onClick={handleClick}>
            {children}
        </button>
    )
}