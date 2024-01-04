import './JournalItem.css';

const JournalItem = ({title, date, text}) => {

	const formateDate = new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<>
			<h2 className="journal-item__title">{title}</h2>
			<div className="journal-item__content">
				<div className="journal-item__date">{formateDate}</div>
				<div className="journal-item__text">{text}</div>
			</div>
		</>
	);
};

export default JournalItem;