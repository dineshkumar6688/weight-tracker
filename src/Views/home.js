import { Row, Container, Alert, Button } from "reactstrap";
import AddWeight from "./add_weight.js";
import WeightList from "./WeightList";
import "../Styles/signin.css";
import React, { useEffect, useState } from "react";
import db from "../config/config";
import { useStore } from "../Store/store";
import { useHistory } from "react-router-dom";

function Home() {
  const [visible, setVisible] = useState(false);
  var [weights, setWeights] = useState({});
  var userId = useStore((state) => state.userId);
  var [view, setView] = useState(false);
  var [count,setCount] = useState(0)
  var [message, setMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    db.database()
      .ref(userId)
      .on("value", (snapshot) => {
        if (snapshot.val() != null)
          setWeights({
            ...snapshot.val(),
          });
      });
  });

  const addWeight = async (data) => {
    try {
      var timestamp = new Date().getTime();
      db.database()
        .ref(userId)
        .push({ weight: data.weight, timestamp: timestamp }, (err) => {
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
        <Button className="signout" onClick={() => signout()}>
          Signout
        </Button>
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
        {view ? (
          <Row>
             
            <WeightList
              weights={weights}
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
