import React, { Component } from 'react';
import '../../containers/App.css';

function SearchResults(props){
    const items = props.results;
    // const imageBaseUrl = "http://image.tmdb.org/t/p/w185/";
    if(items.length === 0)return null;
    return ( 
        <div className="search-wrapper">
            <ul>
            { items.map((item, index)=>(
                <li className="" key={index}>
                    <div >
                    <p style={{marginBottom: '20px'}}>{item.title}</p>
                    </div>
                </li>
                
            ))
            }
            </ul>
        </div>
        )
}
export default class Search extends Component{
    state = {
        searchText: true,
        searchString:'',
        results:[]
    }

    handleToggle= ()=>{
        this.setState(prevState=>({
            searchText : !prevState.searchText
        }));
    }

    handleInputSearch = function(event){
       let string = event.target.value ;
        this.setState({
            searchString: event.target.value
        });

        if(string.length>3){
            this.fetchData(string).then((response)=>{
                console.log(response.results);
                this.setState({
                    results: response.results
                });
            })
        }
    }

    
  fetchData(string) {
    return new Promise((res, rej) => {
      const URL = `https://api.themoviedb.org/3/search/movie?api_key=e4c75b492f15901b665f2dddfc35b81a&language=en-US&query=${string}&page=1&include_adult=false`;
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

  componentWillUnmount(){
    clearTimeout(Window.timeOut)
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
                    <SearchResults results={this.state.results}/>
                </div> 
            </div>
        )
    } 
}

