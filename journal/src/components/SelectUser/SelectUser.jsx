import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import styles from './SelectUser.module.css';

const SelectUser = () => {

	const {userId, setUserId} = useContext(UserContext);

	const changeUser = (e) => {
		setUserId(Number(e.target.value));
	};

	return (
		<select 
			className={styles['select']}
			name="user" 
			id="user" 
			onChange={changeUser}
			value={userId}
		>
			<option className={styles['option']} value="1">admin</option>
			<option className={styles['option']} value="2">user</option>
		</select>
	);
};

export default SelectUser;