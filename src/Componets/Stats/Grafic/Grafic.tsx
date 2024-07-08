
import styles from  './Grafic.module.css'
import { Day } from "./Day/Day";
import classNames from "classnames";
import { useStore } from "effector-react/compat";
import { $history, getNow, parseDate } from "../../../effector/history";
import { $stats, setActiveDay } from "../../../effector/stats";


interface IGrafic{
}




export function Grafic({}:IGrafic){
    const NOW  = getNow() ;
    const week = useStore($stats).week;
    const history = useStore($history);
    const stats = useStore($stats);
    const dayList = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    let list = dayList.map((day, index)=>{
        let i = index === 0? 1: 0; // переносим начало недли с воскресенья на понедельник;
        const date = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() - NOW.getDay() + index -7*(week - i));
        return ({
        date: date,
        dayName: day,
        minutes: parseDate(date, history.days).workTime,
        isActive: stats.active.date.getDay() === index,
        })
    });
    

    let buff = list.shift();
    if(buff != undefined){
        list.push( buff );

    }




   
    return (
        <div className={styles.container}>
            <div className={styles.week}>
                
                   
                {
                    list.map(day=>(
                        <Day minutes={day.minutes/60000} onClick={()=>{setActiveDay(parseDate(day.date,history.days) )}} isActive={day.isActive} key={Number(day.date)}>{day.dayName}</Day>
                    ))
                }
                    
                <span className={classNames(styles.layout, styles.first)} id={'1'}>25 мин</span>
                <span className={classNames(styles.layout, styles.second)} id={'2'}>50 мин</span>
                <span className={classNames(styles.layout, styles.third)} id={'3'}>1ч 15 мин</span>
                <span className={classNames(styles.layout, styles.fourth)} id={'4'}>1ч 40 мин</span>
            </div>
            <div className={styles.footer}>

            </div>
        </div>
    )
}