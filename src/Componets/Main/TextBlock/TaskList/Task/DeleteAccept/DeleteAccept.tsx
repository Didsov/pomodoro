
import styles from  './DeleteAccept.module.css'
import { CrossCloseSvg } from "../../../../../../SVG/CrossCloseSvg";


interface IDeleteAccept{
    handleClose: ()=>void,
    handleDelete: ()=>void,
}
export function DeleteAccept({handleClose, handleDelete}:IDeleteAccept){
    function handleCloseAndDelete(){
        handleDelete();
        handleClose();
    }
    return (
        <div className={styles.acceptContainer} onClick={handleClose}>
            <div className={styles.accept}>
                <h2 className={styles.title}>Удалить задачу?</h2>
                <button className={styles.deleteBtn} onClick={handleCloseAndDelete}>Удалить</button>
                <button className={styles.dontBtn} onClick={handleClose}>Отмена</button>
                <button className={styles.closeBtn} onClick={handleClose}><CrossCloseSvg/></button>
            </div>
        </div>
    )
}