import React,{Component} from "react";
import Loader from "./loader/Loader";
import {
  Link
} from 'react-router-dom'
import '../containers/App.css';

class Card extends Component{
 
  render(){
    const items = this.props.data.results;
    const imageBaseUrl = "http://image.tmdb.org/t/p/w185/";

    return ( 
        <div className="card-container">
          { items.map((item, index)=>(
            <div key={index} className="card" 
                onMouseEnter={()=>this.props.onHandleHover(index,true)}
                onMouseLeave={()=>this.props.onHandleHover(index,false)}>
                <img alt={item.original_title} src={imageBaseUrl+item.poster_path} className="card-image"/>
                <p className="rating">{item.vote_average}</p>
                <p style={{marginBottom: '20px'}} className="title">{item.title}</p>
                <Link to={`/details/${item.id}`}>
                <button className={`${!item.isHovered?'hide-card':''}`} 
                >More details</button>
                </Link>

              </div>
          ))
          }
        </div>)
  }

}
export default class Trending extends Component{
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        data: []
      };
    Window.timeOut = {};
    this.fetchData = this.fetchData.bind(this); 
  }
  handleHover=(index,value)=>{

    let data= {...this.state.data}
    data.results[index]['isHovered']=value;
    this.setState(prevState => ({
        data: data
    }));

  }

  componentDidMount() {
    this.fetchData().then(data => {
      this.setState({
        data,
        loading: false
      });
    });
  }

  fetchData() {
    return new Promise((res, rej) => {
      const URL = "https://api.themoviedb.org/3/movie/popular?api_key=e4c75b492f15901b665f2dddfc35b81a&language=en-US&page=1";
      fetch(URL)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          Window.timeOut = setTimeout(() => res(myJson), 2000);
        });
    });
  }

  componentWillUnmount(){
    clearTimeout(Window.timeOut)
  }
  render() {
    if (this.state.loading === true) {
        return (<div> <h3>Trending</h3><Loader /></div>);
      }
  
    return (
    <div>
       <h3 className="header-name">Trending</h3>
      <Card data={this.state.data} onHandleHover={this.handleHover}/>
    </div>);
  }
}

//<img alt={item.BoxOffice} src={item.Poster}/>
//   const URL = "http://www.omdbapi.com/?i=tt3896198&apikey=5135675b";