import React,{Component} from 'react';
import Loader from '../components/loader/Loader'

export default class Credits extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            moviedetails: {}
          };
        Window.CreditsTimeOut = {};
        this.fetchData = this.fetchData.bind(this);  
        this.movieId = props.id;
        this.description="Description"
      }
   

    componentDidMount() { 
    this.fetchData().then(moviedetails => {
        this.setState({
        moviedetails,
        loading: false
        });
    });
    }
    render(){
        if (this.state.loading === true) {
            return (<div><h3>Details</h3><Loader /></div>);
          }
          const cast = this.state.moviedetails.cast.slice(0,5); // taking first 5 items
          const normalImageBaseUrl = "https://image.tmdb.org/t/p/w138_and_h175_face";
        return (
            <div className="card-container">
                {
                    cast.map((item, index)=>(
                        <div key={index} className="cast-item">
                          <img alt={item.id} src={normalImageBaseUrl+item.profile_path}/>
                          <h4 style={{color:'white'}}>{item.name}</h4>
                          <p>{item.character}</p>
                        </div>

                    ))
                }
            </div>
        )
    }
  
    fetchData() {
        return new Promise((res, rej) => {
        const URL = `https://api.themoviedb.org/3/movie/${this.movieId}/credits?api_key=e4c75b492f15901b665f2dddfc35b81a`;
        fetch(URL)
            .then(function(response) {
            return response.json();
            })
            .then(function(myJson) {
            Window.CreditsTimeOut = setTimeout(() => res(myJson), 2000);
            })
        });
    }

    componentWillUnmount(){
        clearTimeout(Window.timeOut1)
    }
}