import React from "react";
import { Navigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import backgroundImage from "../StaticImages/kapak.jpg";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { createHashHistory } from "history";

class Home extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      redirect: false,
      catagories: [],
    };
  }
 

  componentDidMount() {
    fetch("http://triviacrack-env.eba-3vx47zu9.us-east-1.elasticbeanstalk.com/QuestionReview/catagories")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ catagories: data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  render() {
    const history = createHashHistory();
    return (
      <div
        className="home-container"
        style={{
          overflowY: "scroll",
          backgroundColor: "#FFF4EE"
        }}
      >
        {this.state.catagories.map((name, index2) => {
          return (
            <div key={name.id}>
              <Button
              key={name.id}
                style={{ backgroundColor: "#352477" }}
                variant="primary"
                size="lg"
                onClick={() => {
                  history.push("/");
                  this.setState({ redirect: true,redirectKey:name.id });
                }}
              >
                {name.name}
              </Button >
              {this.state.redirect && (
                <Navigate key={name.id} to={"reviews/" + this.state.redirectKey} replace={true} />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
