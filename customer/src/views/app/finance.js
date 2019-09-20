import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Button,
  CardTitle
} from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import { connect } from 'react-redux';
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { setAlert, clearAlerts } from '../../redux/actions';
import axios from 'axios';
import Cards from 'react-credit-cards';
import {
  formatCreditCardNumber,
  formatExpirationDate
} from '../../helpers/PaymentFix';
import Alert from '../../components/Alert';
import IntlMessages from "../../helpers/IntlMessages";
import 'react-credit-cards/es/styles-compiled.css';
import CardListView from '../../containers/CardListView';


class viewCards extends Component {
  state = {
    cards: [],
    loaded: false,
    number: '',
    name: null,
    cvc: '',
    dummyName: 'Kart Sahibi',
    expiry: '',
    email: this.props.email,
    focused: '',
    loading: false
  }

  loadCards = async () => {
    const cards = await axios.get('http://34.219.165.177:5000/api/card');
    this.setState({ cards: cards.data, loaded: true });
  }

  componentDidMount() {
    this.props.clearAlerts();
    this.loadCards();
  }

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { name, expiry, number, title, email } = this.state;
    const split = expiry.split('/');
    const num = number.split(' ').join('');
    const body = JSON.stringify(
      {
        email,
        card: {
          cardAlias: title,
          cardHolderName: name,
          cardNumber: num,
          expireMonth: split[0],
          expireYear: '20' + split[1],
        }
      }
    );
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('http://34.219.165.177:5000/api/card/iyzico', body, config);
    await axios.post('http://34.219.165.177:5000/api/card', res.data.result, config);
    this.props.setAlert('Card Registered Successfully', 'success', 3000);
    this.setState({ number: '', expiry: '', name: '', title: '', email: '', loading: false });
  }

  toggleModal = () => this.setState({ modal: !this.state.modal })


  handleChange = (e) => {
    const { target } = e;
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    }
    this.setState({ [target.name]: target.value });
  }

  render() {
    return (
      <Fragment>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Yeni Kart Ekle</ModalHeader>
          <ModalBody>
            <Row>
              <Colxx xx="12" style={{ flexDirection: 'row' }}>
                <Card>
                  <CardBody>
                    <Alert className='mb-5 mt-5' />
                    <div className='mb-5 mt-5'>
                      <Cards
                        number={this.state.number}
                        name={this.state.name ? this.state.name : this.state.dummyName}
                        expiry={this.state.expiry}
                        cvc={this.state.cvc}
                        focused={this.state.focused}
                      />
                    </div>
                    <div>
                      <Label for="title">
                        <IntlMessages id="Kart Başlığı" />
                      </Label>
                      <Input
                        name="title"
                        id="title"
                        onChange={(e) => this.handleChange(e)}
                        placeholder=""
                        value={this.state.title}
                        onFocus={this.handleInputFocus}
                      />
                      <Label for="name" className='mt-3'>
                        <IntlMessages id="Kart Üzerindeki İsim" />
                      </Label>
                      <Input
                        name="name"
                        id="name"
                        onChange={(e) => this.handleChange(e)}
                        defaultValue=''
                        value={this.state.name}
                        onFocus={this.handleInputFocus}
                      />
                      <Label for="number" className='mt-3'>
                        <IntlMessages id="Kart Numarası" />
                      </Label>
                      <Input
                        name="number"
                        id="number"
                        onChange={(e) => this.handleChange(e)}
                        placeholder=""
                        value={this.state.number}
                        onFocus={this.handleInputFocus}
                      />
                      <Label for="expiry" className='mt-3'>
                        <IntlMessages id="Son Kullanma Tarihi" />
                      </Label>
                      <Input
                        name="expiry"
                        id="expiry"
                        onChange={(e) => this.handleChange(e)}
                        placeholder=""
                        value={this.state.expiry}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <Button color="primary"
                        className="btn-shadow mr-4"
                        size="lg" onClick={this.toggleModal}>
                        <IntlMessages id="Geri Dön" />
                      </Button>
                      <Button color="primary"
                        className="btn-shadow"
                        size="lg" onClick={() => this.handleSubmit()}>
                        <IntlMessages id="Kaydet" />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </ModalBody>
        </Modal>
        {!this.state.loaded && <LoadingSpinner />}
        <Row>
          <Colxx xxs="12">
            <h1 onClick={this.toggleModal} >Kart İşlemleri</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xx='12'>
            <Card>
              <CardBody>
                <CardTitle style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                  <div>
                    <h2>Kartlarınızın sadece son 4 hanesi gerçeği yansıtmaktadır</h2>
                    <h2>Kartınızı kaydederken kullandığınız başlık kart görselinin sol altında bulunmaktadır</h2>
                  </div>
                  <div style={{ position: 'absolute', right: 0, top: 'auto' }}>
                    <Button color="primary"
                      className="btn-shadow mr-4"
                      size="lg" onClick={this.toggleModal}>
                      <i className="fa fa-user-plus"></i>{' '}
                      <IntlMessages id="Kart Ekle" />
                    </Button>
                  </div>
                </CardTitle>
                <Separator className="mb-5" />
                {this.state.loaded ?
                  this.state.cards.length > 0 ?
                    this.state.cards.map(card => (
                      <CardListView
                        key={card._id}
                        item={card}
                        loadCards={this.loadCards}
                      />
                    ))
                    :
                    <h1>Hesabiniza ait kayitli kart bulunamadi!</h1>
                  :
                  null}
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    email: auth.user.email
  }
}
export default connect(mapStateToProps, { setAlert, clearAlerts })(viewCards);
