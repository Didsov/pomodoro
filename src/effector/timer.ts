import { createEvent, createStore } from "effector";

export const changeWorkTime = createEvent<number>()
export const changeIsPause = createEvent<boolean>()
export const changeIsModeWork = createEvent<boolean>()
export const initCurSec = createEvent()
export const setLongRest = createEvent()
export const tick = createEvent()
export const startCycle = createEvent();
export const endCycle = createEvent();


export interface ITimer{
    curSec: number,
    workTime: number,
    restTime: number,
    longRestTime:  number,
    isPause: boolean,
    isInProcess: boolean,
    isModeWork: boolean,

}

const initTimer:ITimer = {
    curSec: 1500,
    workTime: 1500,
    restTime: 300,
    longRestTime: 1800,
    isPause: true,
    isInProcess: false,
    isModeWork: true,

}

export const $storeTimer = createStore<ITimer>(initTimer)
    .on(changeWorkTime, (store, offset)=>({
        ...store,
        workTime: store.workTime + offset,
        curSec: store.curSec + offset,
       }))
    .on(changeIsPause, (store, status)=>({
        ...store,
        isPause: status,
    }))
    .on(changeIsModeWork, (store, isModeWork) => ({
        ...store,
        isModeWork: isModeWork,
        curSec: isModeWork?store.workTime:( store.restTime)
    }))
    .on(initCurSec, (store)=>({
        ...store,
        curSec: store.isModeWork?store.workTime:store.restTime
    }))
    .on(tick, (store)=>({
        ...store,
        curSec: store.curSec - 1,
    })).on(startCycle, (store)=>({
        ...store,
        isInProcess: true,
        isPause: false,
    })).on(endCycle, (store)=>({
        ...store,
        isInProcess: false,
        isPause: true,
        curSec: store.workTime,
    })).on(setLongRest, (store)=>({
        ...store,
        curSec: store.longRestTime,
    }))

