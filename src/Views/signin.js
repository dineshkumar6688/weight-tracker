import { useStore } from "../Store/store";
import { Row, Col, Card, Button, Container } from "reactstrap";
import "../Styles/signin.css";
import anonymous from "../Images/anonymous-signin.png";
import db from "../config/config.js";
import { useHistory } from "react-router-dom";

function Signin() {
  const history = useHistory();
  const updateId = useStore((state) => state.updateId);

  const signIn = (e) => {
    db
      .auth()
      .signInAnonymously()
      .then(async (data) => {
        await updateId(data.user.uid, "userId");
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="signin">
      <Container>
        <Row className="center">
          <Col md={4}>
            <Card style={{ padding: "20px" }}>
              <Row>
                <h2>ANONYMOUS SIGN IN</h2>
              </Row>
              <Row>
                <img alt="anonymous-signin" src={anonymous} />
              </Row>
              <Row>
                <Col>
                  <Button color="primary" onClick={() => signIn()}>
                    Sign in
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signin;
