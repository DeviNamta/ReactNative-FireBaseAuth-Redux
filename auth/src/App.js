import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
    state = { loggedIn: null };
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCfs8BEvneZlw4iraBs7SujkpzSr_xabcY',
            authDomain: 'auth-fb15e.firebaseapp.com',
            databaseURL: 'https://auth-fb15e.firebaseio.com',
            projectId: 'auth-fb15e',
            storageBucket: 'auth-fb15e.appspot.com',
            messagingSenderId: '621147340550'
          });

          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
          });
    }

    renderContent() {
       switch (this.state.loggedIn) {
           case true:
           return ( 
                <View style={{ padding: 5, flexDirection: 'row' }} >
                    <Button onPress={() => firebase.auth().signOut()}>
                    Log Out
                    </Button>
                </View>
            );     
           case false:
           return <LoginForm />;
           default:
           return <Spinner size="large" />;
       }
    }
    render() {
        return (
            <View>
                <Header headerText="Authentication" />
               {this.renderContent()}
            </View>
        );
    }
}

export default App;
