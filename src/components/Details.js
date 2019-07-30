import React from 'react'
import Loader from '../components/loader/Loader'
class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            moviedetails: {}
          };
        Window.timeOut1 = {};
        this.fetchData = this.fetchData.bind(this); 
        const { params } = this.props.match
        this.movieId = params.id;
      }
   

    componentDidMount() {console.log('details')
    this.fetchData().then(moviedetails => {
        this.setState({
        moviedetails,
        loading: false
        });
    });
    }

    render() {
        if (this.state.loading === true) {
            return (<div><h3>Details</h3><Loader /></div>);
          }
        const moviedetails = this.state.moviedetails;
        const imageBaseUrl = "https://image.tmdb.org/t/p/w1400_and_h450_bestv2/";
        const normalImageBaseUrl = "http://image.tmdb.org/t/p/w185/";
        return (
        <div className="details-container">
            <div className="cover-image-bg" style={{backgroundImage: `url(${imageBaseUrl+moviedetails.backdrop_path}` }}>
            <img alt={moviedetails.original_title} src={normalImageBaseUrl+moviedetails.poster_path} className="card-image details-short-image"/>
            <h3 className="details-short-image align-below">{moviedetails.original_title}</h3>
            </div>
        </div>)
    }

  
    fetchData() {
        return new Promise((res, rej) => {
        const URL = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=e4c75b492f15901b665f2dddfc35b81a&language=en-US`;
        fetch(URL)
            .then(function(response) {
            return response.json();
            })
            .then(function(myJson) {
            Window.timeOut1 = setTimeout(() => res(myJson), 2000);
            })
        });
    }

    componentWillUnmount(){
        clearTimeout(Window.timeOut1)
    }
}
export default Details