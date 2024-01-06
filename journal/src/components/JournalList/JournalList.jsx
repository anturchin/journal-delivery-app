import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

import './JournalList.css';

function JournalList({ list }) {

	if(list.length === 0) {
		return <p>Список пуст</p>;
	}

	const sortList = (a, b) => a.date < b.date ? 1 : -1;

	return (
		<div className='journal-list'>
			{list.sort(sortList).map(el => (
				<CardButton key={el.id}>
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