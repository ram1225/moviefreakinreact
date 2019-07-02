import React,{Component} from "react";
import Loader from "./Loader";
import "../App.css";

function Card(props){
  const items = props.data.results;
  const imageBaseUrl = "http://image.tmdb.org/t/p/w185/";
  return ( 
   
      <div className="card-container">
        { items.map((item, index)=>(
            <div className="card" key={index}>
            <img alt={item.original_title} src={imageBaseUrl+item.poster_path} className="card-image"/>
            <p className="rating">{item.vote_average}</p>
            <p style={{marginBottom: '20px'}}>{item.title}</p>
          </div>
        ))
        }
      </div>
    
   
  )
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
      <Card data={this.state.data}/>
    </div>);
  }
}

//<img alt={item.BoxOffice} src={item.Poster}/>
//   const URL = "http://www.omdbapi.com/?i=tt3896198&apikey=5135675b";