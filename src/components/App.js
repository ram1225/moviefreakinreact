import React, { Component } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import Trending from "./Trending";
import Comingsoon from "./ComingSoon";
import Favorites from "./Favorites";
import "../App.css";
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);

    this.routes = [
      {
        path: "/",
        exact: true,
        component: Trending
      },
      {
        path: "/Trending",
        component: Trending
      },
      {
        path: "/coming soon",
        component: Comingsoon
      },
      {
        path: "/favorites",
        component: Favorites
      }
    ];

    this.state = {
      navlist: [
        { name: "Trending", isActive: true },
        { name: "Coming Soon", isActive: false },
        { name: "Favorites", isActive: false }
      ]
    };

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
    return (
      <Router>
        <div className="container">
          <header>
            <Header />
          </header>

          <div className="nav-wrapper">
            <section className="sidebar">
        
              <NavBar
                navlist={this.state.navlist}
                itemSelected={this.itemSelected}
              />
      
            </section>
          </div>

          <div className="content-wrapper">
        

          { this.routes.map((route, index)=>(
              <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))
        }
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
