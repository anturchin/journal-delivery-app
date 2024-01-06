import { useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';

const JournalForm = ({updateList}) => {

	const [formValid, setFormValid] = useState({
		title: true,
		text: true,
		date: true
	});

	const onSubmitForm = (e) => {
		
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		
		let isValid = true;

		if(!formProps.title?.trim().length){
			setFormValid(state => ({...state, title: false}));
			isValid = false;
		} else {
			setFormValid(state => ({...state, title: true}));
		}

		if(!formProps.text?.trim().length){
			setFormValid(state => ({...state, text: false}));
			isValid = false;
		} else {
			setFormValid(state => ({...state, text: true}));
		}

		if(!formProps.date){
			setFormValid(state => ({...state, date: false}));
			isValid = false;
		} else {
			setFormValid(state => ({...state, date: true}));
		}

		if(!isValid){
			return;
		}

		updateList(formProps);

	};

	const styleTitle = 
	formValid.title 
		? styles['journal-form__title'] 
		: cn(styles['journal-form__title'], styles['invalid']);
	const styleDate = 
	formValid.date 
		? styles['journal-form__input'] 
		: cn(styles['journal-form__input'], styles['invalid']);
	const styleText = 
	formValid.text 
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