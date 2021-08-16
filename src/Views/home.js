import { Row, Col, Container, Alert, Button } from "reactstrap";
import AddWeight from "./add_weight.js";
import WeightList from "./WeightList";
import "../Styles/signin.css";
import React, { useEffect, useState } from "react";
import nodata from "../Images/nodata.png";
import db from "../config/config";
import { useStore } from "../Store/store";
import { useHistory } from "react-router-dom";

function Home() {
  const [visible, setVisible] = useState(false);
  let [weights, setWeights] = useState({});
  let userId = useStore((state) => state.userId);
  let [message, setMessage] = useState("");
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    db.database()
      .ref(userId)
      .on("value", (snapshot) => {
        if (snapshot.val() != null) {
          let item = [];
          setWeights(snapshot.val());
          Object.keys(weights).map((id) =>
            item.push({
              id: id,
              weight: weights[id].weight,
              timestamp: weights[id].timestamp,
            })
          );
          setData(item.reverse());
        }
      });
  });

  const signout = () => {
    db.auth()
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container className="signin">
        <Row className="signout-btn">
          <Col>
            <Button onClick={() => signout()}>Signout</Button>
          </Col>
        </Row>
        <h1>WEIGHT TRACKER</h1>
        <Alert color="info" isOpen={visible}>
          {message === "add"
            ? "Weight has been recorded!"
            : message === "update"
            ? "Weight has been updated successfully!"
            : message === "delete"
            ? "Deleted successfully!"
            : ""}
        </Alert>
        <Row>
          <AddWeight setVisible={setVisible} setMessage={setMessage} />
        </Row>
        {data.length >= 1 ? (
          <Row>
            <WeightList
              weights={data}
              visible={visible}
              setVisible={setVisible}
              setMessage={setMessage}
              setData={setData}
            />
          </Row>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img alt="anonymous-signin" width="50%" src={nodata} />
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
