import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import { useContext, useEffect,  useReducer, useRef } from 'react';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm_state';
import Input from '../Input/Input';
import { UserContext } from '../../context/userContext';



function JournalForm({ onSubmit, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
  const {isValid, isFormReadyToSubmit, values} = formState
  const titleRef = useRef()
  const dateRef = useRef()
  const textRef = useRef()
  const {userId} = useContext(UserContext)

  const focusError = (isValid) => {
    switch(true) {
      case !isValid.title:
        titleRef.current.focus()
        break;
      case !isValid.date:
        dateRef.current.focus()
        break;
      case !isValid.text:
        textRef.current.focus()
        break
    }
  }

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: 'SET_VALUE', payload: { userId }})
    }
    dispatchForm({ type: 'SET_VALUE', payload: {...data }})
  }, [data])

  useEffect(() => {
    let timerID;
    if (!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid);
      timerID = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerID);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
      dispatchForm({ type: 'SET_VALUE', payload: { userId }})
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({type: 'SET_VALUE', payload: { userId }})
  }, [userId])

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  const deleteJournalItem = () => {
    onDelete(data.id)
    dispatchForm({ type: "CLEAR" });
    dispatchForm({ type: 'SET_VALUE', payload: { userId }})
  }

  return (        
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      
      <div className={styles['form-row']}>
      <Input type='text' ref={titleRef} isValid={isValid.title} onChange={onChange} value={values.title} name='title' appearence="title"/>
      {data?.id && <button className={styles['delete']} type="button" onClick={deleteJournalItem}>
        <img src="/delete.svg" alt="кнопка удалить"/>
      </button>}
      </div>

      <div className={styles['form-row']}>          
        <label htmlFor="date" className={styles['form-label']}>
          <img className={styles.dateImg} src="/date.svg" alt="Иконка календаря"/>
          <span>Дата</span>
        </label>
        <Input type = 'date' ref={dateRef} isValid={isValid.date} onChange={onChange} name='date' value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} id='date'/>
      </div>

      <div className={styles['form-row']}>          
        <label htmlFor="tag" className={styles['form-label']}>
          <img className={styles.folderImg} src="/folder.svg" alt="Иконка папки"/>
          <span>Метки</span>
        </label>
        <Input type='text' id="tag" onChange={onChange} value={values.tag} name='tag'/>
      </div>         
      <textarea name="text" id="" ref={textRef} onChange={onChange} value={values.text} cols="30" rows="10" className={cn(styles['input'], {
          [styles['invalid']] : !isValid.text
        })}></textarea>
      <Button>Сохранить</Button>
    </form>             
);

}

export default JournalForm;
