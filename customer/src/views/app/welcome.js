import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import RadialProgressCard from '../../components/cards/RadialProgressCard';
import NewComments from '../../containers/NewComments';
import { connect } from "react-redux";
import { setAlert, clearAlerts, loadUser } from '../../redux/actions';
import ProductCategoriesDoughnut from "../../containers/ProductCategoriesDoughnut";
import ProductCategoriesPolarArea from "../../containers/ProductCategoriesPolarArea";
import SalesChartCard from "../../containers/SalesChartCard";
// import DropZoneExample from '../../components/DropzoneExample';
import axios from 'axios';

class Start extends Component {
  componentDidMount() {
    this.props.clearAlerts();
    this.loadData();
  }

  state = {
    activeUsers: 0
  }

  loadData = async () => {
    const activeUsers = await axios.get('http://34.219.165.177:5000/api/staff/getActive');
    this.setState({ activeUsers: activeUsers.data });
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>Trambolin'e Hoşgeldiniz</h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        {
          !this.props.loading ? <div>
            <Row>
              <Colxx xxs="12" md="6" className="mb-4">
                <RadialProgressCard title={`Sirketiniz ${this.props.company}, Trambolin üyesi ${150} personele sahip`} isBarVisible={true} percent={150} isPercent={false} />
              </Colxx>
              <Colxx xxs="12" md="6" className="mb-4">
                <RadialProgressCard title={`${150} personelinizden ${137} tanesi üyeliğini aktifleştirdi`} isBarVisible={true} percent={(100 * 137) / 150} />
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12" lg="6" className="mb-4">
                <ProductCategoriesDoughnut />
              </Colxx>
              <Colxx xxs="12" lg="6" className="mb-4">
                <ProductCategoriesPolarArea />
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12" className="mb-4">
                <SalesChartCard />
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12" className="mb-4">
                <NewComments title="Personelinizden gelen mesajlar" />
              </Colxx>
            </Row>
          </div> : null
        }
      </Fragment>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    loading: auth.loading,
    staffNum: auth.user.staffNum,
    company: auth.user.company
  }
}

export default connect(mapStateToProps, { setAlert, clearAlerts, loadUser })(Start);
