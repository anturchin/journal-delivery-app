import { useState } from 'react';
import Button from '../Button/Button';
import './JournalForm.css';

const JournalForm = () => {

	const [value, setValue] = useState('');

	const onInputChange = (e) => {
		setValue(e.target.value);
	};

	const onSubmitForm = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		console.log(formProps);
	};

	return (
		<form className="journal-form" onSubmit={onSubmitForm}>
			<input className="journal-form__input" type="text" name="header"/>
			<input className="journal-form__input" type="date" name="date"/>
			<input className="journal-form__input" type="text" name="tag" value={value} onChange={onInputChange} />
			<textarea className="journal-form__textarea" name="post"></textarea>
			<Button text="Сохранить"/>
		</form>
	);
};

export default JournalForm;