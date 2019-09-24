import firebase from 'firebase';
import {SECRET_firebaseConfig} from './config';

class Firebase{
    constructor(){
        this.init();
        this.observeAuth();
    }

    init = () => {
        firebase.initializeApp({SECRET_firebaseConfig});
    };

    observeAuth = () => {
        firebase.auth.onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = (user) => {
        if(!user){
            try{
                firebase.auth().signInAnonymously();
            }catch (message){

            }
        }
    }

    get uid(){
        return (firebase.auth().currentUser || {}).uid
    }

    get ref(){
        return firebase.database.ref('message')
    }

    parse = snapshot => {
        const {timestamp: numberStamp, text, user} = snapshot.val();
        const {key: _id} = snapshot;
        const timestamp = new Date(numberStamp);

        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        
        return message;
    };

    on = callback => {
        this.ref
            .limitToLast(50)
            .on('child_added', snapshot => callback(this.parse()))
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    send = (message) => {
        for( let i = 0; i< message.length; i++){
            const {text, user} = message[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            }
        };
        this.append(message);
    }

    append = (message) => this.ref().push(message);

    off(){
        this.ref.off();
    }
}

Firebase.shared = new Firebase();
export default Firebase;