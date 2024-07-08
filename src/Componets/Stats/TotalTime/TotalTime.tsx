
import styles from  './TotalTime.module.css'


interface TotalTime{
    today?: string;
    time?: string;
    
}
export function TotalTime({today, time}:TotalTime){
    let isNotData = false;
    today = today? today: 'В этот день';
    time? time: isNotData = true;
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{today}</h3>
            
            {!isNotData && (<p className={styles.text}>Вы работали над задачами <br/> в течение  <span className={styles.time}>{time}</span></p>)}
            {isNotData && <p className={styles.text}> Нет данных </p>  }
            
        </div>
    )
}