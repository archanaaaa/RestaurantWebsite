import React  from 'react'; 
import { Card, CardImg , CardText, CardBody, CardTitle , Breadcrumb ,BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import  SubmitComment  from './CommentForm';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

    function RenderDish({dish})
    {
      
                return(                 
                    
                    <div>   
                        
                            
                                <Card>
                                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                                    <CardBody>
                                            <CardTitle>{dish.name}</CardTitle>
                                            <CardText>{dish.description}</CardText>
                                    </CardBody> 
                                </Card>
                                                                
                        
                    </div>
                );
           
          

        }

        function RenderComments({comment,addComment,dishId})
        {
            
            const cmt=comment.map((comment)=>{
                return(
                    
                        <div className="container">
                            
                                    <div className="row">
                                        <p>{comment.comment}</p>
                                    </div>
                                    <div className="row">
                                        <p>--{comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </div>
                                    
                                    
                        </div>           
                );
            });
           
            return(
            <div className="container">
                
                <Card>
                <CardBody>
                    <CardTitle><h4>Comments</h4></CardTitle>
                    <CardText>

                        {cmt}    
                
                    </CardText>
                    <SubmitComment dishId={dishId} addComment={addComment}/>

                </CardBody>
                </Card>
                
                    
                
                </div>
            
            );
           
                
            }
           
        

    

    function DishDetail(props){

        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }

        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }

        else if(props.dish != null){ 
            return(
                <div className="container">
                        <div className="row">
                        <Breadcrumb>
                        
                            <BreadcrumbItem>
                                <Link to="/menu">Menu</Link>
                            </BreadcrumbItem>
    
                            <BreadcrumbItem active>
                                {props.dish.name}
                            </BreadcrumbItem>
    
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div> 
                    <div className="container">
                    <div class="row">
                    <div class="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}/>
                    </div>
                    <div class="col-12 col-md-5 m-1">
                    <RenderComments comment = {props.comment}
                                    addComment = {props.addComment}
                                    dishId = {props.dish.id}
                                    
                                    />
                    </div>
                    </div>
                    </div>
                   
                   
               </div>
            );

        }
    }  
            
        
       
    


export default DishDetail;
