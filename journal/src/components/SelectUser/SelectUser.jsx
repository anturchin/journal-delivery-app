import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const SelectUser = () => {

	const {userId, setUserId} = useContext(UserContext);

	const changeUser = (e) => {
		setUserId(Number(e.target.value));
	};

	return (
		<select 
			name="user" 
			id="user" 
			onChange={changeUser}
			value={userId}
		>
			<option value="1">admin</option>
			<option value="2">user</option>
		</select>
	);
};

export default SelectUser;