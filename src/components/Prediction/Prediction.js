import React, {Component} from 'react';
import './Prediction.css';
import {connect} from 'react-redux';
import {Well} from 'react-bootstrap';

class Prediction extends Component {
  render() {
    const prediction = this.props.prediction;
    let inside = "";

    if (prediction != null) {
      inside = "Prediction: " + parseFloat(prediction.value).toFixed(2);
    }
    else {
      inside = "Please fill form and click get price";
    }

    return (
        <Well className="Prediction" bsSize="large">{inside}</Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    prediction: state.loadPredictionReducer.prediction,
  };
}

export default connect(mapStateToProps)(Prediction);