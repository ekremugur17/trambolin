import React, { useState } from "react";
import { Card, CustomInput, Badge, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../components/common/CustomBootstrap";
import IntlMessages from "../helpers/IntlMessages";
import axios from 'axios';
import { setAlert, clearAlerts } from '../redux/actions';
import { connect } from 'react-redux';

const ThumbListView = (props) => {
  const [modal, setModal] = useState({
    isOpen: false
  });
  const { item, activityToggle, clearAlerts, loadUsers, setAlert } = props;

  const { isOpen } = modal;

  const toggleModal = () => {
    setModal({ isOpen: !isOpen })
  };

  const onSubmit = async () => {
    activityToggle();
    clearAlerts();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ id: item._id })
    const res = await axios.post('http://34.219.165.177:5000/api/staff/deleteStaff', body, config);
    toggleModal();
    loadUsers();
    if (res.data === 'Success') setAlert('Kullanıcı başarıyla kaldırıldı', 'success', 5000);
    else setAlert('Kullanıcı kaldırılması sırasında hata oluştu', 'danger', 5000);
    activityToggle();
  };

  return (
    <Colxx xxs="12" key={item._id} className="mb-3">
      <div>
        <Modal isOpen={isOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Bu işlemi yapmak istediğinize emin misiniz?</ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <p>
                {item.email} e-postasına sahip kullanıcıyı kaldırmak üzeresiniz.
                Kullanıcı kaldırma işlemi geri döndürülemez.
              </p>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <Button color="primary"
                className="btn-shadow mr-4"
                size="lg" onClick={toggleModal}>
                <IntlMessages id="Geri Dön" />
              </Button>
              <Button color="primary"
                className="btn-shadow"
                size="lg" onClick={onSubmit}>
                <IntlMessages id="Kaldır" />
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <Card
          onClick={event => props.onCheckItem(props.index, event)}
          className={classnames("d-flex flex-row", {
            active: props.isSelect
          })}
        >
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4 ml-4">
            <CustomInput
              className="item-check mb-0"
              type="checkbox"
              id={`check_${item._id}`}
              checked={props.isSelect}
              onChange={() => { }}
              label=""
            />
          </div>
          <div>
            <img
              alt={item.name}
              src={item.avatar}
              style={{ width: 100 }}
              className="responsive border-0 card-img-left"
            />
          </div>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero" >
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <div className="w-25 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {item.name}
                </p>
              </div>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {item.department}
              </p>
              <p className="mb-1 text-muted text-small w-30 w-sm-100">
                {item.email}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {item.credits}
              </p>
              <div className="w-15 w-sm-100">
                <Badge color={item.validation ? 'success' : 'warning'} pill>
                  {item.validation ? 'Aktif' : 'Deaktif'}
                </Badge>
              </div>
              <p onClick={event => {
                props.onCheckItem(props.index, event);
                toggleModal(item);
              }} className="mb-1 text-muted text-small w-15 w-sm-100 delete-person">
                <Badge color='danger' pill>
                  {'Kaldır'}
                </Badge>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default connect(null, { setAlert, clearAlerts })(ThumbListView);
