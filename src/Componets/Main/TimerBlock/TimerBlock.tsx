
import styles from  './TimerBlock.module.css'
import { Clock } from "./Clock/Clock";
import { Button } from "../../Button/Button";
import { useStore } from 'effector-react/compat';
import { $TaskList, addTask, deleteTask, setNewTask } from '../../../effector/taskList';
import { $storeTimer, changeIsModeWork, changeIsPause, endCycle, startCycle } from '../../../effector/timer';
import classNames from 'classnames';
import { addStop, addTomatos, getNow } from '../../../effector/history';



export function TimerBlock(){
    const INDEX = 0; // возможно потом добавить выбор не верхней задачи
    const timer = useStore($storeTimer)

    const taskList = useStore($TaskList).list;
    let isEmpty = taskList.length === 0;
    let {completeTomatos= 0, name = 'Новая задача', key = -1} =isEmpty? {}: taskList[INDEX];
    function handleStart(){
        if(isEmpty){
            setNewTask('Новая задача');
            addTask();
    
        }
        startCycle();
    }
    function handleEnd(){
        endCycle();
        addStop(getNow());
    }
    function handlePause(){
        changeIsPause(true);
    }
    function handleContinue(){
        changeIsPause(false);
    }
    function handleSkipRest(){
        changeIsModeWork(!timer.isModeWork);
        endCycle();
    }
    function handleComplete(){
        deleteTask(key);
        addTomatos(getNow());
        endCycle();

    }
    
    return (
        <div className={styles.container}>
            <></>
            <div className={classNames( styles.header, {[styles.work]: timer.isModeWork, [styles.rest]: !timer.isModeWork, [styles.stop]: !timer.isInProcess})}>
                <p className={styles.taskHead}>{name}</p>
                <p className={styles.counter}>Помидор {completeTomatos + 1}</p>
            </div>
            <div className={styles.main}>

            <Clock taskId= {key}/>
            <p className={styles.task}>
                <span className={styles.taskNumber} > Задача {INDEX + 1} - </span> <span className={styles.taskName}>{name}</span>
            </p>
            <div className={styles.control}>
                {(completeTomatos < 1 && !timer.isInProcess)  && ( <>
                <Button onClick={handleStart} type='green'>Старт</Button>
                <Button type={undefined} onClick={()=>{}}>Стоп</Button>
                </>
                )}
                {( completeTomatos >= 1 && !timer.isInProcess)  && ( <>
                <Button onClick={handleStart} type='green'>Старт</Button>
                <Button type={'red'} onClick={()=>deleteTask(key)}>Стоп</Button>
                </>
                )}


                {( !timer.isPause && timer.isInProcess && timer.isModeWork)  && ( <>
                <Button onClick={handlePause} type='green'>Пауза</Button>
                <Button type={'red'} onClick={handleEnd}>Стоп</Button>
                </>
                )}
                {( timer.isPause && timer.isInProcess && timer.isModeWork)  && ( <>
                <Button onClick={handleContinue} type='green'>Продолжить</Button>
                <Button type={'red'} onClick={handleComplete}>Сделано</Button>
                </>
                )}



                {( !timer.isPause && timer.isInProcess && !timer.isModeWork)  && ( <>
                <Button onClick={handlePause} type='green'>Пауза</Button>
                <Button type={'red'} onClick={handleSkipRest}>Пропустить</Button>
                </>
                )}
                {( timer.isPause && timer.isInProcess && !timer.isModeWork)  && ( <>
                <Button onClick={handleContinue} type='green'>Продолжить</Button>
                <Button type={'red'} onClick={handleSkipRest}>Пропустить</Button>
                </>
                )}
                
            </div>
            </div>
        </div>
    )
}