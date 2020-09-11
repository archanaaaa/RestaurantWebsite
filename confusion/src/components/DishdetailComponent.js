import React  from 'react'; 
import { Card, CardImg , CardText, CardBody, CardTitle} from 'reactstrap';

    function RenderDish({dish})
    {
        if(dish!=null)
            {
                return(                 

                    <div className="container"> 
                        <div className="row">
                            <div className="col-12 col-md-5 m-1"> 
                                <Card>
                                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                                    <CardBody>
                                            <CardTitle>{dish.name}</CardTitle>
                                            <CardText>{dish.description}</CardText>
                                    </CardBody> 
                                </Card>
                            </div>                    
                            <div className="col-12 col-md-5 m-1"> 
                                <RenderComments comments = {dish.comments} />
                            </div>
                            

                        </div> 
                    </div>
                )
            }
            else{
                return(<div></div>);
            }

        }

        function RenderComments({comments})
        {
            const cmt=comments.map((comment)=>{
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
            <div>
                <Card>
                <CardBody>
                    <CardTitle><h4>Comments</h4></CardTitle>
                    <CardText>

                        {cmt}    
                
                    </CardText>
                </CardBody>
                </Card>
            </div>
            );
                
            }
           
        

    

    function DishDetail(props){
        return(
            <div> 
           <RenderDish dish={props.dish}/>
           </div>
        );
    }


export default DishDetail;
