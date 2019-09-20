import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  Form,
  Button,
  ModalBody,
  Modal,
  ModalHeader,
  CustomInput
} from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import { connect } from 'react-redux';
import { setAlert, clearAlerts } from '../../redux/actions';
import axios from 'axios';
import IntlMessages from '../../helpers/IntlMessages';
import ThumbListView from '../../containers/ThumbListView';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import Select from "react-select";
import CustomSelectInput from "../../components/common/CustomSelectInput";
import disableScroll from 'disable-scroll';

const selectionData = [
  { label: 25, value: 25, key: 0 },
  { label: 50, value: 50, key: 1 },
  { label: 75, value: 75, key: 2 },
  { label: 100, value: 100, key: 3 },
  { label: 200, value: 200, key: 4 },
  { label: 250, value: 250, key: 5 },
]

class Credits extends Component {
  state = {
    staff: [],
    search: '',
    filtered: [],
    final: [],
    loading: true,
    credits: 0,
    allSelected: false,
    selectedOptions: [],
    selectData: null,
    isVisible: false,
    selectedOption: '',
    error: '',
    errorModal: false
  }

  activityToggle = () => this.setState({ loading: !this.state.loading });

  loadStaff = async () => {
    const staff = await axios.get('http://34.219.165.177:5000/api/staff');
    this.setState({ staff: [...staff.data], filtered: [...staff.data], selectData: [] });
    staff.data.forEach((member, index) => {
      this.state.selectData.push({ label: member.name, value: member.name, key: index });
    });
    setTimeout(() => this.setState({ isVisible: true, loading: false }), 100);
  }

  handleChangeMulti = (selectedOptions, item) => {
    if (item.action === 'select-option') {
      this.setState({ final: [...this.state.final, item.option.key] });
      if (selectedOptions.length === this.state.staff.length) this.setState({ allSelected: true });
    } else {
      this.setState({ final: this.state.final.filter(finalItem => finalItem !== item.removedValue.key) })
      if (this.state.allSelected) this.setState({ allSelected: false });
    }
    this.setState({ selectedOptions });
  };

  handleChangeSingle = (selectedOption) => {
    this.setState({ selectedOption });
  }

  componentDidMount() {
    this.props.clearAlerts();
    this.loadStaff();
  }

  handleChange = async (e) => {
    await this.setState({ search: e.target.value })
    await this.setState({ filtered: this.state.staff.filter((item) => item.name.replace('/', '').replace('-', '').toLowerCase().includes(this.state.search.toLowerCase()) || item.email.replace('/', '').replace('-', '').toLowerCase().includes(this.state.search.toLowerCase()) || item.department.replace('/', '').replace('-', '').toLowerCase().includes(this.state.search.toLowerCase())) })
  }

  toggleModal = () => { this.setState({ errorModal: !this.state.errorModal, error: '' }) }

  selectStaff = async (index, e) => {
    let { final } = this.state;
    if (final.includes(index)) {
      final = final.filter(x => x !== index);
      this.setState({ allSelected: false });
    } else {
      final.push(index);
      if (this.state.final.length === this.state.staff.length) this.setState({ allSelected: true })
    }
    let selectedOptions = [];
    final.forEach((index) => {
      selectedOptions.push({ label: this.state.filtered[index].name, value: this.state.filtered[index].name, key: index });
    })
    this.setState({ final, selectedOptions });
  }

  selectAll = () => {
    if (!this.state.allSelected) {
      let array = [];
      let selectedOptions = [];
      for (let i = 0; i < this.state.staff.length; i++) {
        array.push(i);
        selectedOptions.push({ label: this.state.staff[i].name, value: this.state.staff[i].name, key: i });
      }
      this.setState({ final: array, selectedOptions });
    } else {
      this.setState({ final: [], selectedOptions: [] })
    }
    this.setState({ allSelected: !this.state.allSelected });
  }

  handleSubmit = async () => {
    window.scrollTo(0, 0);
    disableScroll.on(); // prevent scrolling
    if (this.state.final.length === 0) {
      this.setState({ errorModal: true, error: 'En az bir personel seçimi yapınız' });
      return;
    } else if (this.state.selectedOption === '') {
      this.setState({ errorModal: true, error: 'Kredi miktarını belirlemeden bu işlemi yapamazsınız' });
      return;
    }
    this.setState({ loading: true, isVisible: false });
    let idArray = [];
    this.state.final.forEach((index) => idArray.push(this.state.filtered[index]));
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ idArray, amount: this.state.selectedOption.value });
    try {
      await axios.post('http://34.219.165.177:5000/api/staff/update', body, config);
      this.setState({ credits: 0, final: [], search: '', staff: [], filtered: [], selectedOptions: [], selectedOption: '' });
      this.loadStaff();
    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false, search: '' });
    disableScroll.off(); // re-enable scroll
  }

  renderSelect = (props) => {
    return (props.bool ? <Select
      components={{ Input: CustomSelectInput }}
      className="react-select"
      classNamePrefix="react-select"
      isMulti
      isSearchable
      name="form-field-name"
      placeholder="Personel seçimi yapın"
      value={this.state.selectedOptions}
      onChange={this.handleChangeMulti}
      options={this.state.selectData ? this.state.selectData : []}
    /> : null)
  }

  renderCreditSelect = () => {
    return (
      <Select
        components={{ Input: CustomSelectInput }}
        className="react-select mb-3"
        classNamePrefix="react-select"
        name="form-field-name"
        placeholder="Kredi Secin"
        value={this.state.selectedOption}
        onChange={this.handleChangeSingle}
        options={selectionData}
      />
    )
  }

  render() {
    return (
      <Fragment>
        <Modal isOpen={this.state.errorModal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Transfer işlemi tamamlanamadı!</ModalHeader>
          <ModalBody>
            <Row>
              <Colxx xx="12" style={{ flexDirection: 'row' }}>
                <Card>
                  <CardBody>
                    <h2>{this.state.error}</h2>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <Button color="primary"
                        className="btn-shadow mr-4"
                        size="lg" onClick={this.toggleModal}>
                        <IntlMessages id="Geri Dön" />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </ModalBody>
        </Modal>
        {this.state.loading && <LoadingSpinner />}
        <Row>
          <Colxx xxs="12">
            <h1>Personellerinizin Bakiyelerini Yönetin</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <CardTitle>Bakiye Transfer Et</CardTitle>
                <div className='mb-3'>
                  <this.renderSelect bool={this.state.isVisible} />
                </div>
                <div>
                  <this.renderCreditSelect />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={() => {
                      this.handleSubmit()
                    }}
                  >
                    <IntlMessages id="Gönder" />
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" className="mb-4">
            <Card>
              <CardBody>
                <div className='mb-3'>
                  <Input type="text" value={this.state.search} name="search" id="search" placeholder="Personel arayın..." onChange={(e) => this.handleChange(e)} />
                </div>
                <div onClick={() => this.selectAll()} className="custom-control custom-checkbox pl-1 align-self-center pr-4 mb-3">
                  <CustomInput
                    className="item-check mb-0"
                    type="checkbox"
                    id="50"
                    checked={this.state.allSelected}
                    label="Tüm personelleri seç"
                  />
                </div>
                <Form>
                  {this.state.filtered.map((item, index) =>
                    (
                      <ThumbListView
                        activityToggle={this.activityToggle}
                        loadUsers={this.loadStaff}
                        key={item._id}
                        item={item}
                        index={index}
                        onCheckItem={this.selectStaff}
                        isSelect={this.state.final.includes(index)}
                        collect={() => { }}
                      />
                    )
                  )}
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = () => {
  return {}
}
export default connect(mapStateToProps, { setAlert, clearAlerts })(Credits);