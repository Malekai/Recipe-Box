"use strict";

var _ReactBootstrap = ReactBootstrap;
var Modal = _ReactBootstrap.Modal;
var Input = _ReactBootstrap.Input;
var Button = _ReactBootstrap.Button;

var modalName = "Add New Recipe";
var editRecipe = "";
var editIngredient = [];

var Recipes = React.createClass({
  displayName: "Recipes",

  // hook up data model
  getInitialState: function getInitialState() {
    return {
      recipeStorageKey: "_malekai_recipes",
      showModal: false,
      editing: false,
      recipeList: [{ recipe: "Malek's Protein Shake", ingredients: ['1 Glass of Whole Milk', '6 tablespoons of Peanut Butter', '1 scoop of Whey', '2 Bananas', '1 scoop of Vanilla Ice Cream'] }, { recipe: 'Pumpkin Pie', ingredients: ['Pumpkin Puree', 'Sweetened Condensed Milk', 'Eggs', 'Pumpkin Pie Spice', 'Pie Crust'] }, { recipe: 'Spaghetti with fried eggs', ingredients: ['Noodles', 'Tomato Sauce', 'Meatballs', '4 eggs', 'Ground black pepper'] }]
    };
  },

  componentDidMount: function componentDidMount() {
    var recipesStore = localStorage.getItem(this.recipeStorageKey);
    if (recipesStore) this.setState({ recipes: JSON.parse(recipesStore) });
  },

  ingredientList: function ingredientList(ingredients) {
    return ingredients.map(function (ingredient, i) {
      return React.createElement(
        "li",
        { key: i, index: i, className: "list-group-item" },
        ingredient
      );
    });
  },

  eachRecipe: function eachRecipe(item, i) {
    return React.createElement(
      "div",
      { key: i, index: i, className: "panel panel-default" },
      React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
          "h3",
          { className: "panel-title" },
          item.recipe
        )
      ),
      React.createElement(
        "div",
        { className: "panel-body" },
        React.createElement(
          "ul",
          { className: "list-group" },
          this.ingredientList(item.ingredients)
        ),
        React.createElement(
          "button",
          { name: i, onClick: this.edit.bind(this, i), type: "button", className: "btn-sm btn-info", "data-toggle": "modal", "data-target": "#myModal" },
          "Edit"
        ),
        React.createElement(
          "button",
          { onClick: this.remove.bind(this, i), type: "button", className: "btn-sm btn-danger" },
          "Remove"
        )
      )
    );
  },

  add: function add() {
    var i = this.state.editIdx;
    var name = this.refs.userVal.value;
    var items = this.refs.newIngredients.value.split(",");
    if (this.state.editing) {
      var arr = this.state.recipeList.slice();
      arr[i] = { recipe: name, ingredients: items };
      this.setState({ recipeList: arr });
    } else {
      this.setState({ recipeList: [].concat(this.state.recipeList, [{ recipe: name, ingredients: items }]) });
    }
    this.close();
  },

  edit: function edit(i, recipe, ingredients) {
    this.setState({
      editing: true,
      editIdx: i
    });
    this.open();
    modalName = "Edit";
    var arr = this.state.recipeList.slice();
    editRecipe = arr[i].recipe;
    editIngredient = arr[i].ingredients;
  },

  remove: function remove(i) {
    var arr = this.state.recipeList.slice(); //copy array
    arr.splice(i, 1); //remove element
    this.setState({ recipeList: arr }); //update state
  },

  close: function close() {
    this.setState({ editing: false });
    this.setState({ showModal: false });
    modalName = "Add New Recipe";
    editRecipe = "";
    editIngredient = "";
  },
  open: function open() {
    this.setState({ showModal: true });
  },

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          { onClick: this.open, type: "button", className: "btn btn-success btn-lg", "data-toggle": "modal", "data-target": "#myModal" },
          "Add Recipe"
        ),
        React.createElement(
          Modal,
          { show: this.state.showModal, onHide: this.close },
          React.createElement(
            Modal.Header,
            { closeButton: true },
            React.createElement(
              Modal.Title,
              null,
              modalName
            )
          ),
          React.createElement(
            Modal.Body,
            null,
            React.createElement(
              "form",
              null,
              React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                  "label",
                  { "for": "name" },
                  "Recipe"
                ),
                React.createElement("input", { type: "text", ref: "userVal", className: "form-control", id: "name", placeholder: "Recipe Name", defaultValue: editRecipe, required: true })
              ),
              React.createElement(
                "div",
                { className: "form-group" },
                React.createElement(
                  "label",
                  { "for": "ingredients" },
                  "Ingredients"
                ),
                React.createElement("input", { type: "text", ref: "newIngredients", className: "form-control", id: "ingredients", placeholder: "Enter Ingredients,Separated,By,Commas", defaultValue: editIngredient, required: true })
              )
            )
          ),
          React.createElement(
            Modal.Footer,
            null,
            React.createElement(
              Button,
              { className: "btn btn-primary", "data-dismiss": "modal", onClick: this.add },
              "Submit"
            ),
            React.createElement(
              Button,
              { className: "btn btn-default", onClick: this.close },
              "Close"
            )
          )
        ),
        React.createElement(
          "div",
          { className: "panelArea" },
          this.state.recipeList.map(this.eachRecipe)
        )
      )
    );
  }
});

ReactDOM.render(React.createElement(Recipes, null), document.getElementById('master'));