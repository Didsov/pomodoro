
import  { useEffect } from "react";
import styles from  './Stats.module.css'
import { Wrapper } from "../Wrapper/Wrapper";
import { StatsDropdown } from "./StatsDropdown/StatsDropdown";
import { PlateStats } from "./PlateStats/PlateStats";
import { TotalTime } from "./TotalTime/TotalTime";
import { TomatoCounter } from "./TomatoCounter/TomatoCounter";
import { Grafic } from "./Grafic/Grafic";
import { useStore } from "effector-react";
import { $history, parseDate } from "../../effector/history";
import { $stats, setActiveDay } from "../../effector/stats";

const week = [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
export function declOfNum(n:number, text_forms:string[]) {  
    n = Math.abs(n) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

function timeToString(time:number) :string{
    time /= 60000;
    let hours = Math.floor(time / 60);
    let min = Math.floor(time % 60);
    let stingH = hours + ' ' +declOfNum(hours, ['час', 'часа', 'часов']);
    let stingM = min + ' ' +declOfNum(min, ['минута', 'минуты', 'минут']);
     
    stingH = hours === 0? '':stingH + ' ';
    
    return stingH  + stingM
}

export function Stats(){
    const NOW = new Date();
    const history = useStore($history);
    const stats = useStore($stats);
    let {date, pauseTime, workTime, tomatos, stop} = stats.active;
    if(workTime + pauseTime === 0) pauseTime = 1;
    useEffect(()=>{
        let selectDay = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()  -7*stats.week);
        setActiveDay( parseDate(selectDay,history.days));
    },[])
    return (
        <Wrapper>
            <div className={styles.stats}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Ваша активность</h2>
                    <StatsDropdown/>
                </div>
                <div className={styles.grafs}>
                    <div className={styles.sideBar}>
                        
                        <TotalTime time={timeToString(workTime)} today = {week[date.getDay()] } />
                        <div className={styles.tomatoCounter}>
                            <TomatoCounter count={tomatos}/>
                        </div>
                        
                    </div>
                    <div className={styles.graficContainer}>
                        <Grafic/>
                    </div>

                </div>
                <div className={styles.Plates}>
                    <PlateStats type='focus' data={workTime/(workTime + pauseTime)}/>
                    <PlateStats type ='pause' data={Math.floor(stats.active.pauseTime/60000)}/>
                    <PlateStats type='stop' data={stop}/>
                </div>
            </div>
        </Wrapper>
    )
}