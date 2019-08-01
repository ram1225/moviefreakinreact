import React from 'react';
import '../../containers/App.css';
import Search from '../search/Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { withRouter} from 'react-router';
import {
    Link
  } from 'react-router-dom';
 
function Header(props){
    
    const show = props.location.pathname.indexOf('details') === -1;
    let content= !show?'Movie Details':'App';
    return (
        <div className="header">
              <div className="content"> 
              {(show)? <i className="fa fa-bars menuicon" onClick={props.onMenuHandle}></i>:''}
              
              <Link to={'/Trending'}>
              {(!show)? <FontAwesomeIcon style={{paddingLeft: '15px'}} icon={faArrowLeft} />:''}
              </Link>
                 <p style={{paddingLeft: '15px', whiteSpace: 'nowrap'}}>{content}</p>
              </div>
            <Search/>
        </div>
    )
}
export default withRouter(Header);