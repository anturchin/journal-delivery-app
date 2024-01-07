import { useEffect, useReducer, useRef, useContext } from 'react';
import cn from 'classnames';
import { UserContext } from '../../context/userContext';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';


const JournalForm = ({updateList, data, onDelete}) => {

	
	const [formState, dispatchForm]  = useReducer(formReducer, INITIAL_STATE);
	const {isValid, isFormReadyToSubmit, values} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const { userId } = useContext(UserContext);

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

	useEffect(() => {
		
		if(!data){
			dispatchForm({type: 'CLEAR'});
			dispatchForm({
				type: 'SET_VALUE',
				payload: {
					userId
				}
			});
		}

		dispatchForm({
			type: 'SET_VALUE',
			payload: {
				...data
			}
		});
	}, [data, userId]);

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
			dispatchForm({
				type: 'SET_VALUE',
				payload: {
					userId
				}
			});
		}
	}, [isFormReadyToSubmit, values, updateList, userId]);

	useEffect(()=> {
		dispatchForm({
			type: 'SET_VALUE',
			payload: {
				userId
			}
		});
	}, [userId]);

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

	const deleteJournalItem = () => {
		onDelete(data.id);
		dispatchForm({type: 'CLEAR'});
		dispatchForm({
			type: 'SET_VALUE',
			payload: {
				userId
			}
		});
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
			<div className={styles['journal-form__row']}>
				<input 
					className={styleTitle}  
					type="text" 
					name="title" 
					value={values.title}
					onChange={onChange}
					ref={titleRef}
				/>
				{data?.id && <button onClick={deleteJournalItem} type="button" className={styles['journal-form__button']}>
					<img src="/archive.svg" alt="archive" />
				</button>}
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
					value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
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
			<Button>Сохранить</Button>
		</form>
	);
};

export default JournalForm;