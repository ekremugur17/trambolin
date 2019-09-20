import React, { Fragment } from 'react'
import {
  Row,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import { Separator, Colxx } from '../components/common/CustomBootstrap';

class complete extends React.Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>Kutu Aboneliği</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle className="mb-5">Kendinize en uygun plani secin!</CardTitle>
                <div className="pricingBox">
                  <div className="pricingCard first text-center">
                    <div className="pricingTitle">
                      <i className="fas fa-box"></i>
                      <h2>Basic</h2>
                    </div>
                    <div className="pricingPrice">
                      <h4>
                        <sup>₺</sup>10<sub>/Ay</sub>
                      </h4>
                    </div>
                    <div className="pricingOption">
                      <ul>
                        <li><i className="fas fa-check"></i>{' '}FEATURE</li>
                        <li><i className="fas fa-times"></i>{' '}FEATURE</li>
                        <li><i className="fas fa-times"></i>{' '}FEATURE</li>
                      </ul>
                    </div>
                    <a href="#!">Choose</a>
                  </div>
                  <div className="pricingCard second text-center">
                    <div className="pricingTitle">
                      <i className="fas fa-gifts"></i>
                      <h2>Premium</h2>
                    </div>
                    <div className="pricingPrice">
                      <h4>
                        <sup>₺</sup>25
                    </h4>
                    </div>
                    <div className="pricingOption">
                      <ul>
                        <li><i className="fas fa-check"></i>{' '}FEATURE</li>
                        <li><i className="fas fa-check"></i>{' '}FEATURE</li>
                        <li><i className="fas fa-check"></i>{' '}FEATURE</li>
                      </ul>
                    </div>
                    <a href="#!">Choose</a>
                  </div>
                  <div className="pricingCard third text-center">
                    <div className="pricingTitle">
                      <i className="fas fa-boxes"></i>
                      <h2>Standard</h2>
                    </div>
                    <div className="pricingPrice">
                      <h4>
                        <sup>₺</sup>20
                    </h4>
                    </div>
                    <div className="pricingOption">
                      <ul>
                        <li><i className="fas fa-check"></i>{' '}FEATURE</li>
                        <li><i className="fas fa-check"></i>{' '}FEATURE</li>
                        <li><i className="fas fa-times"></i>{' '}FEATURE</li>
                      </ul>
                    </div>
                    <a href="#!">Choose</a>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

export default complete