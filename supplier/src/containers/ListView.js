import React from "react";
import { Card } from "reactstrap";
import { Colxx } from "../components/common/CustomBootstrap";

const ListView = (props) => {
  const { item } = props;
  return (
    <Colxx xxs="12" key={item._id} className="mb-3">
      <div>
        <Card>
          <div className="pl-2 d-flex flex-grow-1 min-width-zero align-items-center">
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
            </div>
          </div>
        </Card>
      </div>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(ListView);
