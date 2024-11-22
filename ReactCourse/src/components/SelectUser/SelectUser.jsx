import { useContext } from 'react';
import styles from './SelectUser.module.css';
import { UserContext } from '../../context/userContext';


function SelectUser() {
    const { userId, setUserId } = useContext(UserContext)
    const changeUser = (e) => {
        setUserId(Number(e.target.value))
    }
    return ( 
        <select className={styles['select']} name="user" id="user" value={userId} onChange={changeUser}>
            <option value="1">Никита</option>
            <option value="2">Илья</option>
        </select>               
    );
}

export default SelectUser