import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LocationList from "../Components/LocationList";
import * as actions from "../actions";
import { setWeather, setSelectedCity } from "../actions";
import { getWeatherCities, getCity } from "./../reducers";

class LocationListContainer extends Component {
  componentDidMount() {
    const { setCity, setWeather, cities, city } = this.props;
    setWeather(cities);
    setCity(city);
  }

  handleSelectedLocation = city => {
    console.log(city, " Se presiono HandleSelectedLocation");
    this.props.setCity(city);
  };

  render() {
    return (
      <div>
        <LocationList
          cities={this.props.citiesWeather}
          onSelectedLocation={this.handleSelectedLocation}
        />
      </div>
    );
  }
}

LocationListContainer.propTypes = {
  /* setSelectedCity: PropTypes.func.isRequired, */
  setCity: PropTypes.func.isRequired,
  setWeather: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
  citiesWeather: PropTypes.array,
  city: PropTypes.string.isRequired
};

/* const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch); */
const mapDispatchToProps = dispatch => ({
  // aqui el dispatch lo toma del store gracias a que usamos connect
  setCity: value => dispatch(setSelectedCity(value)), //no es mas que un objeto que tiene una propiedad function para poder equivalerla a la action y dispatch mediante connect
  setWeather: cities => dispatch(setWeather(cities))
});

const mapStateToProps = state => ({
  citiesWeather: getWeatherCities(state),
  city: getCity(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationListContainer);
