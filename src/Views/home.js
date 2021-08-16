import { Row, Col, Container, Alert, Button } from "reactstrap";
import AddWeight from "./add_weight.js";
import WeightList from "./WeightList";
import "../Styles/signin.css";
import React, { useEffect, useState } from "react";
import db from "../config/config";
import { useStore } from "../Store/store";
import { useHistory } from "react-router-dom";
import moment from "moment";

function Home() {
  const [visible, setVisible] = useState(false);
  var [weights, setWeights] = useState({});

  var userId = useStore((state) => state.userId);
  var [view, setView] = useState(false);
  var [count, setCount] = useState(0);
  var [message, setMessage] = useState("");
  const history = useHistory();
  const [data, setData] = useState([]);
  var item = [];

  useEffect(() => {
    db.database()
      .ref(userId)
      .on("value", (snapshot) => {
        if (snapshot.val() != null) setWeights(snapshot.val());
      });
    Object.keys(weights).map((id) =>
      item.push({
        id: id,
        weight: weights[id].weight,
        timestamp: weights[id].timestamp,
      })
    );
    item = item.reverse();
    setData(item);
  });

  const addWeight = async (data) => {
    try {
      var dt = new Date().getTime();
      db.database()
        .ref(userId)
        .push({ weight: data.weight, timestamp: dt }, (err) => {
          if (err) console.log(err);
          setCount(count++);
          setMessage("add");
          setVisible(true);
          setView(true);
          window.setTimeout(() => {
            setVisible(false);
          }, 2000);
        });
    } catch (err) {
      console.log(err);
    }
  };

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
          <AddWeight addWeight={addWeight} />
        </Row>
        {data.length>0 ? (
          <Row>
            <WeightList
              weights={data}
              visible={visible}
              setVisible={setVisible}
              setMessage={setMessage}
            />
          </Row>
        ) : (
          "No data"
        )}
      </Container>
    </div>
  );
}

export default Home;
