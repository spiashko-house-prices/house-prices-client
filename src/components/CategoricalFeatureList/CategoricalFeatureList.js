import './CategoricalFeatureList.css';
import React, {Component} from 'react';
import CategoricalFeature from '../CategoricalFeature/CategoricalFeature';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

class CategoricalFeatureList extends Component {
  render() {
    const features = this.props.features;
    const listItems = features.map((feature) =>
        <ListGroupItem className="CategoricalFeatureList-item" key={feature.featureName}>
          <CategoricalFeature feature={feature}/>
        </ListGroupItem>,
    );

    return (
        <ListGroup className="CategoricalFeatureList">
          {listItems}
        </ListGroup>
    );
  }
}

export default CategoricalFeatureList;