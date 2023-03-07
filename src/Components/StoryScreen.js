import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class StoryScreen extends React.Component {
  constructor(props) {
    super(props);
    let { catagoryId } = props.params;
    console.log("params " + catagoryId);
    this.state = {
      catagoryId: catagoryId,
      page: 1,
      pageSize: 10,
      data: [],
    };
  }
  componentDidMount() {
    fetch(
      "https://localhost:44396/QuestionReview/questions?page=" +
        this.state.page +
        "&pageSize=" +
        this.state.pageSize
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ data: data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  render() {
    return (
      <div
        style={{
          overflowY: "scroll",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#734b6d",
        }}
      >
        {this.state.data.map((question, index2) => {
          console.log(question);
          return (
            <div
              style={{
                flexDirection: "column",
                display: "flex",
                minHeight: "200px",
                backgroundColor: "#FFF4EE",
                margin: "50px",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={{ index2 }}
            >
              <h3
                style={{
                  marginTop: "20px",
                  backgroundColor: "#474a59",
                  color: "#f09e51",
                }}
              >
                {question.question}
              </h3>
              <div style={{ width: "10px" }}></div>

              <div
                style={{
                  display: "flex",
                  marginTop: "30px",
                  flexDirection: "row",
                }}
              >
                <div>
                  <h6 style={{ backgroundColor: "#f09e51", color: "#352477" }}>
                    A) {question.correctAnswer}
                  </h6>
                  <h6 style={{ color: "#352477" }}>
                    B) {question.incorrectAnswers[0]}
                  </h6>
                </div>
                <div style={{ width: "10px" }}></div>
                <div>
                  <h6 style={{ color: "#352477" }}>
                    C) {question.incorrectAnswers[1]}
                  </h6>
                  <h6 style={{ color: "#352477" }}>
                    D) {question.incorrectAnswers[2]}
                  </h6>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "30px",
                  marginBottom: "15px",
                  flexDirection: "row",
                }}
              >
                <Button
                  style={{ backgroundColor: "#352477" }}
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    let arr = this.state.data;
                    arr.shift();
                    this.setState({ data: arr });
                  }}
                >
                  ACCEPT
                </Button>
                <div style={{ width: "30px" }}></div>

                <Button
                  style={{ backgroundColor: "#352477" }}
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    let arr = this.state.data;
                    arr.shift();
                    this.setState({ data: arr });
                  }}
                >
                  REJECT
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withParams(StoryScreen);
