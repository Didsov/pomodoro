import { createEvent } from "effector/effector.mjs";
import {  IDay, getNow, parseDate } from "./history";
import { createStore } from "effector";

interface IStats  {
    active: IDay,
    week: 0 | 1 | 2

}

const INIT :IDay = {
    date: new Date(),
    workTime: 0,
    pauseTime: 0,
    tomatos: 0,
    stop: 0
}


export const setActiveDay= createEvent<IDay>();
export const setWeek= createEvent<{week: 0|1|2, lastDate: Date, days: IDay[]}>();

export const $stats = createStore<IStats>({active: INIT, week: 0})
    .on(setActiveDay, (store, day)=>({
        ...store,
        active: day,
    }))
    .on(setWeek, (store, {week, lastDate, days})=> ({
        ...store,
        week: week,
        active: parseDate(new Date(getNow().getFullYear(), getNow().getMonth(), getNow().getDate() + lastDate.getDay() -getNow().getDay() - 7*week),days),
    })  ) 
