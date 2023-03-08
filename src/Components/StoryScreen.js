import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
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
      pageSize: 3,
      data: [],
      fetchingData:false
    };
  }
  componentDidMount() {
    fetch(
      "http://triviacrack-env.eba-3vx47zu9.us-east-1.elasticbeanstalk.com/QuestionReview/questions?page=" +
        this.state.page +
        "&pageSize=" +
        this.state.pageSize+"&catagory="+this.state.catagoryId
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data: data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  getNewData(){
    if(this.state.fetchingData == true )return;
    if(this.state.data.length>1)return;
    this.setState({fetchingData:true})
    let newPage = this.state.page+1
    fetch(
      "http://triviacrack-env.eba-3vx47zu9.us-east-1.elasticbeanstalk.com/QuestionReview/questions?page=" +
        newPage+
        "&pageSize=" +
        this.state.pageSize+"&catagory="+this.state.catagoryId
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ page:newPage,data: this.state.data.concat(data),fetchingData:false });
      })
      .catch((err) => {
        this.setState({ fetchingData:false });
        console.log(err.message);
      });
  }

  saveItem( index,accepted){
    let arr = this.state.data;
    let item = arr[index]
    arr.splice(index,1);
    this.setState({ data: arr });
    var data =JSON.stringify({ 
      Question: item,Accepted:accepted })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data };

  fetch("http://triviacrack-env.eba-3vx47zu9.us-east-1.elasticbeanstalk.com/QuestionReview/updateQuestion", requestOptions)
      .then(response => this.getNewData())
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
          return (
            <div
              key={question.id}
              style={{
                
                flexDirection: "column",
                display: "flex",
                minHeight: "200px",
                backgroundColor: "#FFF4EE",
                margin: "50px",
                justifyContent: "center",
                alignItems: "center",
              }}
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

              <Dropdown style={{marginTop:"20px"}} as={ButtonGroup}> 
      <Button variant="success">{question.difficulty}</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{
                    let data = this.state.data;
                    data[index2].difficulty="easy"
                    this.setState({data:data})
        }}>Easy</Dropdown.Item>
        <Dropdown.Item onClick={()=>{
                    let data = this.state.data;
                    data[index2].difficulty="medium"
                    this.setState({data:data})
        }}>Medium</Dropdown.Item>
                <Dropdown.Item onClick={()=>{
                    let data = this.state.data;
                    data[index2].difficulty="hard"
                    this.setState({data:data})
        }}>Hard</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  marginBottom: "15px",
                  flexDirection: "row",
                }}
              >


                <Button
                  style={{ backgroundColor: "#352477" }}
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    this.saveItem(index2,true)
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
                    this.saveItem(index2,false)
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
