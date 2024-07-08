
import styles from  './TomatoCounter.module.css'
import { LogoSvg } from "../../../SVG/LogoSvg";
import { TomatoSvg } from "../../../SVG/TomatoSvg";
import { declOfNum } from "../Stats";


interface TomatoCounter{
    count: number;
}
export function TomatoCounter({count}:TomatoCounter){
    const isNoTomato = count == 0;
    const counterText = count + ' ' +  declOfNum(count, ['помидор', 'помидора', 'помидоров']);

    return (
        <div className={styles.container} >
            {!isNoTomato && (<><div className={styles.holder}>
                <LogoSvg/>
                <span className={styles.counter}>x {count}</span> 
            </div>
            <div className={styles.footer}>
                {counterText}
            </div></>)}
            {isNoTomato && <TomatoSvg/>}
        </div>
    )
}