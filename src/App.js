import React, { Component } from "react";

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
      `http://localhost:8000/api/v1/flickr?tag=${this.state.tag}&page=${this.page}`
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
      `http://localhost:8000/api/v1/flickr?tag=${this.state.tag}&page=${this.page}`
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
      <form onSubmit={this.handleSubmit}>
        <input
          label="Search Image"
          icon="search"
          onChange={this.handleChange}
          type="text"
        ></input>
        <button>Send data!</button>
        <ul>
          {items.data.map((item, index) => (
            <img key={index} src={item} />
          ))}
        </ul>
      </form>
    );
  }
}

export default App;
