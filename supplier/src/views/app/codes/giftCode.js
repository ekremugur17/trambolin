import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  Button,
  Input
} from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { connect } from 'react-redux';
import { setAlert, clearAlerts } from '../../../redux/actions';
import readXlsxFile from 'read-excel-file';
import IntlMessages from '../../../helpers/IntlMessages'
import Axios from "axios";

class giftCode extends Component {
  state = {
  }

  readFile = async (e) => {
    const { name, files } = e.target;
    const file = await readXlsxFile(files[0]);
    switch (name) {
      case '25':
        this.setState({ 25: file });
        break;
      case '50':
        this.setState({ 50: file });
        break;
      case '100':
        this.setState({ 100: file });
        break;
      case '200':
        this.setState({ 200: file });
        break;
      case '250':
        this.setState({ 250: file });
        break;
      case '500':
        this.setState({ 500: file });
        break;
      default:
        break;
    }
  }

  uploadCodes = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const state = JSON.stringify(this.state);
    try {
      const res = await Axios.post('http://34.219.165.177:5000/api/code/gift', state, config);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>Upload Gift Codes</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xx='12'>
            <Card onClick={() => console.log(this.state)}>
              <CardBody>
                <div>
                  <h4>Use xlsx or xls files to upload codes</h4>
                  <h4>Every cell in a file will be uploaded as a code</h4>
                  <h4><a href="!#">Click here</a> to download an example file if you are confused</h4>
                  <hr />
                </div>
                <div>
                  <h2>Upload 25 TL Gift Code</h2>
                  <input type='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' name='25' onChange={(e) => {
                    this.readFile(e);
                  }} />
                  <hr />
                </div>
                <div>
                  <h2>Upload 50 TL Gift Code</h2>
                  <input type='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' name='50' onChange={(e) => {
                    this.readFile(e);
                  }} />
                  <hr />
                </div>
                <div>
                  <h2>Upload 100 TL Gift Code</h2>
                  <input type='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' name='100' onChange={(e) => {
                    this.readFile(e);
                  }} />
                  <hr />
                </div>
                <div>
                  <h2>Upload 200 TL Gift Code</h2>
                  <input type='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' name='200' onChange={(e) => {
                    this.readFile(e);
                  }} />
                  <hr />
                </div>
                <div>
                  <h2>Upload 250 TL Gift Code</h2>
                  <input type='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' name='250' onChange={(e) => {
                    this.readFile(e);
                  }} />
                  <hr />
                </div>
                <div>
                  <h2>Upload 500 TL Gift Code</h2>
                  <input type='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' name='500' onChange={(e) => {
                    this.readFile(e);
                  }} />
                </div>
                <div>
                  <h4>Use plain text to upload codes</h4>
                  <h4>Codes must be seperated with a comma (,)</h4>
                  <h4>Example: code, code1, code2,code3</h4>
                  <hr />
                </div>
                <div>
                  <Input type="text" />
                </div>
                <Button
                  color="primary"
                  className="btn-shadow mt-5"
                  size="lg"
                  onClick={() => this.uploadCodes()}
                >
                  <IntlMessages id="Upload" />
                </Button>
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
export default connect(mapStateToProps, { setAlert, clearAlerts })(giftCode);