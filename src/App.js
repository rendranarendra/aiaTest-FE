import React, { Component } from "react";
import './App.css'
import Logo from './img/FlickrIcon.svg'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      tag: "batam",
      page: 1,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(
      `https://aia-project.herokuapp.com/api/v1/flickr?tag=${this.state.tag}&page=${this.page}`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    fetch(
      `https://aia-project.herokuapp.com/api/v1/flickr?tag=${this.state.tag}&page=${this.page}`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (e) => {
    this.setState({
      tag: e.target.value,
    });
  };

  render() {
    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div className="container-photo">
        <img src={Logo} alt="home" className="logo"/>
        </div>
      <form 
      onSubmit={this.handleSubmit}
      className="container"
      >
        <input
          label="Search Image"
          icon="search"
          onChange={this.handleChange}
          type="text"
          className="input"
         
        ></input>
        <button>Send data!</button>
        <ul>
          {items.data.map((item, index) => (
            <img key={index} src={item} />
          ))}
        </ul>
      </form>
      </div>
    );
  }
}

export default App;
