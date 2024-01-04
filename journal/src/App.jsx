
import './App.css';
import Button from './components/Button/Button';
import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton';

function App() {

	const data = [
		{
			title: 'Событие',
			date: new Date(),
			text: 'Скоро рождество'
		},
		{
			title: 'Событие 2',
			date: new Date(),
			text: 'Скоро старый Новый Год'
		}
	];

	return (
		<>
			<h1>journal</h1>
			<Button />
			<CardButton>
				Новое событие
			</CardButton>
			<CardButton>
				<JournalItem 
					title={data[0].title}
					date={data[0].date}
					text={data[0].text}
				/>
			</CardButton>
			<CardButton>
				<JournalItem 
					title={data[1].title}
					date={data[1].date}
					text={data[1].text}
				/>
			</CardButton>
		</>
	);
}

export default App;
