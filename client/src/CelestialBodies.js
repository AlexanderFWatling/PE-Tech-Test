import React from 'react';


class CelestialBodies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }

  }

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
      this.setState({
        isLoaded: true,
        error
      });
    }
    )
  }

    render() {
      const {error, isLoaded, items} = this.state;
      if(error) {
        return <div>Error: {error.message} @ {error.stack}</div>
      } else if(!isLoaded){
        return <div>Loading...</div>
      } else {
        return (
          <table>
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
                <td key={item.ImgUrl}><img src={`${item.ImgUrl}`} alt={`Loading image for ${item.Name}`}/></td>
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
