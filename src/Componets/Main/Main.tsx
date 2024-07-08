
import { Wrapper } from "../Wrapper/Wrapper";
import styles from  './Main.module.css'
import { TextBlock } from "./TextBlock/TextBlock";
import { TimerBlock } from "./TimerBlock/TimerBlock";



export function Main(){
    return (
        <Wrapper>
            <div className={styles.main}>
                <TextBlock/>
                <TimerBlock/>
            </div>
        </Wrapper>
    )
}