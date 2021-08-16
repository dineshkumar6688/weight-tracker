import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "reactstrap";
import { useStore } from "../Store/store";
import "../Styles/signin.css";
import Alertbox from "./alertbox";
import db from "../config/config";
import mooment from "moment";
import moment from "moment";

export default function WeightList(props) {
  const [open, setOpen] = useState(false);
  const [currentId, setId] = useState("");
  var userId = useStore((state) => state.userId);
  const handleOpenClose = (id) => {
    setId(id);
    setOpen(!open);
    console.log(currentId);
  };

  const deleteData = (id) => {
    try {
      db.database()
        .ref(`${userId}/${id}`)
        .remove()
        .then(() => {
          props.setMessage("delete");
          props.setVisible(true);
          window.setTimeout(() => {
            props.setVisible(false);
          }, 2000);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card className="card">
        <Row className="header">
          <Col md={3}>WEIGHT (in Kgs)</Col>
          <Col md={3}>DATE AND TIME</Col>
          <Col md={3}>UPDATE</Col>
          <Col md={3}>DELETE</Col>
        </Row>
        <hr />
        {props.weights.map((value) => {
          return (
            <div>
              <Row>
                <Col md={3}>{value.weight}</Col>
                <Col md={3}>{moment(value.timestamp).format("lll")}</Col>
                <Col md={3}>
                  <span
                    className="btn text-primary"
                    onClick={() => handleOpenClose(value.id)}
                  >
                    <i className="fas fa-pencil-alt"></i>
                  </span>
                </Col>
                <Col md={3}>
                  <span
                    className="btn text-danger"
                    onClick={() => deleteData(value.id)}
                  >
                    <i className="far fa-trash-alt"></i>
                  </span>
                </Col>
              </Row>
              <Alertbox
                open={open}
                handleOpenClose={handleOpenClose}
                currentId={currentId}
                visible={props.visible}
                setVisible={props.setVisible}
                setMessage={props.setMessage}
              />
              <br />
            </div>
          );
        })}
      </Card>
    </div>
  );
}
