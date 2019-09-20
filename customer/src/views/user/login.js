import React, { Component, Fragment } from "react";
import { Row, Card, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Colxx } from "../../components/common/CustomBootstrap";
import Alert from "../../components/Alert";
import { Redirect } from 'react-router-dom';
import { setAlert, clearAlerts, login } from '../../redux/actions';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import IntlMessages from "../../helpers/IntlMessages";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.email ? localStorage.email : "",
      password: "",
      loggingIn: false
    };
  }

  onUserLogin = async (e) => {
    e.preventDefault();
    await this.setState({ loggingIn: true });
    await this.props.clearAlerts();
    await this.props.login(this.state);
    await this.setState({ loggingIn: false });
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/app" />
    }
    return (
      <Fragment>
        {(this.state.loggingIn || this.props.loading) && <LoadingSpinner />}
        <Row className="h-100">
          <Colxx xxs="12" md="10" className="mx-auto my-auto">
            <Card className="auth-card">
              <div className="position-relative image-side ">
                <p className="text-white h2">HOŞGELDİNİZ</p>
                <p className="white mb-0">
                  Lütfen üyelik bilgilerinizi kullanarak giriş yapın.
                <br />
                  Hala üye değilseniz, üye olmak için{" "}
                  <NavLink to={`/user/register`} className="white">
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
                <Form onSubmit={(this.onUserLogin)}>
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
                      type="submit"
                      size="lg"
                    >
                      <IntlMessages id="Giriş Yap" />
                    </Button>
                  </div>
                </Form>
              </div>
            </Card>
          </Colxx>
        </Row >
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  isValidated: auth.user ? auth.user.validation : null,
  loading: auth.loading
});

export default connect(mapStateToProps, { setAlert, clearAlerts, login })(Login);