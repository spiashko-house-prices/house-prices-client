import React, {Component} from 'react';
import './App.css';
import {store} from './index';
import {loadingModel, loadModel, loadPrediction} from './actions/actions';
import BooleanFeaturesList
  from './components/BooleanFeaturesList/BooleanFeaturesList';
import {connect} from 'react-redux';
import {Button, Col, Grid, Row, Tab, Tabs} from 'react-bootstrap';
import CategoricalFeatureList
  from './components/CategoricalFeatureList/CategoricalFeatureList';
import NumericalFeatureList
  from './components/NumericalFeatureList/NumericalFeatureList';
import Prediction from './components/Prediction/Prediction';

const backend = process.env.REACT_APP_BACKEND;

class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    store.dispatch(loadingModel());

    let myInit = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-store',
    };

    fetch(backend + '/api/model', myInit).
        then(data => data.json()).
        then(data => {
          console.log('model: ', data);
          store.dispatch(loadModel(data));
        }).
        catch(error => {
          console.log('There has been a problem with your fetch operation: ' +
              error.message);
        });

  }

  handleClick() {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let myInit = {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'no-store',
      body: JSON.stringify(this.props.submissionForm),
    };
    console.log('form submission data', this.props.submissionForm);

    fetch(backend + '/api/predict', myInit).
        then(data => data.json()).
        then(data => {
          console.log('prediction: ', data);
          store.dispatch(loadPrediction(data));
        }).
        catch(error => {
          console.log('There has been a problem with your fetch operation: ' +
              error.message);
        });
  }

  render() {

    if (this.props.status === 'empty') return null;
    if (this.props.status === 'loading') {
      return (
          <h1>Loading...</h1>
      );
    }

    const model = this.props.model;

    return (
        <div className="App">
          <header className="App-header">
          </header>
          <div className="App-body">
            <Grid>
              <Row>
                <Col md={4} mdOffset={4}>
                  <Tabs defaultActiveKey={2} id="main-tab">
                    <Tab eventKey={1} title="Categorical">
                      <CategoricalFeatureList features={model.categorical}/>
                    </Tab>
                    <Tab eventKey={2} title="Boolean">
                      <BooleanFeaturesList features={model.boolean}/>
                    </Tab>
                    <Tab eventKey={3} title="Numerical">
                      <NumericalFeatureList features={model.numerical}/>
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
              <Row>
                <Col md={4} mdOffset={4}>
                  <Button bsSize="large" bsStyle="primary"
                          onClick={this.handleClick}>
                    Get price
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={4} mdOffset={4}>
                  <Prediction/>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    model: state.loadReducer.model,
    status: state.loadReducer.status,
    submissionForm: state.formReducer.submissionForm,
  };
}

export default connect(mapStateToProps)(App);
