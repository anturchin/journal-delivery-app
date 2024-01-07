import { useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import cn from 'classnames';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';


const JournalForm = ({updateList}) => {

	
	const [formState, dispatchForm]  = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};

	useEffect(()=>{	
		let timerId;
		if(!isValid.date || !isValid.text || !isValid.title) {
			focusError(isValid);
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
			dispatchForm({type: 'CLEAR'});
		}
	}, [isFormReadyToSubmit, values, updateList]);

	const onChange = (e) => {
		dispatchForm({
			type: 'SET_VALUE',
			payload: {
				[e.target.name]: e.target.value
			}
		});
	};

	const onSubmitForm = (e) => {
		
		e.preventDefault();
		dispatchForm({type: 'SUBMIT'});

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
					value={values.title}
					onChange={onChange}
					ref={titleRef}
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
					value={values.date}
					onChange={onChange}
					ref={dateRef}
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
					value={values.tag}
					onChange={onChange}
				/>
			</div>
			<textarea 
				className={styleText} 
				name="text"
				value={values.text}
				onChange={onChange}
				ref={textRef}
			>
			</textarea>
			<Button text="Сохранить"/>
		</form>
	);
};

export default JournalForm;