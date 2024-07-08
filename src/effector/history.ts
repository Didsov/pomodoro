import { createEvent, createStore } from "effector";

export interface IDay{
    date: Date,
    pauseTime: number,
    workTime: number,
    tomatos: number,
    stop: number,
}

export interface IHistory{
    days: IDay[];
}


const INITHISTORY: IHistory ={
    days: [],
}
const SEC = 1000;


const updateDays = (days: IDay[], date: Date, pauseTime: number, workTime: number, tomatos: number, stop: number) :IDay[]=>{
    let targetDay = days.filter((day)=>Number(day.date) === Number(date))[0];
    
    if(!targetDay){
        targetDay = {date, pauseTime, workTime, tomatos, stop};
    }else{
        targetDay = {
            ...targetDay,
            pauseTime: targetDay.pauseTime + pauseTime,
            workTime: targetDay.workTime + workTime,
            tomatos: targetDay.tomatos + tomatos,
            stop: targetDay.stop + stop,
        }
    }
    let outDay = days.filter((day) => Number(day.date) !== Number(date)).concat(targetDay);
    return outDay;
}

export const addPauseTime= createEvent<Date>();
export const addWorkTime= createEvent<Date>();
export const addTomatos= createEvent<Date>();
export const addStop = createEvent<Date>();

export function getNow(offset:number = 0):Date{
    const now = new Date();
    const [year, month, day] = [now.getFullYear(), now.getMonth(), now.getDate()];
    
    return new Date(year, month, day + offset);
}



export function parseDate(date:Date, days:IDay[] ) :IDay{
    
    const day = days.filter((day)=>{
        return Number(day.date) === Number(date);
    })[0];
    if(day){
        return day
    }else{
        return ({
            date: date,
            pauseTime: 0,
            workTime: 0,
            tomatos: 0,
            stop: 0
        })
    }
    
   
}


export const $history = createStore<IHistory>(INITHISTORY)
    .on(addPauseTime, (store, date) =>({
        days: updateDays(store.days, date, SEC, 0, 0, 0),
    }))
    .on(addWorkTime, (store, date) =>({
        days: updateDays(store.days, date, 0, SEC, 0, 0),
    }))
    .on(addTomatos, (store, date) =>({
        days: updateDays(store.days, date, 0, 0, 1, 0),
    }))
    .on(addStop, (store, date) =>({
        days: updateDays(store.days, date, 0, 0, 0, 1),
    }))