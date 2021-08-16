import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form } from "reactstrap";
import db from "../config/config";
import { useStore } from "../Store/store";

function AddWeight(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  let userId = useStore((state) => state.userId);
  var [values, setValues] = useState();

  const addWeight = async (data, e) => {
    try {
      let dt = new Date().getTime();
      db.database()
        .ref(userId)
        .push({ weight: data.weight, timestamp: dt }, (err) => {
          if (err) console.log(err);
          props.setMessage("add");
          props.setVisible(true);
          reset()
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
      <div>
        <Form onSubmit={handleSubmit(addWeight)}>
          <Row className="center">
            <Col xs={12} sm={12} md={9}>
              <input
                type="number"
                className="form-control"
                name="weight"
                placeholder="Enter the weight"
                onChange={(e) => setValues(e.target.value)}
                {...register("weight", { required: true })}
              />
            </Col>
            <Col xs={12} sm={12} md={3}>
              <input
                value="Add Weight"
                className="btn btn-primary"
                type="Submit"
              />
            </Col>
          </Row>
          <Row>
            {errors.weight && (
              <span style={{ color: "red" }}>Weight is required</span>
            )}
          </Row>
        </Form>
        <hr />
      </div>
      <div></div>
    </div>
  );
}
export default AddWeight;
