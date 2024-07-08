
import React, { FormEvent } from "react";
import styles from  './TaskList.module.css'
import { Button } from "../../../Button/Button";
import { Task } from "./Task/Task";
import { useStore } from "effector-react/effector-react.mjs";
import { $TaskList, addTask, setNewTask } from "../../../../effector/taskList";



export function TaskList(){
    const list = useStore($TaskList);

    function handleSubmit(e:FormEvent){
        e.preventDefault()
        console.log('List: ', list.list);
        if(list.newTask.length >0)  addTask();
        
    }
    function handleChange(e:React.FormEvent<HTMLInputElement>){
        setNewTask(e.currentTarget.value);

    }

    
    return (
        <div className={styles.container}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
                <input type="text" placeholder="Название задачи" value={list.newTask} onChange={handleChange}/>
                <Button type="green" onClick={()=>{}}>Добавить</Button>
            </form>
            <ul className={styles.list}>
                {
                   list.list.map( (task) =>(
                    <Task  id={task.key} key={task.key}/>
                   ) )
                }
                
                
            </ul>
        </div>
    )
}