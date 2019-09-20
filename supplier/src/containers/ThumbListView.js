import React from "react";
import { Card, CustomInput, Badge } from "reactstrap";
import classnames from "classnames";
import { Colxx } from "../components/common/CustomBootstrap";

const ThumbListView = (props) => {
  const { item } = props;
  return (
    <Colxx xxs="12" key={item.__id} className="mb-3">
      <div>
        <Card
          onClick={event => props.onCheckItem(props.index, event)}
          className={classnames("d-flex flex-row", {
            active: props.isSelect
          })}
        >
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
              <p className="mb-1 text-muted text-small w-30 w-sm-100">
                {item.email}
              </p>
              <p className="mb-1 text-muted text-small w-15 w-sm-100">
                {item.credits}
              </p>
              <div className="w-15 w-sm-100">
                <Badge color={item.validation ? 'success' : 'danger'} pill>
                  {item.validation ? 'Aktif' : 'Deaktif'}
                </Badge>
              </div>
            </div>
            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${item._id}`}
                checked={props.isSelect}
                onChange={() => { }}
                label=""
              />
            </div>
          </div>
        </Card>
      </div>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ThumbListView);
