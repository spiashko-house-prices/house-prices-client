import './CategoricalFeature.css';
import React, {Component} from 'react';
import {store} from '../../index';
import {changeFeatureValue} from '../../actions/actions';
import {Col, ControlLabel, FormControl, FormGroup, Row} from 'react-bootstrap';

class CategoricalFeature extends Component {
  render() {
    const feature = this.props.feature;

    const featureName = feature.featureName;
    const values = feature.values;

    const listOptions = values.map((value) =>
        <option key={value} value={value}>{value}</option>,
    );

    return (
        <Row>
          <FormGroup>
            <Col lg={5} md={5} sm={5}>
              <ControlLabel className="CategoricalFeature-label">
                {featureName}
              </ControlLabel>
            </Col>
            <Col lg={7} md={7} sm={7}>
              <FormControl
                  className="CategoricalFeature-select"
                  componentClass="select"
                  defaultValue={values[0]}
                  onChange={(e) =>
                      store.dispatch(
                          changeFeatureValue(featureName, e.target.value))}>
                {listOptions}
              </FormControl>
            </Col>
          </FormGroup>
        </Row>
    );
  }
}

export default CategoricalFeature;