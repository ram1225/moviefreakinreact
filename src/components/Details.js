import React from 'react'
import Loader from '../components/loader/Loader'
class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            moviedetails: {}
          };
        Window.timeOut = {};
        this.fetchData = this.fetchData.bind(this); 
        const { params } = this.props.match
        this.movieId = params.id;
      }
   

    componentDidMount() {
    this.fetchData().then(moviedetails => {
        this.setState({
        moviedetails,
        loading: false
        });
    });
    }

    render() {
        if (this.state.loading === true) {
            return (<div> <h3>Movie Details</h3><Loader /></div>);
          }
      
        return <h3>{
            JSON.stringify(this.state.moviedetails)
        }</h3>
    }

  
    fetchData() {
        return new Promise((res, rej) => {
        const URL = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=e4c75b492f15901b665f2dddfc35b81a&language=en-US`;
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
}
export default Details