import { createEvent, createStore } from "effector";

export interface ITask{
    name: string;
    tomatos: number;
    completeTomatos: number;
    key: number;
}

interface ITaskList{
    list: ITask[];
    newTask: string;
}


export const addTask = createEvent();
export const setNewTask = createEvent<string>();
export const changeTomatos = createEvent<{id: number, change: number}>();
export const deleteTask = createEvent<number>();
export const editTask = createEvent<{id: number, newName: string}>();
export const completeTomato = createEvent<number>();

export const $TaskList = createStore<ITaskList>({list: [], newTask: ''})
    .on(setNewTask, (store, newTask)=> ({
        ...store,
        newTask: newTask,
    })).on(addTask, (store)=>({
        ...store,
        newTask: '',
        list: store.list.concat([{ // initial to new Task
            name: store.newTask,
            tomatos: 1,
            completeTomatos: 0,
            key: Math.floor(Math.random() * 10000 + 1)
        }])
        
    })).on(changeTomatos, (store, {id, change} )=> ({
        ...store,
        list: store.list.map(task=>({
            ...task,
            tomatos: task.key === id? task.tomatos + change: task.tomatos,
        }))
    })).on(deleteTask, (store, id) => ({
        ...store,
        list: store.list.filter(task=>task.key != id),
    })).on(editTask, (store, {id, newName}) => ({
        ...store,
        list: store.list.map(task=>({
            ...task,
            name: task.key === id? newName: task.name,
        }))
    })).on(completeTomato, (store, id)=>{
                
                return(
                    {
                    ...store,
                    list: store.list.filter(task=>{
                        let condition = task.key === id && task.tomatos <= 1;
                        return !condition;
                    }).map(task=>({
                        ...task,
                        completeTomatos: task.key === id? task.completeTomatos +1: task.completeTomatos,
                        tomatos: task.key === id? task.tomatos -1: task.tomatos,
                    
                    }))
                
                

                
                
                }
            )
        }
    )
    