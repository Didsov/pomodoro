
import {Link } from 'react-router-dom';
import styles from  './Logo.module.css';
import { LogoSvg } from "../../../SVG/LogoSvg";

interface Logo{
    
}
export function Logo(){
    return (
        <Link to='/pomodoro' className={styles.container}>
            <LogoSvg/>
            <p className={styles.logoTitle}>pomodoro_box</p>
        </Link>
    )
}