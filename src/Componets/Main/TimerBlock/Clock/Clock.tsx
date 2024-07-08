
import  {useEffect, useRef} from "react";
import styles from  './Clock.module.css'
import { AddSvg } from "../../../../SVG/AddSvg";
import { useStore } from "effector-react";
import { $storeTimer, changeIsModeWork, changeWorkTime, endCycle, setLongRest, tick } from "../../../../effector/timer";
import { $TaskList, completeTomato } from "../../../../effector/taskList";
import classNames from "classnames";
import {  addPauseTime, addTomatos, addWorkTime, getNow } from "../../../../effector/history";


interface Clock{
    taskId: number;
}

function secToMin(sec:number)  :string {
    let minute = Math.floor(sec / 60);
    let  second = sec % 60;
    let secNull = '';
    let minNull = '';
    if(second<10) secNull = '0';
    if(minute <10) minNull = '0'
    return minNull + minute + ':' + secNull + second;
}

export function Clock({taskId}:Clock){
    const timer = useStore($storeTimer);
    const taskList = useStore($TaskList);
    let task = taskList.list.filter((task=>{
        return task.key === taskId
    }))[0];
    let completeTomatos = task?.completeTomatos?task.completeTomatos: 0;
    let nextTomato = useRef(completeTomatos);
    const OFFSET = 60;
    let time = secToMin(timer.curSec);

   
    function handleTick(){
        if(timer.isInProcess){

            if(!timer.isPause){
                if(timer.isModeWork) {
                    addWorkTime(getNow());
                }
                tick();
            }else{
                addPauseTime(getNow());
                

            }
            

        }
    }
    
    function FNtimer(){
        if(!timer.isInProcess) return // если таймер выключен - не тикать
        if(timer.curSec <=0){ //секунды вышли заходим
            if(timer.isModeWork){ // если вышли рабочие секунды
                changeIsModeWork(!timer.isModeWork); //меняет тип на отдых
                nextTomato.current += 1; 
                completeTomato(taskId); // добавляем выполенный томат
                if(completeTomatos%4 === 0){ // если 4 томат
                    setLongRest() // ставим длинный отдых
                }
                addTomatos(getNow()); // Добавляем в историю выполненный томат

            }else{
                changeIsModeWork(!timer.isModeWork); // меняем тип на работу
                endCycle(); // заканчиваем цикл - выключаем таймер, устанавливаем секунды в первичную зону


            }
             return
        }
        handleTick(); //тик
    }
        
    

    useEffect(()=>{
        const interval = setInterval(FNtimer, 1000)
        return(()=> clearInterval(interval))
    }, [timer])
    function handlerAdd(){
        if(timer.workTime <= 3540) changeWorkTime(OFFSET);
        
        
    }
    return (
        <div className={styles.container}>
            <p className={classNames(styles.clock, {[styles.work]: timer.isModeWork, [styles.rest]: !timer.isModeWork, [styles.pause]: timer.isPause})}>{time}</p>
            <button className={styles.add} onClick={handlerAdd}>
                <AddSvg/>
            </button>
        </div>

    )
}