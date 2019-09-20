import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import ReactTable from "react-table";
import IntlMessages from "../helpers/IntlMessages";
import DataTablePagination from "../components/DatatablePagination";

const dataTableColumns = [
  {
    Header: "Name",
    accessor: "name",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },
  {
    Header: "Phone",
    accessor: "phone",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "E-Mail",
    accessor: "email",
    Cell: props => <p className="text-muted">{props.value}</p>
  }
];

export const ReactTableAdvancedCard = props => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <IntlMessages id={`${props.company}'s staff`} />
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
