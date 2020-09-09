import React ,{ Component } from 'react'; 
import { Card, CardImg , CardText, CardBody, CardTitle} from 'reactstrap';


class DishDetail extends Component {

    constructor (props){
        super(props);
    }

        renderDish(dish)
        {
            

            if(dish!=null)
            {
                const cmt=this.props.dish.comments.map((comment)=>{
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
                                <Card>
                                    <CardBody>
                                        <CardTitle><h4>Comments</h4></CardTitle>
                                        <CardText>

                                            {cmt}
                                        
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </div>
                        </div> 
                    </div>

                    
                   
                )
            }
            else{
                return(<div></div>);
            }
        }

    

    render(){
        return(
           this.renderDish(this.props.dish)
        );
    }
}

export default DishDetail;