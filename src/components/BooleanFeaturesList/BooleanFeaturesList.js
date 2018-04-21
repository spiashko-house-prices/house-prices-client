import './BooleanFeaturesList.css';
import React, {Component} from 'react';
import BooleanFeature from '../BooleanFeature/BooleanFeature';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class BooleanFeaturesList extends Component {
  render() {
    const features = this.props.features;
    const listItems = features.map((feature) =>
        <ListGroupItem  key={feature.featureName}>
          <BooleanFeature feature={feature}/>
        </ListGroupItem>,
    );

    return (
        <ListGroup className="BooleanFeatureList">
          {listItems}
        </ListGroup>
    );
  }
}

export default BooleanFeaturesList;