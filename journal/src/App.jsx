import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalForm from './components/JournalForm/JournalForm';

import './App.css'; 

function App() {
	
	const [list, setList] = useState([]);
	
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if(data){
			setList(data.map(item => ({
				...item,
				date: new Date(item.date)
			})));
		}
	}, []);

	useEffect(()=> {
		if(list.length){
			localStorage.setItem('data', JSON.stringify(list));
		}
	}, [list]);

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
