
import styles from  './TextBlock.module.css'
import { TaskList } from "./TaskList/TaskList";



export function TextBlock(){
    return (
        <div className= {styles.container}>
            <h2 className={styles.title}>Ура! Теперь можно начать работать:</h2>
            <ul className={styles.ins}>
                <li>Выберите категорию и напишите название текущей задачи</li>
                <li>Запустите таймер («помидор») </li>
                <li>Работайте пока «помидор» не прозвонит</li>
                <li>Сделайте короткий перерыв (3-5 минут)</li>
                <li>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
            </ul>
            <TaskList/>
        </div>
    )
}