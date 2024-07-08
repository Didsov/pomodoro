
import React, { useEffect, useRef, useState } from "react";
import styles from  './Task.module.css'
import { TaskDropdown } from "./TaskDropdown/TaskDropdown";
import classNames from "classnames";
import { $TaskList, deleteTask, editTask } from "../../../../../effector/taskList";
import { useStore } from "effector-react/effector-react.umd";


interface ITask{
    
    id: number;
}
export function Task({id}:ITask){
    const [isEdit, setIsEdit] = useState(false);
    const {name, tomatos} = useStore($TaskList).list.filter(task=>task.key === id)[0];

    const ref = useRef<HTMLInputElement>(null);
    
    useEffect(()=>{
        ref.current?.focus();
    }, [isEdit])


    function handleSubmit(e:React.FormEvent<HTMLSpanElement>){
        setIsEdit(false);
        const text = e.currentTarget.innerText
        if(text.length === 0 ){
            deleteTask(id);
        }
        editTask({id: id, newName:text});

    }
   
    function editHandler(){
        setIsEdit(true)
        

    }
   
    return (
        <li className={styles.container}>
            <span className={styles.counter}>{tomatos}</span>
            <div className={styles.nameContainer}>  
                <span className={classNames(styles.taskName, {[styles.editable]: isEdit})} 
                    onBlur={handleSubmit} 
                    
                    contentEditable={isEdit} 
                    role='textbox' 
                    children={name}
                    suppressContentEditableWarning={true}
                    ref = {ref}
                    autoFocus={true}
                />      
            </div>
            <TaskDropdown id={id} edit= {editHandler}/>
            
            
        </li>
        
    )
}