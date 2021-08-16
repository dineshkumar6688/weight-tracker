import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm } from "react-hook-form";
import { Row, Col, Form } from "reactstrap";
import { useStore } from "../Store/store";
import db from "../config/config";
import moment from 'moment'

export default function Alertbox(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  var userId = useStore((state) => state.userId);
  var [values, setValues] = React.useState();

  const update = async (data) => {
    try {
      var dt = new Date().getTime();
      db.database()
        .ref(`${userId}/${props.currentId}`)
        .set({ weight: data.weight, timestamp: dt }, (err) => {
          if (err) console.log(err);
          props.handleOpenClose();
          props.setMessage("update");
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
      <Dialog
        open={props.open}
        onClose={props.handleOpenClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update the weight</DialogTitle>
        <Form onSubmit={handleSubmit(update)} style={{ margin: "20px" }}>
          <Row className="center">
            <Col md={12}>
              <input
                type="number"
                className="form-control"
                name="weight"
                placeholder="Enter the weight"
                onChange={(e) => setValues(e.target.value)}
                {...register("weight", { required: true })}
              />
            </Col>
          </Row>
          <Row>
            {errors.weight && (
              <span style={{ color: "red" }}>Weight is required</span>
            )}
          </Row>
          <br />
          <Row>
            <Col sm={{ size: 4, offset: 1 }} md={4}>
              <Button onClick={props.handleOpenClose}>Cancel</Button>
            </Col>
            <Col sm={{ size: 4, offset: 1 }} md={4}>
              <input value="update" className="btn btn-primary" type="Submit" />
            </Col>
          </Row>
        </Form>
        <br />
      </Dialog>
    </div>
  );
}
