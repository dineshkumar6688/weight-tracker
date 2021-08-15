import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form } from "reactstrap";

function AddWeight(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  var [values, setValues] = useState();

  return (
    <div>
      <div>
        <Form onSubmit={handleSubmit(props.addWeight, "add")}>
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
