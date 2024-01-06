import Button from '../Button/Button';
import './JournalForm.css';

const JournalForm = ({updateList}) => {

	const onSubmitForm = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		updateList(formProps);
	};

	return (
		<form className="journal-form" onSubmit={onSubmitForm}>
			<input className="journal-form__input" type="text" name="title"/>
			<input className="journal-form__input" type="date" name="date"/>
			<input className="journal-form__input" type="text" name="tag" />
			<textarea className="journal-form__textarea" name="text"></textarea>
			<Button text="Сохранить"/>
		</form>
	);
};

export default JournalForm;