import React from "react";
import { Card, CardBody, CardTitle, CardHeader } from "reactstrap";
import CircularProgressbar from "react-circular-progressbar";

const RadialProgressCard = ({
  title = "title",
  percent = 50,
  isSortable = false,
  isBarVisible = true
}) => {
  return (
    <Card>
      {isSortable && (
        <CardHeader className="p-0 position-relative">
          <div className="position-absolute handle card-icon">
            <i className="simple-icon-shuffle" />
          </div>
        </CardHeader>
      )}
      <CardBody className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">{title}</CardTitle>
        {isBarVisible ? <div className="progress-bar-circle">
          <CircularProgressbar
            strokeWidth={4}
            percentage={percent}
            text={`${percent}%`}
          />
        </div> : null}

      </CardBody>
    </Card>
  );
};
export default RadialProgressCard;
