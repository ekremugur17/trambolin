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

class discountCode extends Component {
  state = {
  }

  readFile = async (e) => {
    const { files } = e.target;
    const file = await readXlsxFile(files[0]);
    this.setState({ codes: file });
  }

  uploadCodes = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const state = JSON.stringify(this.state);
    try {
      await Axios.post('http://34.219.165.177:5000/api/code/discount', state, config);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>Discount Codes</h1>
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
                  <h2 className='mb-3'>Upload Discount Code</h2>
                  <Input type='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' name='discount' onChange={(e) => {
                    this.readFile(e);
                  }} />
                  <hr />
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
                  className="btn-shadow mt-3"
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
export default connect(mapStateToProps, { setAlert, clearAlerts })(discountCode);