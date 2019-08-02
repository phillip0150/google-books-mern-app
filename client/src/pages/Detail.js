import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    book: {}
  };


  componentDidMount = () => {
    API.getBook(this.props.match.params.id).then(res => {
      // console.log(res.data);
      this.setState({book: res.data});
    })
  }



  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.book.title} by {this.state.book.author}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <Media>
                  <Media left href={this.state.book.link}>
                  <Media object src={this.state.book.thumbnail} alt="Generic placeholder image" />
                  </Media>
                  <Media body>
                  <h1>Description</h1>
                  <p>{this.state.book.desc}</p>
                  </Media>
                  </Media>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back Home</Link>
            <br></br>
            <Link to="/saved">← Back To Saved Books</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
