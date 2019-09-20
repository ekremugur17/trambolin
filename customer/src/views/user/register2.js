import React, { Component } from "react";
import { Row, Card } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Colxx } from "../../components/common/CustomBootstrap";
import { setAlert, clearAlerts } from "../../redux/alert/actions";
import { register } from "../../redux/auth/actions";
import LastStepEnd from '../../containers/wizard/LastStepEnd';
import Alert from '../../components/Alert';

class Register extends Component {
  onSubmit = (state) => {
    this.props.clearAlerts();
    this.props.register(state);
  };

  render() {
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">SİHİR DETAYLARDA SAKLI</p>
              <p className="white mb-0">
                Lütfen bu formu kullanarak kayıt olun <br />
                Zaten bir üyeliğiniz varsa giriş yapmak için{" "}
                <NavLink to={`/user/login`} className="white">
                  tıklayın
                </NavLink>
                .
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <Alert />
              <LastStepEnd onSubmit={this.onSubmit} />
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

export default connect(null, { setAlert, clearAlerts, register })(Register);