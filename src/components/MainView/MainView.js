import React, {Component} from 'react';
import {
  loadingModel,
  loadModel,
  loadPrediction,
} from '../../actions/actions';
import {Button, Col, Grid, Row, Tab, Tabs} from 'react-bootstrap';
import './MainView.css';
import {connect} from 'react-redux';
import Prediction from '../Prediction/Prediction';
import CategoricalFeatureList
  from '../CategoricalFeatureList/CategoricalFeatureList';
import BooleanFeaturesList from '../BooleanFeaturesList/BooleanFeaturesList';
import NumericalFeatureList from '../NumericalFeatureList/NumericalFeatureList';

class MainView extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.performLoading = this.performLoading.bind(this);
  }

  componentDidMount() {
    this.performLoading(this.props.dataset);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataset !== nextProps.dataset) {
      this.performLoading(nextProps.dataset);
    }
  }

  performLoading(dataset) {
    this.props.loadingModel();

    let {backend} = dataset;

    let myInit = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-store',
    };

    fetch(backend + '/api/model', myInit).
        then(data => data.json()).
        then(data => {
          console.log('model: ', data);
          this.props.loadModel(data);
        }).
        catch(error => {
          console.log('There has been a problem with your fetch operation: ' +
              error.message);
        });

  }

  handleClick() {
    let {backend} = this.props.dataset;

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

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
          this.props.loadPrediction(data);
        }).
        catch(error => {
          console.log('There has been a problem with your fetch operation: ' +
              error.message);
        });
  }

  render() {
    if (this.props.status === 'loading') {
      return (<h1>Loading...</h1>);
    }
    return (
        <Grid>
          <Row>
            <Col md={4} mdOffset={4}>
              <Tabs defaultActiveKey={3} id="main-tab">
                <Tab eventKey={1} title="Categorical">
                  <CategoricalFeatureList
                      features={this.props.model.categorical}/>
                </Tab>
                <Tab eventKey={2} title="Boolean">
                  <BooleanFeaturesList features={this.props.model.boolean}/>
                </Tab>
                <Tab eventKey={3} title="Numerical">
                  <NumericalFeatureList features={this.props.model.numerical}/>
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
        </Grid>);
  }
}

const mapStateToProps = state => {
  return {
    model: state.loadReducer.model,
    status: state.loadReducer.status,
    submissionForm: state.formReducer.submissionForm,
    dataset: state.datasetReducer.dataset,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadModel: (data) => {dispatch(loadModel(data));},
    loadingModel: () => {dispatch(loadingModel());},
    loadPrediction: (data) => {dispatch(loadPrediction(data));},
  };
};

export default MainView = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MainView);
