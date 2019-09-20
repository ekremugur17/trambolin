import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Colxx } from "../../components/common/CustomBootstrap";
import Alert from "../../components/Alert";
import { setAlert, clearAlerts, login } from '../../redux/actions';

import IntlMessages from "../../helpers/IntlMessages";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.email ? localStorage.email : "",
      password: ""
    };
  }

  onUserLogin() {
    this.props.clearAlerts();
    this.props.login(this.state);
  }

  render() {
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">SİHİR DETAYLARDA SAKLI</p>
              <p className="white mb-0">
                Lütfen üyelik bilgilerinizi kullanarak giriş yapın.
              </p>
            </div>
            <div className="form-side">
              <NavLink to={`/`} className="white">
                <span className="logo-single" />
              </NavLink>
              <CardTitle className="mb-3" style={{ marginTop: '6rem' }}>
                <IntlMessages id='Hoşgeldiniz' />
              </CardTitle>
              <Alert />
              <Form>
                <Label className="form-group has-float-label mb-4">
                  <Input type="email" defaultValue={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                  <IntlMessages id="E-Posta" />
                </Label>
                <Label className="form-group has-float-label mb-4">
                  <Input type="password" onChange={(e) => this.setState({ password: e.target.value })} />
                  <IntlMessages
                    id="Şifre"
                  />
                </Label>
                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to={`/user/forgot-password`}>
                    <IntlMessages id="Şifremi Unuttum" />
                  </NavLink>
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={() => this.onUserLogin()}
                  >
                    <IntlMessages id="Giriş Yap" />
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Colxx>
      </Row >
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, clearAlerts, login })(Login);