//Dependencies
import React, { Component } from "react";
import { Grid, Col, Row } from "react-flexbox-grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
//Assets
import "./App.css";
import LocationListContainer from "./Containers/LocationListContainer";
import ForecastExtendedContainer from "./Containers/ForecastExtendedContainer";
import { cities } from "./Constants/cities";

class App extends Component {
  render() {
    console.log("Inicio Render");
    return (
      <Grid>
        <Row>
          <AppBar position="sticky">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Weather App
              </Typography>
            </Toolbar>
          </AppBar>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <LocationListContainer cities={cities} />
          </Col>
          <Col xs={12} md={6}>
            <Paper elevation={4}>
              <div className="details">
                <ForecastExtendedContainer />
              </div>
            </Paper>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
