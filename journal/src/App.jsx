import { useLocalStorage } from './hooks/use-localstorage.hook';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import JournalForm from './components/JournalForm/JournalForm';

import './App.css'; 

function mapItems(items){
	if(!items){
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	})); 
}

function App() {
	
	const [list, setList] = useLocalStorage('data');
	
	const updateList = data => {
		setList([...mapItems(list), {
			title: data.title,
			text: data.text,
			date: new Date(data.date),
			id: list.length > 0 ? Math.max(...list.map(i => i.id)) + 1 : 1
		}]);
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList list={mapItems(list)}/>
			</LeftPanel>
			<Body>
				<JournalForm updateList={updateList} />
			</Body>
		</div>
	);
}

export default App;
