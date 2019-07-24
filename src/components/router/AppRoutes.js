import React, { Component } from "react";
import Trending from "../../components/Trending";
import Comingsoon from "../../components/ComingSoon";
import Favorites from "../../components/Favorites";
import Details from "../../components/Details"
import {
  Route
} from 'react-router-dom';
export default class AppRoutes extends Component{
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
          },
          {
            path: "/details/:id",
            component: Details
          }
        ];
    }
    render(){
         
        return (
            this.routes.map((route, index)=>(
            <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
            />
            ))
        )
    }
}
