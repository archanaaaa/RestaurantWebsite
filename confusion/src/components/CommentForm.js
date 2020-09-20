import React, {Component} from 'react';
import {Button, Label,Col,Row,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {Control, LocalForm,Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);


class SubmitComment extends Component {

    constructor(props){
        super(props);

        this.state = {
            isModalOpen : false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        
    }

    toggleModal()
    {
        this.setState({
            isModalOpen : !this.state.isModalOpen
        });
    }

   

    handleSubmit(values){  //bind this in the constructor so it is available for use
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.name, values.message)
        //console.log("Current state is : "+JSON.stringify(values));
        //alert("Current state is : "+JSON.stringify(values));
        //event.preventDefault(); //to prevent going to the next page after submitting which is usually the default action 
                                
    }

    render(){ 
    return(
        <div className="container">
             <Button onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Submit Comments
            </Button>
            <Modal  isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                            <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label HtmlFor="message" md={4}>Your Feedback</Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message" rows="6"
                                                        className="form-control"/>
                                           
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                </ModalBody>
            </Modal>
        </div>

    );
    }
}

export default SubmitComment;