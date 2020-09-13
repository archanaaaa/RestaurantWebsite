import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button ,Form, FormGroup, Label,Input,Col , FormFeedback} from 'reactstrap'
import {Link} from 'react-router-dom';

class Contact extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstName : '',
            lastName : '',
            telnum : '',
            email : '',
            agree : false,
            contactType : 'Tel.',
            message : '',
            touched : { //keeps track whether a particular field has been touched or not
                firstName : false,
                lastName : false,
                telnum : false,
                email : false
            }

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur=this.handleBlur.bind(this);
    }

    handleInputChange(event){

        const target = event.target; // retrieve the target input from the event that has just been parsed in
                                     
        const value = target.value === 'checkbox' ? target.checked : target.value; // if it is a checkbox then checkbox value is taken else target value is taken
                                                                                   
                                                                                        
        const name = target.name // which input was changed

        this.setState({
            [name] : value //value will be set to corresponding state property i.e using 'name' 
        });

    }

    handleSubmit(event){  //bind this in the constructor so it is available for use
        
        console.log("Current state is : "+JSON.stringify(this.state));
        alert("Current state is : "+JSON.stringify(this.state));
        event.preventDefault(); //to prevent going to the next page after submitting which is usually the default action 
                                
    }

    handleBlur = (field) => (evt) => {
        this.setState ({
            touched : {...this.state.touched , [field] : true}//...means all those props whose states have changed, set their value to true
                                                              
        });
    }

    validate(firstName,lastName,telnum,email){
        const errors = {
            firstName : '',
            lastName : '',
            telnum : '',
            email : '',
        }

        if(this.state.touched.firstName && firstName.length < 3){
            errors.firstName = 'First name should be >=3 characters';
        }

        if(this.state.touched.lastName && lastName.length < 3){
            errors.lastName = 'First name should be >=3 characters';
        }

        const reg = /^\d+$/; // \d === [0-9] (means digit) , * => 0 or more , + => 1 or more 
        if(this.state.touched.telnum && !reg.test(telnum)){//test is a built-in fn that checks for a match in the specified string
                                                                                   
                                                                                   
            errors.telnum = 'Tel. number should contain only numbers';
        }

        

        if(this.state.touched.email && email.split('').filter(x => x === '@').length!==1){
            errors.email = 'email should contain @ symbol';
        }

        return errors;
    }

    render(){ 

        const errors = this.validate(this.state.firstName,this.state.lastName,this.state.telnum,this.state.email);
    return(
        <div className="container">
            <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>

                        <BreadcrumbItem active>
                             Contact US
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us your feedback</h3>
                </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label HtmlFor="firstName" md={2}>First Name</Label>
                                <Col md={10}> 
                                    <Input type="text" id="firstName" name="firstName" placeholder="First Name"
                                            value={this.state.firstName}
                                            valid={errors.firstName === ''}
                                            invalid={errors.firstName !== ''}
                                            onBlur={this.handleBlur('firstName')}
                                            onChange={this.handleInputChange}/>
                                    <FormFeedback>{errors.firstName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label HtmlFor="lastName" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastName" name="lastName" placeholder="Last Name"
                                            value={this.state.lastName}
                                            valid={errors.lastName === ''}
                                            invalid={errors.lastName !== ''}
                                            onBlur={this.handleBlur('lastName')}
                                            onChange={this.handleInputChange}/>
                                     <FormFeedback>{errors.lastName}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label HtmlFor="telnum" md={2}>Tel. Number</Label>
                                <Col md={10}>
                                    <Input type="text" id="telnum" name="telnum" placeholder="Tel. Number"
                                            value={this.state.telnum}
                                            valid={errors.telnum === ''}
                                            invalid={errors.telnum !== ''}
                                            onBlur={this.handleBlur('telnum')}
                                            onChange={this.handleInputChange}/>
                                     <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label HtmlFor="email" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email" placeholder="Email"
                                            value={this.state.email}
                                            valid={errors.email === ''}
                                            invalid={errors.email !== ''}
                                            onBlur={this.handleBlur('email')}
                                            onChange={this.handleInputChange}/>
                                     <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:6 ,offset:2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="agree" checked={this.state.agree} 
                                            onChange={this.handleInputChange}/> {' '}
                                            <strong> May we contact you ? </strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size:3 ,offset:1}}>
                                    <Input type="select" name="contactType" value={this.state.contactType} 
                                    onChange={this.handleInputChange}>
                                    <option>Tel.</option>
                                    <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label HtmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message" rows="6"
                                            value={this.state.message}
                                            onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size:10 , offset:2}}>
                                    <Button type="submit" color="primary">Send Feedback</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        
    );
}
}

export default Contact;