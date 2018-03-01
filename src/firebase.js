import {initializeApp} from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyDkjPgg0gJZv3H317Oi7PG0IJ7BL79S3lE",
    authDomain: "fir-vue-a9e68.firebaseapp.com",
    databaseURL: "https://fir-vue-a9e68.firebaseio.com",
    projectId: "fir-vue-a9e68",
    storageBucket: "",
    messagingSenderId: "571313380191"
});

export const db = app.database();
export const nodesRef = db.ref('nodes');