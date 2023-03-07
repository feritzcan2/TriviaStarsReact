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
  onChange = (params) => {
    this.setState({ name: params.target.value.replace(/ /g, "") });
  };

  componentDidMount() {
    fetch("https://localhost:44396/QuestionReview/catagories")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
          display: "flex",
          height: "100vh",
          backgroundColor: "#FFF4EE",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {this.state.catagories.map((name, index2) => {
          console.log(name);
          return (
            <div key={{ index2 }}>
              <Button
                style={{ backgroundColor: "#352477" }}
                variant="primary"
                size="lg"
                onClick={() => {
                  history.push("/");

                  this.setState({ redirect: true });
                }}
              >
                {name.name}
              </Button>
              {this.state.redirect && (
                <Navigate to={"reviews/" + name.id} replace={true} />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Home;
