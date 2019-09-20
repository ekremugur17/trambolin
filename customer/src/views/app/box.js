import React, { Component, Fragment } from 'react'
import { Row, CardTitle } from "reactstrap";
import { Separator, Colxx } from '../../components/common/CustomBootstrap';
import { connect } from 'react-redux';
import { clearAlerts } from '../../redux/actions';
import PriceCard from '../../components/cards/PriceCard';
import { priceData } from '../../constants/defaultValues';

class box extends Component {
  componentDidMount() {
    this.props.clearAlerts();
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>Kutu Aboneliği</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row className="equal-height-container mb-5">
          <Colxx xxs="12">
            <CardTitle className="mb-5">Kendinize en uygun planı seçin!</CardTitle>
          </Colxx>
          {priceData.map((item, index) => (
            <Colxx md="12" lg="4" className="col-item mb-4" key={index}>
              <PriceCard data={item} />
            </Colxx>))}
        </Row>
      </Fragment>
    )
  }
}

export default connect(null, { clearAlerts })(box);

// <div className="pricingBox">
//                   <div className="pricingCard first text-center">
//                     <div className="pricingTitle">
//                       <i className="fas fa-box"></i>
//                       <h2>Basic</h2>
//                     </div>
//                     <div className="pricingPrice">
//                       <h4>
//                         <sup>₺</sup>10<sub>/Ay</sub>
//                       </h4>
//                     </div>
//                     <div className="pricingOption">
//                       <ul>
//                         <li><i className="fas fa-check"></i>{' '}FEATURE</li>
//                         <li><i className="fas fa-times"></i>{' '}FEATURE</li>
//                         <li><i className="fas fa-times"></i>{' '}FEATURE</li>
//                       </ul>
//                     </div>
//                     <a href="#!">Choose</a>
//                   </div>
//                   <div className="pricingCard second text-center">
//                     <div className="pricingTitle">
//                       <i className="fas fa-gifts"></i>
//                       <h2>Premium</h2>
//                     </div>
//                     <div className="pricingPrice">
//                       <h4>
//                         <sup>₺</sup>25
//                       </h4>
//                     </div>
//                     <div className="pricingOption">
//                       <ul>
//                         <li><i className="fas fa-check"></i>{' '}FEATURE</li>
//                         <li><i className="fas fa-check"></i>{' '}FEATURE</li>
//                         <li><i className="fas fa-check"></i>{' '}FEATURE</li>
//                       </ul>
//                     </div>
//                     <a href="#!">Choose</a>
//                   </div>
//                   <div className="pricingCard third text-center">
//                     <div className="pricingTitle">
//                       <i className="fas fa-boxes"></i>
//                       <h2>Standard</h2>
//                     </div>
//                     <div className="pricingPrice">
//                       <h4>
//                         <sup>₺</sup>20
//                       </h4>
//                     </div>
//                     <div className="pricingOption">
//                       <ul>
//                         <li><i className="fas fa-check"></i>{' '}FEATURE</li>
//                         <li><i className="fas fa-check"></i>{' '}FEATURE</li>
//                         <li><i className="fas fa-times"></i>{' '}FEATURE</li>
//                       </ul>
//                     </div>
//                     <a href="#!">Choose</a>
//                   </div>
//                 </div>