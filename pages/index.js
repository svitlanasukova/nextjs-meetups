import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
	return (
		<>
			<Head>
				<title>React meetups!</title>
				<meta
					name="description"
					content="Browse a huge list of highly active React meetups!"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
}

// export function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;
// 	// fetch data from an API
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export async function getStaticProps() {
	// fetch data from an API

	const client = await MongoClient.connect(
		'mongodb+srv://svitlana:ZSuVE6U5Dt1xSEaX@cluster0.l7xgao4.mongodb.net/meetups?retryWrites=true&w=majority',
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map(meetup => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10, // seconds
	};
}

export default HomePage;
