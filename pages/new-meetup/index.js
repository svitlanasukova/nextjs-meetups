import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupFrom from '../../components/meetups/NewMeetupForm';

function newMeetupPage() {
	const router = useRouter();
	async function addMeetupHandler(enteredMeetupData) {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredMeetupData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		console.log(data);
		router.push('/');
	}

	return (
		<>
			<Head>
				<title>New meetup!</title>
				<meta
					name="description"
					content="Add your own meetups and create amazing networking opportunities."
				/>
			</Head>
			<NewMeetupFrom onAddMeetup={addMeetupHandler} />
		</>
	);
}

export default newMeetupPage;
