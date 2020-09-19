import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import About from './AboutUsComponent'
import Footer from './FooterComponent';
import {addComment, fetchDishes,fetchComments,fetchPromos} from '../redux/ActionCreator';

import {Route , Switch , Redirect , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

const mapStateToProps = state => { //state is a paramater whic represents redux store states ,
           // and this function will map redux store's state to props which will be available to the components
           //see export
  return {
      dishes : state.dishes,
      comments : state.comments,
      promotions : state.promotions,
      leaders : state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  addComment : (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  //dispatch takes actioncreator as parameter and that needs the four paramters ,
  //basically a function call to the addComment actionCreator
  //function returns action object which is given to dispatcher that is supplied as a function to addComment
  //see export & how this is made use of in the rendering ,DishDetail part and alter dishDetailComp accordingly
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos())
});

class Main extends Component {

  constructor(props) {
    super(props);
   
  }

  componentDidMount(){ //good time to fetch data when the component mounts , call fetch dishes here
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  

  render() {
    const DishWithId = ({match}) =>{
      return(      
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    commentsErrMess={this.props.comments.errMess}
                    addComment={this.props.addComment}
                    />
      );
    }
    const HomePage = () => {
      return( //dishes.dishes because we have changed the state's structure in the dishes reducer
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
        
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path= "/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path= "/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
          <Route path="/aboutus" component={() => <About leaders = {this.props.leaders}/>}/>
          <Redirect to="/home"/>
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));