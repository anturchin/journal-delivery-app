import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/userContext';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

import './JournalList.css';

function JournalList({ list, setItem }) {

	const {userId} = useContext(UserContext);
	
	const sortList = (a, b) => a.date < b.date ? 1 : -1;
	
	const filteredItems = useMemo(()=> list
		.filter(el => el.userId === userId)
		.sort(sortList), [list, userId]); 

	if(list.length === 0) {
		return <p>Список пуст</p>;
	}

	return (
		<div className='journal-list'>
			{filteredItems.map(el => (
				<CardButton key={el.id} onClick={()=> setItem(el)}>
					<JournalItem 
						title={el.title}
						text={el.text}
						date={el.date}
					/>
				</CardButton>
			))}
		</div>
	);
}

export default JournalList;