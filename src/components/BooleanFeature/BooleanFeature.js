import './BooleanFeature.css';
import React, {Component} from 'react';
import {changeFeatureValue} from '../../actions/actions';
import {Checkbox} from 'react-bootstrap';
import {connect} from 'react-redux';

class BooleanFeature extends Component {
  render() {
    const featureName = this.props.feature.featureName;

    return (
        <Checkbox
            className="BooleanFeature-label"
            onChange={(e) =>
                this.props.changeFeatureValue(
                    featureName, e.target.checked)}>
          {featureName}
        </Checkbox>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeFeatureValue: (name, value) => {
      dispatch(changeFeatureValue(name, value));
    },
  };
};

export default BooleanFeature = connect(
    null,
    mapDispatchToProps,
)(BooleanFeature);
