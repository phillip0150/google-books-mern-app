import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import {Button, Media} from "reactstrap";

var books=require('google-books-search');
class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    desc: "",
    image: "",
    link: "",
    bookSearch: []
  };
  
  componentDidMount() {
    this.loadBooks();
  }
  
  loadBooks = () => {
    API.getBooks()
    .then(res =>
      this.setState({ books: res.data, title: "", author: "", desc: "", image: "", link: "" })
      )
      .catch(err => console.log(err));
    };
    
    deleteBook = id => {
      API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
    };
    

 
    
    render() {
      return (
        <Container fluid>
        <Row>
              <Col size="md-12 sm-12">
              <Jumbotron>
              <h1>Saved Books</h1>
              </Jumbotron>
              {this.state.books.length ? (
                <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                  <Media>
                  <Media left href={book.link}>
                  <Media object src={book.image} alt="Generic placeholder image" />
                  </Media>
                  <Media body>
                  <Media heading>
                  {book.title} by {book.author}
                  </Media>
                  {book.desc}
                  </Media>
                  </Media>
                  
                  <Button href={"books/"+book._id} target="_blank">View Book</Button>
                  
                  <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                  ))}
                  </List>
                  ) : (
                    <h3>No Results to Display</h3>
                    )}
                    </Col>
                    </Row>
                    </Container>
                    
                    
                    );
                  }
                }
                
                export default Books;
                