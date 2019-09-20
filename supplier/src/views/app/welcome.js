import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import { setAlert, clearAlerts, loadUser } from '../../redux/actions';

class Start extends Component {
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>Welcome to Trambolin</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4">
            Welcome
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    loading: auth.loading
  }
}

export default connect(mapStateToProps, { setAlert, clearAlerts, loadUser })(Start);
