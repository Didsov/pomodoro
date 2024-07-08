
import React, {useState} from "react";
import styles from  './StatsDropdown.module.css'
import { ArrowSvg } from "../../../SVG/ArrowSvg";
import { StatsDropdownItem } from "./StatsDropdownItem/StatsDropdownItem";
import classNames from "classnames";
import { useStore } from "effector-react";
import { $stats, setWeek } from "../../../effector/stats";
import { $history } from "../../../effector/history";


interface StatsDropdown{
    children?: React.ReactNode;
}
export function StatsDropdown(){
    const stats = useStore($stats);
    const history = useStore($history);
    const [isOpen, SetIsOpen] = useState(false);
    
    function handleCloseAndSet(week: 0 | 1 | 2){
        SetIsOpen(!isOpen);
        setWeek({week: week,lastDate: stats.active.date, days: history.days} );
    }
    function handleClose(){
        SetIsOpen(!isOpen);
    }

    const LIST = [
        <StatsDropdownItem onClose={handleCloseAndSet} key={0} week={0}> Эта неделя </StatsDropdownItem> ,
        <StatsDropdownItem onClose={handleCloseAndSet} key={1} week={1}> Прошедшая неделя </StatsDropdownItem> ,
        <StatsDropdownItem onClose={handleCloseAndSet} key={2} week={2}> 2 недели назад </StatsDropdownItem> ,
    ]

    return (
        <div className={styles.container}>
            <div className={styles.topList}>
                {LIST.filter((item=>{
                    return stats.week === item.props.week
                })).map(item=>(
                    item
                ))
                }    
             </div>
            <button className={classNames({[styles.arrow]: true, [styles.rotate]:isOpen })} onClick={handleClose}><ArrowSvg/></button>
            {isOpen &&<div className={styles.dropDown}>
            {/* <StatsDropdownItem onClose={handleClose}> Прошлая неделя </StatsDropdownItem>    
            <StatsDropdownItem onClose={handleClose}> 2 недели назад </StatsDropdownItem>     */}
            {LIST.filter((item=>{
                    return stats.week !== item.props.week
                })).map(item=>(
                    item
                ))
                }    
            </div>}
            
        </div>
    )
}