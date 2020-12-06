import React from 'react';
import './App.css';
import axios from 'axios';

export default class App extends React.Component {
  state ={
    weather: [],
    iconLink: "http://openweathermap.org/img/wn/",
    iconEnd: "@2x.png",
    w: [],
    main: {},
    wind: {},
    time: new Date()
  }

  componentDidMount() {
    axios.get("http://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=3c9096d2cd102b2f073e60e7150d63f5")
    .then(res => {
      const weather = res.data;
      this.setState({ weather });
      this.setState({ w:weather.weather});
      this.setState({main: weather.main});
      this.setState({wind: weather.wind});
    })
  }


  render() {
    const divstyle = {
      background: "lightblue",
      padding: "100px",
      fontFamily: "Roboto",
      position: "relative",
      marginTop: "10%",
      marginLeft: "25%",
      marginRight: "25%",
      borderRadius: "50px",
      boxShadow: "0px 40px 40px -30px #080c21",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
      
    }
    return (
      <>
      <div style={divstyle }>
        <div>
          <p>{this.state.time.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month:"long", day:"numeric"})}</p>
          <h1>{this.state.weather.name}, {this.state.time.toLocaleTimeString("en-US", { hour12 : false, hour:  "2-digit", minute: "2-digit"})}</h1>
        </div>
       <div>
          {this.state.w.map(weather => 
            <div style={{ marginLeft: "50px", background: "white", borderRadius: "30px" }}>
              <img src={this.state.iconLink + weather.icon + this.state.iconEnd} />
            </div>
          )}
        </div>
        <div style={{ marginLeft: "50px"}}>
          <h3>t°: {this.state.main.temp | 0}° </h3>
          <h3>max/min t°: {this.state.main.temp_max | 0}°/{this.state.main.temp_min | 0}° </h3>
          <h3>Feels like: {this.state.main.feels_like | 0}°</h3>
          <h3>Wind: {this.state.wind.speed } m/s</h3>
        </div>
      </div>
      </>
    )
  }
}

;
