// Для управления состоянием использовать class
import React, { Component } from 'react';

import ReactAux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2
    },
    totalPrice: 4
  }
  
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    // console.log('[oldCount] ' + oldCount);
    const updatedCount = oldCount + 1;
    // console.log('[updatedCount] ' + updatedCount);
    const updatedIngredients = {
      ...this.state.ingredients
    };
    // console.dir(updatedIngredients);
    updatedIngredients[type] = updatedCount;
    // console.log(updatedIngredients[type]);

    const priceAddition = INGREDIENT_PRICES[type];
    // console.log(priceAddition);
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    })
  }

  removeIngredientHandler = (type) => {

  }

  render() {
    return (
      <ReactAux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler} />
      </ReactAux>
    );
  }
}

export default BurgerBuilder;