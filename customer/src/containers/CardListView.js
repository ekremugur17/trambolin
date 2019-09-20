import React, { useState } from "react";
import { Card, Badge, Modal, ModalBody, ModalHeader, Button } from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../components/common/CustomBootstrap";
import { setAlert, clearAlerts } from '../redux/actions';
import { connect } from 'react-redux';
import IntlMessages from "../helpers/IntlMessages";
import axios from 'axios';

const ThumbListView = (props) => {
  const [modal, setModal] = useState({
    isOpen: false
  });

  const toggleModal = () => {
    setModal({ isOpen: !isOpen })
  };
  const { isOpen } = modal;
  const { item } = props;

  const onSubmit = async () => {
    props.clearAlerts();
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ id: item._id })
    const res = await axios.post('http://34.219.165.177:5000/api/card/deleteCard', body, config);
    toggleModal();
    props.loadCards();
    if (res.data === 'Success') props.setAlert('Kart başarıyla kaldırıldı', 'success', 5000);
    else props.setAlert('Kart kaldırılması sırasında hata oluştu', 'danger', 5000);
  }

  return (
    <Colxx xxs="12" key={item._id} className="mb-3">
      <div>
        <Modal isOpen={isOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Bu işlemi yapmak istediğinize emin misiniz?</ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center align-items-center mt-4">
              <p>
                {item.cardAlias} ismine sahip kartınızı kaldırmak üzeresiniz.
                Kart kaldırma işlemi geri döndürülemez.
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
          className={classnames("d-flex flex-row", {
            active: props.isSelect
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero" >
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <div className="w-25 w-sm-100">
                <p className="list-item-heading mb-1 truncate">
                  {item.cardAlias}
                </p>
              </div>
              <p className="mb-1 text-muted text-small w-30 w-sm-100">
                {item.cardType.split('_').join(' ')}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {item.cardAssociation.split('_').join(' ')}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {item.cardBankName}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {`**** **** **** ${item.lastFourDigits}`}
              </p>
              <p onClick={() => toggleModal(item._id)} className="mb-1 text-muted text-small w-15 w-sm-100 delete-person">
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

export default connect(null, { setAlert, clearAlerts })(ThumbListView);
