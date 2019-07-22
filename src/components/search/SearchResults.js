import React, { Component } from 'react';
import '../../containers/App.css';


export default class SearchResults extends Component{
    handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 1;
        if (bottom) {   
            console.log('searchWrapper bottom reached'); 
            this.props.nextPage();
        }
    }

    render(){
        const items = this.props.results;
        const imageBaseUrl = "http://image.tmdb.org/t/p/w185/";
        let searchWrapper = document.getElementById('searchWrapper');
       if(items.length === 0)return null;
       return ( 
           <div className="search-wrapper" onScroll={(searchWrapper)=>this.handleScroll(searchWrapper)}>
               <ul  id="searchWrapper" >
               { items.map((item, index)=>(
                   <li className="" key={index}>
                       <div className="search-results">
                       <img alt={item.title} src={`${imageBaseUrl+item.poster_path}`} className=""/>
                           <div>
                               <p style={{marginBottom: '20px'}}>{item.title}</p>
                               <p style={{marginBottom: '20px'}}>Release Date: {item.release_date}</p>
                           </div>
                       </div>
                   </li>
                   
               ))
               }
               </ul>
           </div>
           )
    }
 
}