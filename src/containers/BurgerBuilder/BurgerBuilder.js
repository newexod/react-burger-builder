import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import ReactAux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/index'; // index можно не писать

export const burgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const { onInitIngredients } = props;

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

      return sum > 0;
  }

  const purchasaHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  }

  const disabledInfo = {
    ...props.ings
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (props.ings) {
    burger = (
      <ReactAux>
        <Burger ingredients={props.ings} />
        <BuildControls 
          ingredientAdded={props.onIngredientAdded} 
          ingredientRemove={props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(props.ings )}
          ordered={purchasaHandler}
          price={props.price}
          isAuth={props.isAuthenticated}
        />
      </ReactAux>
    );

    orderSummary = <OrderSummary 
      ingredients={props.ings}
      price={props.price}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler} 
    />;
  }

  return (
    <ReactAux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler} >
        {orderSummary}
      </Modal>
      {burger}
    </ReactAux>
  );
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));