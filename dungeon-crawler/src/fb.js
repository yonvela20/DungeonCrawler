import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
var config = {
	apiKey: 'AIzaSyD5uN5-WH_sjf7uuIRkngCwdW5CSUWMRgM',
	authDomain: 'dungeon-crawler-c0926.firebaseapp.com',
	databaseURL: 'https://dungeon-crawler-c0926.firebaseio.com',
	projectId: 'dungeon-crawler-c0926',
	storageBucket: 'dungeon-crawler-c0926.appspot.com',
	messagingSenderId: '644178020139'
};
firebase.initializeApp(config);

//initialize the connection
const db = firebase.firestore();

db.settings({
	//Esto ya no hace falta ponerlo en true, viene por defecto
	//timestampsInSnapshots: true
});

export default db;
