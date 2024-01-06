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

	return (
		<form className="journal-form" onSubmit={onSubmitForm}>
			<input 
				className="journal-form__input" 
				type="text" 
				name="title" 
				style={{border: formValid.title ? undefined : '1px solid red'}}/>
			<input 
				className="journal-form__input" 
				type="date" 
				name="date"
				style={{border: formValid.date ? undefined : '1px solid red'}}
			/>
			<input 
				className="journal-form__input" 
				type="text" 
				name="tag" 
			/>
			<textarea 
				className="journal-form__textarea" 
				name="text"
				style={{border: formValid.text ? undefined : '1px solid red'}}
			>
			</textarea>
			<Button text="Сохранить"/>
		</form>
	);
};

export default JournalForm;