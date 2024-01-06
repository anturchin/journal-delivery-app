import { useState } from 'react';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalForm from './components/JournalForm/JournalForm';

import './App.css'; 

function App() {
	
	const initialData = [
		{
			title: 'Скоро рождество',
			text: 'Нужно купить подарки',
			date: new Date(),
			id: 1
		},
		{
			title: 'Выезд в горы',
			text: 'Кататься на сноуборде',
			date: new Date(),
			id: 2
		}
	];

	const [list, setList] = useState(initialData);

	const updateList = data => {
		setList(old => [...old, {
			title: data.title,
			text: data.text,
			date: new Date(data.date),
			id: old.length > 0 ? Math.max(...old.map(i => i.id)) + 1 : 1
		}]);
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList list={list}/>
			</LeftPanel>
			<Body>
				<JournalForm updateList={updateList} />
			</Body>
		</div>
	);
}

export default App;
