import { useState } from 'react';
import Button from '../Button/Button';
import './JournalForm.css';

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

	let styleTitle = formValid.title ? 'journal-form__input' : 'journal-form__input invalid';
	let styleDate = formValid.date ? 'journal-form__input' : 'journal-form__input invalid';
	let styleText = formValid.text ? 'journal-form__textarea' : 'journal-form__textarea invalid';

	return (
		<form className="journal-form" onSubmit={onSubmitForm}>
			<input 
				className={styleTitle}  
				type="text" 
				name="title" 
			/>
			<input 
				className={styleDate}
				type="date" 
				name="date"
			/>
			<input 
				className="journal-form__input" 
				type="text" 
				name="tag" 
			/>
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