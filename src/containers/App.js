import React, { Component } from "react";
import NavBar from "../components/navigation/NavBar";
import Header from "../components/header/Header";
import Notfound from '../components/not-found/Notfound';
import Details from '../components/Details'

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './../firebaseConfig';

import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch 
} from 'react-router-dom';
import AppRoutes from '../components/router/AppRoutes';


const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menustate: false,
      navlist: [
        { name: "Trending", isActive: true },
        { name: "Coming Soon", isActive: false },
        { name: "Favorites", isActive: false }
      ]
    };

    this.details =  {
      path: "/details/:id",
      component: Details
    }
    this.itemSelected = this.itemSelected.bind(this);
  }

  itemSelected(name) {
    const activeItem = this.state.navlist.find((item)=> item.isActive === true);
    if(activeItem.name !== name){
    this.setState(cState => {

    let navlist = cState.navlist.map((item)=> {
        if(item.name === name) return {name:item.name, isActive: true };
          return {name:item.name, isActive: false };
        })
        return {
          navlist
        }
    });
    }
  }
  menuHandle=()=>{
    console.log('menu');
    this.setState({
      menustate: !this.state.menustate
    })
  }
  render() {
    const {  user, signOut, signInWithGoogle } = this.props;
    
     if(!user) {
      return (
        <div className="prelogin">
        <h3>Hello,</h3>
        <h1>Please sign in to access the app!</h1>
        <button className="customButton logoutbtn" onClick={signInWithGoogle}>Login via Google!</button>
        </div>
       )
     }else{
      return (
        <Router>
  
          <div className="container">
            <header>
              <Header user={user} signOut={signOut} onMenuHandle={()=>this.menuHandle()} 
          />
            </header>
                <NavBar
                  navlist={this.state.navlist}
                  itemSelected={this.itemSelected}
                  menustate={this.state.menustate}
                />
            <div className="content-wrapper">
            <Switch>
                 <AppRoutes/>
                 <Route component={Notfound} />
                 </Switch>
            </div>
          </div>
  
        </Router>
      );
     }
  }
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);

// export default App;
