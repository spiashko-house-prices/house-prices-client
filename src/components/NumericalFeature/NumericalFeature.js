import './NumericalFeature.css';
import React, {Component} from 'react';
import {store} from '../../index';
import {changeFeatureValue} from '../../actions/actions';
import {Col, ControlLabel, FormControl, FormGroup, Row} from 'react-bootstrap';

class NumericalFeature extends Component {
  render() {
    const feature = this.props.feature;

    const featureName = feature.featureName;
    const max = feature.max;
    const min = feature.min;
    const step = 1 / Math.pow(10, feature.type === 'int' ? 0 : 2);
    return (
        <Row>
          <FormGroup>
            <Col lg={5} md={5} sm={5}>
              <ControlLabel className="NumericFeature-label">
                {featureName}
              </ControlLabel>
            </Col>
            <Col lg={7} md={7} sm={7}>
              <FormControl
                  className="NumericFeature-input"
                  min={min}
                  max={max}
                  defaultValue={min}
                  step={step}
                  onChange={() => {
                    if (this.inputNumber.value <= max) {
                      if (this.inputNumber.value === '') {
                        this.inputNumber.value = min;
                      }
                      else {
                        store.dispatch(
                            changeFeatureValue(
                                featureName,
                                parseFloat(this.inputNumber.value)));
                      }
                    }
                    else {
                      this.inputNumber.value = max;
                    }
                  }}
                  inputRef={inputNumber => this.inputNumber = inputNumber}
                  type="number"
              />
            </Col>
          </FormGroup>
        </Row>
    );
  }
}

export default NumericalFeature;