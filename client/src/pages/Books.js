import React, { Component } from "react";
// import DeleteBtn from "../components/DeleteBtn";
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
    
    // deleteBook = id => {
    //   API.deleteBook(id)
    //   .then(res => this.loadBooks())
    //   .catch(err => console.log(err));
    // };
    
    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };
    
    saveBook = book => {
      
      API.saveBook({
        title: book.title,
        author: book.authors[0],
        desc: book.description,
        image: book.thumbnail,
        link: book.link
      })
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
    }
    
    handleFormSubmit = event => {
      event.preventDefault();
      console.log("in handleform");
      books.search(this.state.title, (error, results) => {
        console.log(results);
        this.setState({bookSearch: results});
      });
    };
    
    render() {
      return (
        <Container fluid>
        <Row>
        <Col size="md-12">
        <Jumbotron>
        <h1>Google Book Search!</h1>
        </Jumbotron>
        <form>
        <Input
        value={this.state.title}
        onChange={this.handleInputChange}
        name="title"
        placeholder="Title (required)"
        />
        <FormBtn
        disabled={!(this.state.title)}
        onClick={this.handleFormSubmit}
        >
        Submit Book
        </FormBtn>
        </form>
        </Col>
        <Col size="md-12 sm-12">
        <Jumbotron>
        <h1>Book Results</h1>
        </Jumbotron>
        {this.state.booksSearch.length ? (
                <List>
                {this.state.bookSearch.map(book => (
                  <ListItem key={book.link}>
                  <Media>
                  <Media left href={book.link}>
                  <Media object src={book.thumbnail} alt="Generic placeholder image" />
                  </Media>
                  <Media body>
                  <Media heading>
                  {book.title} by {book.authors}
                  </Media>
                  {book.description}
                  </Media>
                  </Media>
                  
                  <Button href={book.link} target="_blank">View Book</Button>
                  
                  <Button onClick={() => this.saveBook(book)}>Save</Button>
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
                