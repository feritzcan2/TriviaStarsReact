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
          backgroundColor: "#FFF4EE",
        }}
      >
        {this.state.data.map((question, index2) => {
          console.log(question);
          return (
            <div
              style={{
                flexDirection: "column",
                display: "flex",
                height: "200px",
                width: "100vw",
                backgroundColor: "cyan",
                marginBottom: "10px",
                marginTop: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
              key={{ index2 }}
            >
              <h6 style={{ color: "#352477" }}>{question.question}</h6>

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
                {question.name}
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withParams(StoryScreen);
