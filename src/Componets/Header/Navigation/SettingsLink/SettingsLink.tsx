
import styles from  './SettingsLink.module.css';
import {Link } from 'react-router-dom';
import { SettingsSVG } from "../../../../SVG/SettingsSVG";


export function SettingsLink(){
    return (
        <Link to='/pomidoro-react/settings' className={styles.container}>
            <SettingsSVG/>
            <p className={styles.title}>Настройки</p>
        </Link>
    )
}