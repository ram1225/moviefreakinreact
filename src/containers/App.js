import React, { Component } from "react";
import NavBar from "../components/navigation/NavBar";
import Header from "../components/header/Header";
import Notfound from '../components/not-found/Notfound';
import Details from '../components/Details'

import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch 
} from 'react-router-dom';
import AppRoutes from '../components/router/AppRoutes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
   
    
    // const show =  this.props.location.pathname===''
    return (
      <Router>
        <div className="container">
          <header>
            <Header/>
          </header>
              <NavBar
                navlist={this.state.navlist}
                itemSelected={this.itemSelected}
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

export default App;
