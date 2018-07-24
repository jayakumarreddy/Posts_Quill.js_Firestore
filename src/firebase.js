import firebase from 'firebase';
import config from '../src/config';

firebase.initializeApp(config);
const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
export default db;