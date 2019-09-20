import React, { Component, Fragment } from "react";
import { Row, Modal, ModalBody, ModalHeader, Button, Input, Card, CardBody, FormGroup, Label, Form } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import { ReactTableAdvancedCard } from '../../containers/ReactTableCards';
import axios from 'axios';
import { setAlert, clearAlerts } from '../../redux/actions';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import IntlMessages from "../../helpers/IntlMessages";

class ViewStaff extends Component {
  state = {
    staff: [],
    loading: true,
    name: "",
    email: "",
    phone: "",
    department: "",
    modal: false
  }

  onSubmit = async () => {
    this.setState({ loading: true });
    const { name, email, phone, department } = this.state;
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const newPhone = phone.substr(0, 3) === '+90' ? phone : phone[0] === 0 ? '+9' + phone : '+90' + phone;
    const body = JSON.stringify({ name, email, phone: newPhone, department })
    try {
      const tempPW = await axios.post('http://34.219.165.177:5000/api/staff', body, config);
      await axios.post('http://34.219.165.177:5000/api/sms', JSON.stringify({ password: tempPW.data, phone: newPhone }), config);
      this.props.setAlert('Personel başarıyla eklendi', 'success', 5000);
      this.setState({ name: '', email: '', phone: '', department: '' })
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach(error => this.props.setAlert(error.msg, 'danger', 8000));
      }
    }
    this.setState({ loading: false });
    this.getStaff();
    this.toggleModal();
  }

  toggleModal = () => {
    if (this.props.isVerified) {
      this.setState({ modal: !this.state.modal })
    } else {
      this.props.setAlert('Bu özelliği kullanmaya başlamanız için üyeliğinizin Trambolin yetkilileri tarafından onaylanması gerekmektedir', 'warning', 5000);
    }
  }

  componentDidMount() {
    this.props.clearAlerts();
    this.getStaff();
  }

  getStaff = async () => {
    const staff = await axios.get('http://34.219.165.177:5000/api/staff');
    this.setState({ staff: [...staff.data], loading: false });
  }

  error = () => this.props.setAlert('danger', 'danger', 5000);

  render() {
    return (
      <Fragment>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Personel Ekle</ModalHeader>
          <ModalBody>
            <Row>
              <Colxx xxs="12" className="mb-4">
                <Card>
                  <CardBody>
                    <Form>
                      <FormGroup>
                        <Label for="name">
                          <IntlMessages id="Tam İsim" />
                        </Label>
                        <Input
                          name="name"
                          id="name"
                          onChange={(e) => this.setState({ name: e.target.value })}
                          placeholder=""
                          value={this.state.name}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="email">
                          <IntlMessages id="E-Posta" />
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          value={this.state.email}
                          onChange={(e) => this.setState({ email: e.target.value })}
                          placeholder=""
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="phone">
                          <IntlMessages id="Telefon Numarası" />
                        </Label>
                        <Input
                          name="phone"
                          id="phone"
                          defaultValue="+90"
                          value={this.state.phone}
                          onChange={(e) => this.setState({ phone: e.target.value })}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="department">
                          <IntlMessages id="Departman" />
                        </Label>
                        <Input
                          name="department"
                          id="department"
                          value={this.state.department}
                          onChange={(e) => this.setState({ department: e.target.value })}
                          placeholder=""
                        />
                      </FormGroup>
                      <div className="d-flex justify-content-center align-items-center mt-4">
                        <Button color="primary"
                          className="btn-shadow mr-4"
                          size="lg" onClick={this.toggleModal}>
                          <IntlMessages id="Geri Dön" />
                        </Button>
                        <Button color="primary"
                          className="btn-shadow"
                          size="lg" onClick={() => this.onSubmit()}>
                          <IntlMessages id="Kaydet" />
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </ModalBody>
        </Modal>
        {this.state.loading && <LoadingSpinner />}
        <Row>
          <Colxx xxs="12">
            <h1>Personel Yönetimi</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <ReactTableAdvancedCard company={this.props.company} toggle={this.toggleModal} data={this.state.staff} />
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    company: auth.user.company,
    isVerified: auth.user.verification
  }
}

export default connect(mapStateToProps, { setAlert, clearAlerts })(ViewStaff);
