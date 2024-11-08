import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import { useEffect,  useReducer } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm_state';



function JournalForm({ onSubmit }) {

  //const [formValidState, setFormValidState] = useState(INITIAL_STATE)

  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
  const {isValid, isFormReaydyToSubmit, values} = formState

  useEffect(() => {
    let timerID
    if (!isValid.date || !isValid.text || !isValid.title) {
      timerID = setTimeout(() => {
        dispatchForm({type: 'RESET_VALIDITY'})
        //setFormValidState(INITIAL_STATE)
      }, 2000)
    }
    return () => {
      clearTimeout(timerID)
    }
  }, [isValid]);

  useEffect(() => {
    if (isFormReaydyToSubmit) {
      onSubmit(values)
    }
  }, [isFormReaydyToSubmit])


  const addJournalItem = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    dispatchForm({type: 'SUBMIT', payload: formProps})
    onSubmit(formProps)
  }
    
    return (        
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
          <div>
          <input type='text' name='title' className={cn(styles['input-title'], {
              [styles['invalid']] : !isValid.title
            })}/>
          </div>

          <div className={styles['form-row']}>          
            <label htmlFor="date" className={styles['form-label']}>
              <img className={styles.dateImg} src="/date.svg" alt="Иконка календаря"/>
              <span>Дата</span>
            </label>
            <input type = 'date' name='date' id='date' className={cn(styles['input'], {
              [styles['invalid']] : !isValid.date
            })}/>
          </div>

          <div className={styles['form-row']}>          
            <label htmlFor="tag" className={styles['form-label']}>
              <img className={styles.folderImg} src="/folder.svg" alt="Иконка папки"/>
              <span>Метки</span>
            </label>
            <input type='text' id="tag" name='tag' className={styles['input']}/>
          </div>
          

          
          <textarea name="text" id="" cols="30" rows="10" className={cn(styles['input'], {
              [styles['invalid']] : !isValid.text
            })}></textarea>
          <Button text="Сохранить"/>
        </form>             
    );
    
}

export default JournalForm;