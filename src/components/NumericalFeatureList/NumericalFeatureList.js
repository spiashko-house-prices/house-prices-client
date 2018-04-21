import './NumericalFeatureList.css';
import React, {Component} from 'react';
import NumericalFeature from '../NumericalFeature/NumericalFeature';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class NumericalFeatureList extends Component {
  render() {
    const features = this.props.features;
    const listItems = features.map((feature) =>
        <ListGroupItem key={feature.featureName}>
          <NumericalFeature feature={feature}/>
        </ListGroupItem>,
    );

    return (
        <ListGroup className="NumericalFeatureList">
          {listItems}
        </ListGroup>
    );
  }
}

export default NumericalFeatureList;