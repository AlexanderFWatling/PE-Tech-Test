import React from 'react';
import './CelestialBodies.css';


class CelestialBodies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }

  }
//when the component has mounted call the api and update state accordingly
  componentDidMount(){
    fetch("api/bodies")
    .then(res => res.json())
    .then( (result) => {
        this.setState({
          isLoaded: true,
          items: result
        })
    },
    (error) => {
      console.log(error)
      this.setState({
        isLoaded: true,
        error
      });
    }
    )
  }
//render based on state
    render() {
      const {error, isLoaded, items} = this.state;
      if(error) {
        return <div>Error: {error.message} @ {error.stack}</div>
      } else if(!isLoaded){
        return <div role="loading">Loading...</div>
      } else {
        return (
          <table className="BodiesTable">
          <caption>Celestial Bodies</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Age</th>
                <th>Solar Mass ( x10<sup>-6</sup> )</th>
              </tr>
            </thead>
            <tbody>
            {items.map(item => (
              <tr key={item.Name}>
                <td key={item.Name}>{item.Name}</td>
                <td key={item.ImgUrl}><img src={`${item.ImgUrl}`}/></td>
                <td key={item.Age}>{item.Age}</td>
                <td key={item.SolarMass}>{item.SolarMass}</td>
              </tr>
            ))}
            </tbody>

            </table>
        )
      }
    }
}

export default CelestialBodies;
