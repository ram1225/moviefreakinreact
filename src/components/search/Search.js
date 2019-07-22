import React, { Component } from 'react';
import SearchResults from './SearchResults';
import '../../containers/App.css';

export default class Search extends Component{
    state = {
        searchText: true,
        searchString:'',
        results:[],
        page: 1
    }

    handleToggle= ()=>{
        this.setState(prevState=>({
            searchText : !prevState.searchText
        }));
    }

    handleInputSearch = function(event){
       
       let string = (event !== undefined)?event.target.value: this.state.searchString;
        this.setState({
            searchString: string
        });

        if(string.length>3){
            this.fetchData(string).then((response)=>{
                console.log(response.results);
                this.setState((prevState)=>{
               return prevState.searchString === this.state.searchString?
                     {
                    results: prevState.results.concat(response.results)
                }:{
                    results:  response.results
                }
                });
            })
        }
    }
    
    componentWillUnmount() {
        clearTimeout(Window.timeOut)
    }
    
    fetchData(string) {
        return new Promise((res, rej) => {
        const URL = `https://api.themoviedb.org/3/search/movie?api_key=e4c75b492f15901b665f2dddfc35b81a&language=en-US&query=${string}&page=${this.state.page}&include_adult=false`;
        fetch(URL)
            .then(function(response) {
            return response.json();
            })
            .then(function(myJson) {
            Window.timeOut = setTimeout(() => res(myJson), 2000);
            }).catch(function(error){
                console.log(error);
                rej();
            });
        });
    }

    nextPage=(e)=>{
        this.setState((prevState)=>({
            page: prevState.page+1
        }))
        this.handleInputSearch(e);
    }
    render(){
        const {searchText} = this.state;
     
        return (
            <div className="search-container" >
              <i className={`fa fa-search ${searchText ? "" :'hidden'}` }
              onClick={()=>this.handleToggle()}> Search for items</i>
              
               <input 
               className={`searchbar ${!searchText ? "" :'hidden'}`} 
               id="searchInput" 
               type="text" 
               ref={input => input && input.focus()} 
               onBlur={()=>this.handleToggle()}
               onChange={this.handleInputSearch.bind(this)}
               />
                
                <div className={`${!searchText ? "" :'hidden'}`} >
                <SearchResults 
                results={this.state.results}
                nextPage={(e)=>this.nextPage(e)}
                />
                </div> 
            </div>
        )
    } 
}

/* 
const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 1;
    if (bottom) {   
        console.log('searchWrapper bottom reached'); 
    }
}

function SearchResults(props){
    const items = props.results;
    const imageBaseUrl = "http://image.tmdb.org/t/p/w185/";
    let searchWrapper = document.getElementById('searchWrapper');
   if(items.length === 0)return null;
   return ( 
       <div className="search-wrapper" onScroll={(searchWrapper)=>handleScroll(searchWrapper)}>
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
} */