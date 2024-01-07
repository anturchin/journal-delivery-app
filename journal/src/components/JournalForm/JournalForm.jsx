import { useEffect, useReducer } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import cn from 'classnames';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';


const JournalForm = ({updateList}) => {

	
	const [formState, dispatchForm]  = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	
	useEffect(()=>{
		
		let timerId;
		
		if(!isValid.date || !isValid.text || !isValid.title) {
			timerId = setTimeout(()=>{
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		
		return () =>{
			clearTimeout(timerId);
		};

	}, [isValid]);

	useEffect(()=> {
		if(isFormReadyToSubmit){
			updateList(values);
		}
	}, [isFormReadyToSubmit]);

	const onSubmitForm = (e) => {
		
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		dispatchForm({type: 'SUBMIT', payload: formProps});

	};

	const styleTitle = 
	isValid.title 
		? styles['journal-form__title'] 
		: cn(styles['journal-form__title'], styles['invalid']);
	const styleDate = 
	isValid.date 
		? styles['journal-form__input'] 
		: cn(styles['journal-form__input'], styles['invalid']);
	const styleText = 
	isValid.text 
		? styles['journal-form__textarea'] 
		: cn(styles['journal-form__textarea'], styles['invalid']);

	return (
		<form className={styles['journal-form']} onSubmit={onSubmitForm}>
			<div>
				<input 
					className={styleTitle}  
					type="text" 
					name="title" 
				/>
			</div>
			<div className={styles['journal-form__row']}>
				<label 
					className={styles['journal-form__label']} 
					htmlFor="date">
					<img src="/calendar.svg" alt="caleтdar" />
					<span>Дата</span>
				</label>
				<input 
					className={styleDate}
					type="date" 
					name="date"
					id="date"
				/>
			</div>
			<div className={styles['journal-form__row']}>
				<label 
					className={styles['journal-form__label']} 
					htmlFor="tag">
					<img src="/folder.svg" alt="folder" />
					<span>Метки</span>
				</label>
				<input 
					className={styles['journal-form__input']} 
					type="text" 
					name="tag" 
					id="tag"
				/>
			</div>
			<textarea 
				className={styleText} 
				name="text"
			>
			</textarea>
			<Button text="Сохранить"/>
		</form>
	);
};

export default JournalForm;