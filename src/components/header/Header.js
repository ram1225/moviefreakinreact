import React from 'react';
import '../../containers/App.css';
import Search from '../search/Search';

export default function Header(props){
    return (
        <div className="header">
            <div className="content">
             App 
            </div>
            <Search/>
        </div>
    )
}
