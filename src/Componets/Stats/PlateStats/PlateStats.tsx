
import { ReactElement } from "react";
import styles from  './PlateStats.module.css'
import classNames from "classnames";
import { FocusSvg } from "../../../SVG/FocusSvg";
import { PauseSvg } from "../../../SVG/PauseSvg";
import { StopSvg } from "../../../SVG/StopSvg";


interface IPlate{
    type: Ttype,
    data?: number,
}
type Ttype = 'focus' | 'pause' | 'stop';

interface ITypeData{
    title: string,
    data : (number : number)=>string,
    icon: ReactElement
}


const TYPE = new Map<Ttype,ITypeData> ([
    ['focus', {
        title: 'Фокус',
        data: (num : number)=>{return Math.floor(num*100) +  '%'},
        icon: <FocusSvg/>
        
    }],
    ['pause', {
        title: 'Время на паузе',
        data: (num : number)=>{return num + 'М'},
        icon: <PauseSvg/>
        
    }],
    ['stop', {
        title: 'остановки',
        data: (num : number)=>{return num + ''},
        icon: <StopSvg/>
        
    }],
]);


export function PlateStats({type, data}:IPlate){
    const disable = data === 0;

    const Plate = TYPE.get(type);
    if(Plate === undefined) return
    let dataContent;

    if( data === undefined) 
        dataContent = Plate.data(0)
    else
        dataContent = Plate.data(data);



    const plateStyle  = classNames(
        styles.plate,
        {
            [styles.disable]: disable,
            [styles[type]]: !disable,
        },
        
    )
    
    return (
        <div className={plateStyle}>
            <div className={styles.data}>
                <h3 className={styles.title}>{Plate.title}</h3>
                <p className={styles.dataContent}>{dataContent}</p>
            </div>
            <div className={styles.logo}>
                {Plate.icon}
            </div>
        </div>
    )
}