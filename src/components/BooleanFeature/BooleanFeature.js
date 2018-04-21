import './BooleanFeature.css';
import React, {Component} from 'react';
import {store} from '../../index';
import {changeFeatureValue} from '../../actions/actions';
import {Checkbox} from 'react-bootstrap';

class BooleanFeature extends Component {
  render() {
    const featureName = this.props.feature.featureName;

    return (
        <Checkbox
            className="BooleanFeature-label"
            onChange={(e) =>
                store.dispatch(changeFeatureValue(
                    featureName, e.target.checked))}>
          {featureName}
        </Checkbox>
    );
  }
}

export default BooleanFeature;