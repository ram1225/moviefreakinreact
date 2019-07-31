import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../../containers/App.css';
import {
    Link
  } from 'react-router-dom';
import { withRouter} from 'react-router';



  function NavBar(props){
    const show = props.location.pathname.indexOf('details') === -1;
     return (show)?
     (
        <div className={`nav-wrapper ${props.menustate?'dblock':''}`}>
            <section className="sidebar">
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
            </section>
        </div>
    ): (<div></div>)
}

export default  withRouter(NavBar);

//5135675b