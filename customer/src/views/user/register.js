import React, { Component } from "react";
import { Row, Card, CardTitle, Form, Label, Input, Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx } from "../../components/common/CustomBootstrap";
import { setAlert, clearAlerts } from "../../redux/alert/actions";
import Alert from "../../components/Alert";
import { register } from "../../redux/auth/actions";

const RegisterPersonal = (props) => {
  const { values, handleChange } = props;
  return (
    <div>
      <CardTitle className="mb-3" >
        <IntlMessages id="Kisisel Bilgiler" />
      </CardTitle>
      <Form>
        <Label className="form-group has-float-label mb-4">
          <Input type="name" defaultValue={values.name} onChange={handleChange('name')} />
          <IntlMessages id="Tam Ad" />
        </Label>
        <Label className="form-group has-float-label mb-4">
          <Input type="email" defaultValue={values.email} onChange={handleChange('email')} />
          <IntlMessages id="E-Posta" />
        </Label>
        <Label className="form-group has-float-label mb-4">
          <Input type="password" defaultValue={values.password} onChange={handleChange('password')} />
          <IntlMessages
            id="Şifre"
          />
        </Label>
        <Label className="form-group has-float-label mb-4">
          <Input type="phone" defaultValue={values.phone} onChange={handleChange('phone')} />
          <IntlMessages
            id="Telefon Numarası"
          />
        </Label>
      </Form>
      <div className="d-flex justify-content-end align-items-center">
        <Button
          color="primary"
          className="btn-shadow"
          size="lg"
          onClick={() => props.nextStep()}
        >
          <IntlMessages id="Devam Et" />
        </Button>
      </div>
    </div>
  )
}

const RegisterCorporal = (props) => {
  const { values, handleChange } = props;
  return (
    <div>
      <CardTitle className="mb-3" >
        <IntlMessages id="Sirket Bilgileri" />
      </CardTitle>
      <Form>
        <Label className="form-group has-float-label mb-4">
          <Input type="text" defaultValue={values.company} onChange={handleChange('company')} />
          <IntlMessages id="Sirket Yasal Adi" />
        </Label>
        <Label className="form-group has-float-label mb-4">
          <Input type="text" defaultValue={values.address1} onChange={handleChange('address1')} />
          <IntlMessages id="Sirket Acik Adresi" />
        </Label>
        <Label className="form-group has-float-label mb-4">
          <Input type="text" defaultValue={values.address2} onChange={handleChange('address2')} />
          <IntlMessages
            id="Fatura Adresi"
          />
        </Label>
        <Label className="form-group has-float-label mb-4">
          <Input type="text" defaultValue={values.address3} onChange={handleChange('address3')} />
          <IntlMessages
            id="Kargo Adresi"
          />
        </Label>
      </Form>
      <div className="d-flex justify-content-end align-items-center">
        <div className="mr-3">
          <Button
            color="primary"
            className="btn-shadow"
            size="lg"
            onClick={() => props.prevStep()}
          >
            <IntlMessages id="Geri Don" />
          </Button>
        </div>
        <div>
          <Button
            color="primary"
            className="btn-shadow"
            size="lg"
            onClick={() => props.nextStep()}
          >
            <IntlMessages id="Devam Et" />
          </Button>
        </div>
      </div>
    </div>
  )
}

const RegisterCorporalFiles = (props) => {
  const { values, handleChange, onFileSelect } = props;
  return (
    <div>
      <Modal isOpen={props.kvkk} toggle={props.toggleKVKK}>
        <ModalHeader toggle={props.toggleKVKK}>KVKK title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggleKVKK}>geri don</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={props.tos} toggle={props.toggleTOS}>
        <ModalHeader toggle={props.toggleTOS}>TOS title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggleTOS}>geri don</Button>
        </ModalFooter>
      </Modal>
      <CardTitle className="mb-3" >
        <IntlMessages id="Sirket Bilgileri 2" />
      </CardTitle>
      <Form>
        <Label className="form-group has-float-label mb-4">
          <Input type="text" defaultValue={values.tuzelName} onChange={handleChange('tuzelName')} />
          <IntlMessages id="Tuzel Kisilik Adi" />
        </Label>
        <Label className="form-group has-float-label mb-3">
          <Input type="select" name="select" id="exampleSelect" onChange={handleChange('varlikTipi')}>
            <option>Limited/Anonim</option>
            <option>Kisisel</option>
          </Input>
          <IntlMessages id="Varlik Tipi" />
        </Label>
        <Label className="form-group has-float-label mb-3">
          <p>Vergi Levhasi</p>
          <Input type="file" name='image1' onChange={onFileSelect} />
        </Label>
        <Label className="form-group has-float-label mb-3">
          <p>Yetki Belgesi</p>
          <Input type="file" name='image2' onChange={onFileSelect} />
        </Label>
        <Label className="form-group has-float-label mt-2 mb-3 ml-4 justify-content-center">
          <Input type="checkbox" name='check' value={props.checkbox} onChange={() => props.handleCheck()} />
          <h5><a onClick={(e) => {
            e.preventDefault();
            props.toggleKVKK();
          }} href="/#!">KVKK</a> ve <a onClick={(e) => {
            e.preventDefault();
            props.toggleTOS();
          }}
            href="/#!">Hizmet</a> sozlesmelerini okudum ve kabul ediyorum.</h5>
        </Label>
      </Form>
      <Alert />
      <div className="d-flex justify-content-end align-items-center">
        <div className="mr-3">
          <Button
            color="primary"
            className="btn-shadow"
            size="lg"
            onClick={() => props.prevStep()}
          >
            <IntlMessages id="Geri Don" />
          </Button>
        </div>
        <div>
          <Button
            color="primary"
            className="btn-shadow"
            size="lg"
            onClick={() => props.onUserRegister()}
          >
            <IntlMessages id="Tamamla" />
          </Button>
        </div>
      </div>
    </div >
  )
}



class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      name: "",
      email: "",
      password: "",
      phone: "+90",
      company: "",
      staffNum: 0,
      address1: "",
      address2: "",
      address3: "",
      tuzelName: "",
      varlikTipi: "Limited/Anonim",
      image1: null,
      image2: null,
      checkbox: false,
      kvkk: false,
      tos: false
    };
  }

  prevStep = () => {
    const { step } = this.state;
    this.props.clearAlerts();
    this.setState({
      step: step - 1
    });
  };

  nextStep = () => {
    const { step } = this.state;
    this.props.clearAlerts();
    this.setState({
      step: step + 1
    });
  };

  handleCheck = () => {
    this.setState({ checkbox: !this.state.checkbox })
  }

  toggleKVKK = () => {
    this.setState({ kvkk: !this.state.kvkk });
  }

  toggleTOS = () => {
    this.setState({ tos: !this.state.tos });
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  onFileSelect = event => {
    if (event.target.name === 'image1') this.setState({ image1: event.target.files[0] });
    else this.setState({ image2: event.target.files[0] });
  };

  onUserRegister = async () => {
    await this.props.clearAlerts();
    await this.props.register(this.state);
  }

  render() {
    const { step, name, email, password, phone, company, staffNum, address1, address2, address3, varlikTipi, tuzelName } = this.state;
    const values = { name, email, password, phone, company, staffNum, address1, address2, address3, varlikTipi, tuzelName }
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
              {step === 1 ? <RegisterPersonal nextStep={this.nextStep} prevStep={this.prevStep} values={values} handleChange={this.handleChange} /> : step === 2 ? <RegisterCorporal nextStep={this.nextStep} prevStep={this.prevStep} values={values} handleChange={this.handleChange} /> : step === 3 ? <RegisterCorporalFiles nextStep={this.nextStep} prevStep={this.prevStep} values={values} handleChange={this.handleChange} onFileSelect={this.onFileSelect} onUserRegister={this.onUserRegister} checkbox={this.state.checkbox} handleCheck={this.handleCheck} kvkk={this.state.kvkk} toggleKVKK={this.toggleKVKK} tos={this.state.tos} toggleTOS={this.toggleTOS} /> : null}
            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

export default connect(null, { setAlert, clearAlerts, register })(Register);