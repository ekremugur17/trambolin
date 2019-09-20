import React from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../helpers/IntlMessages";
import DataTablePagination from "../components/DatatablePagination";
import matchSorter from 'match-sorter';

const dataTableColumns = [
  {
    Header: "İsim",
    accessor: "name",
    Cell: props => <p className="list-item-heading">{props.value}</p>,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["name"] }),
    filterAll: true
  },
  {
    Header: "Telefon Numarası",
    accessor: "phone",
    Cell: props => <p className="text-muted">{props.value}</p>,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["phone"] }),
    filterAll: true
  },
  {
    Header: "Departman",
    accessor: "department",
    Cell: props => <p className="text-muted">{props.value}</p>,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["department"] }),
    filterAll: true
  },
  {
    Header: "E-Posta",
    accessor: "email",
    Cell: props => <p className="text-muted">{props.value}</p>,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["email"] }),
    filterAll: true
  }
];

export const ReactTableAdvancedCard = props => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <IntlMessages id={`${props.company} şirketinin personelleri`} />
          <div style={{ position: 'absolute', right: 0, top: 'auto' }}>
            <Button color="primary"
              className="btn-shadow mr-4"
              size="lg" onClick={props.toggle}>
              <i className="fa fa-user-plus"></i>{' '}
              <IntlMessages id="Personel Ekle" />
            </Button>
          </div>
        </CardTitle>
        <ReactTable
          data={props.data}
          columns={dataTableColumns}
          defaultPageSize={5}
          filterable={true}
          showPageJump={true}
          PaginationComponent={DataTablePagination}
          showPageSizeOptions={true}
        />
      </CardBody>
    </Card>
  );
};
