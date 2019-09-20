import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  render() {
    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">SİHİR DETAYLARDA SAKLI</p>
              <p className="white mb-0">
                Şifrenizi sıfırlamak için e-postanızı kullanın. <br />
                Eğer üye değilseniz, üye olmak için{" "}
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
              <CardTitle className="mb-4">
                <IntlMessages id="Şifremi Unuttum" />
              </CardTitle>
              <Form>
                <Label className="form-group has-float-label mb-4">
                  <Input type="email" defaultValue={this.state.email} />
                  <IntlMessages id="user.email" />
                </Label>

                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    href="/app"
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                  >
                    <IntlMessages id="Gönder" />
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}
