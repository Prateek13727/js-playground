"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _ReactRedux = ReactRedux,
    connect = _ReactRedux.connect,
    Provider = _ReactRedux.Provider; //Helper functions

var getVisibleTodos = function getVisibleTodos(todos, visibilityFilter) {
  switch (visibilityFilter) {
    case 'ACTIVE':
      return todos.filter(function (todo) {
        return !todo.completed;
      });

    case 'COMPLETED':
      return todos.filter(function (todo) {
        return todo.completed;
      });

    default:
      return todos;
  }
}; //action creators


var setVisibiliyFilter = function setVisibiliyFilter(filter) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter: filter
  };
};

var toggleTodo = function toggleTodo(id) {
  return {
    type: 'TOGGLE_TODO',
    id: id
  };
};

var noteId = 0; //AddToDo component

var AddToDo = function AddToDo(_ref) {
  var dispatch = _ref.dispatch;
  var input;
  return React.createElement("div", null, React.createElement("input", {
    ref: function ref(node) {
      input = node;
    }
  }), React.createElement("button", {
    onClick: function onClick() {
      dispatch({
        id: noteId++,
        text: input.value,
        type: 'ADD_TODO'
      });
    }
  }, "ADD TODO"));
};

AddToDo = connect()(AddToDo); //VisibleTodosList and its associated component definition
//To Do component definition

var ToDo = function ToDo(_ref2) {
  var text = _ref2.text,
      completed = _ref2.completed,
      onClick = _ref2.onClick;
  return React.createElement("li", {
    onClick: onClick,
    style: {
      textDecoration: completed ? 'line-through' : 'none'
    }
  }, text);
}; //ToDoList component definition


var ToDoList = function ToDoList(_ref3) {
  var todoList = _ref3.todoList,
      onTodoClick = _ref3.onTodoClick;
  return React.createElement("ul", null, todoList.map(function (todo) {
    return React.createElement(ToDo, _extends({
      key: todo.id
    }, todo, {
      onClick: function onClick() {
        onTodoClick(todo.id);
      }
    }));
  }));
}; //VisibleTodosList component definition without Connnect HOC//

/*
class VisibleTodosList extends React.Component {
		componentWillMount(){
				const { store } = this.context;
				this.unsubscribe = store.subscribe(() => 
						this.forceUpdate()
				);
		}
		componentWillUnmount(){
				this.unsubscribe();
		}
		render() {
				const { store } = this.context;
				const state = store.getState();
				return <ToDoList 
						todoList={
								getVisibleTodos(state.todos, state.visibilityFilter)
						}
						onTodoClick={id => {
								store.dispatch({
										id,
										type: 'TOGGLE_TODO'
								})
						}}
				/>
		}
}

VisibleTodosList.contextTypes = {
		store: PropTypes.object
};

*/
//VisibleTodosList component definition


var mapStateToProps = function mapStateToProps(state) {
  return {
    todoList: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onTodoClick: function onTodoClick(id) {
      dispatch(toggleTodo(id));
    }
  };
};

var VisibleTodosList = connect(mapStateToProps, mapDispatchToProps)(ToDoList); //Footer component and its dependent component definition
//Link component - pure presentational component

var Link = function Link(_ref4) {
  var active = _ref4.active,
      _onClick = _ref4.onClick,
      children = _ref4.children;

  if (active) {
    return React.createElement("span", null, children);
  }

  return React.createElement("a", {
    href: "#",
    onClick: function onClick(e) {
      e.preventDefault();

      _onClick();
    }
  }, children);
}; //Filter Link component without connect component//

/*
class FilterLink extends React.Component {
		componentDidMount(){
				const { store } = this.context;
				this.unsubscribe = store.subscribe(() => 
						this.forceUpdate()
				);
		}
		componentWillUnmount(){
				this.unsubscribe();
		}
		render() {
				const { store } = this.context;
				const state = store.getState();
				const props = this.props;
				return <Link
						active={state.filter === props.filter}
						onClick={() => {
								store.dispatch({
										type: 'SET_VISIBILITY_FILTER',
										filter: props.filter
								})
						}}
				>
						{props.children}
				</Link>
		} 
}

FilterLink.contextTypes = {
		store: PropTypes.object
};
*/
//Filter Link component definition


var mapStateToLinkProps = function mapStateToLinkProps(state, ownProps) {
  return {
    active: state.filter === ownProps.filter
  };
};

var mapDispatchToLinkProps = function mapDispatchToLinkProps(dispatch, ownProps) {
  return {
    onClick: function onClick() {
      dispatch(setVisibiliyFilter(ownProps.filter));
    }
  };
};

var FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link); // Footer component definition

var Footer = function Footer() {
  return React.createElement("div", null, "Show:", " ", React.createElement(FilterLink, {
    filter: "SHOW_ALL"
  }, "All"), " ", React.createElement(FilterLink, {
    filter: "ACTIVE"
  }, "Active"), " ", React.createElement(FilterLink, {
    filter: "COMPLETED"
  }, "Completed"));
};

var ToDoApp = function ToDoApp(_ref5) {
  var visibilityFilter = _ref5.visibilityFilter,
      todos = _ref5.todos;
  var visibleTodos = getVisibleTodos(todos, visibilityFilter);
  return React.createElement("div", null, React.createElement(AddToDo, null), React.createElement(VisibleTodosList, null), React.createElement(Footer, null));
};

var createStore = function createStore(reducer) {
  var state;
  var listners = [];

  var getState = function getState() {
    return state;
  };

  var dispatch = function dispatch(action) {
    state = reducer(state, action);
    listners.forEach(function (listner) {
      return listner();
    });
  };

  var subscribe = function subscribe(listner) {
    listners.push(listner);
    return function () {
      listners = listners.filter(function (l) {
        return l !== listner;
      });
    };
  }; //when an action is dispatched the store calls the reducer it was created with passing
  // the current state, and action as arguments


  dispatch({});
  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe
  };
}; // when an action is dispatched the store calls the reducer it was created with passing
// the current state, and action as arguments
// mimicing combine reducers and creating global state //

/*
const todosApp = (state, action) => {
		return  {
				todos: todos(state.todos, action),
				visibilityFilter: visibilityFilter(state.visibilityFilter, action)
		}
}
*/


var combinedReducers = function combinedReducers(reducers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments.length > 1 ? arguments[1] : undefined;
    return Object.keys(reducers).reduce(function (nextState, key) {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}; //reducer-1 helper


var todo = function todo(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        text: action.text,
        id: action.id,
        completed: false
      };

    case 'TOGGLE_TODO':
      return Object.assign({}, state, {
        completed: !state.completed
      });
  }
}; //reducer-1


var todos = function todos() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_TODO':
      return _toConsumableArray(state).concat([todo(undefined, action)]);

    case 'TOGGLE_TODO':
      return state.map(function (obj) {
        if (obj.id !== action.id) {
          return obj;
        }

        return todo(obj, action);
      });

    default:
      return state;
  }
}; //reducer-2


var visibilityFilter = function visibilityFilter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'SHOW_ALL';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;

    default:
      return state;
  }
}; //root reducer - return reducer object for initializing create-store


var todoApp = combinedReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});
var storeGlobal = createStore(todoApp); // Provider Implementation //

/*
class Provider extends React.Component {
		getChildContext(){
				return {
						store: this.props.store
				};
		}

		render(){
				return this.props.children
		}
}

Provider.childContextTypes = {
		store: PropTypes.object
}
*/

var render = function render() {
  ReactDOM.render(React.createElement(Provider, {
    store: storeGlobal
  }, React.createElement(ToDoApp, null)), document.getElementById('root'));
};

storeGlobal.subscribe(render);
render();

var debugReduxState = function debugReduxState(store) {
  console.log('Initial state:');
  console.log(store.getState());
  console.log('--------------');
  console.log('Dispatching ADD_TODO.');
  store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  });
  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');
  console.log('Dispatching SET_VISIBILITY_FILTER');
  store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_COMPLETED'
  });
  console.log('Current state:');
  console.log(store.getState());
  console.log('--------------');
};
