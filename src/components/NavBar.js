import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import '../App.css';
import {
    Link
  } from 'react-router-dom';


export default function NavBar(props){
    return (
        <nav>
            <ul>
                {
                props.navlist.map((item)=>(
                        <li 
                        key={item.name} 
                        className={ item.isActive ? 'active': '' }
                        onClick={()=>props.itemSelected(item.name)}>
                            <Link to={`/${item.name}`} className={ item.isActive ? 'active': 'cust-link' }>
                            {item.name}
                        <FontAwesomeIcon icon={faArrowRight}  className={ item.isActive ? 'ml10': 'hide' }/>
                            </Link>
                        </li>
                ))
                }
            </ul>
        </nav>
    )
}


//5135675b