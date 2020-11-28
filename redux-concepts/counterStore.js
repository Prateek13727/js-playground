// import React from 'react';
// import {createStore} from  'redux';
const createStore = (reducer) => {
    let state;
    let listners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action)
        listners.forEach(listner => listner())
    }

    const subscribe = (listner) => {
        listners.push(listner);
        return () => {
            listners = listners.filter(l => l !== listner)
        }
    }

    dispatch({});

    return { getState, dispatch, subscribe }
}

const reducer = (state=0, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state+1;
        case 'DECREMENT':
            return state-1;
        default:
            return state;
    }
}

const store = createStore(reducer);

const render = () => {
    ReactDOM.render(
    <Counter 
        counter={store.getState()} 
        onIncrement={() => {
            store.dispatch({type: 'INCREMENT'})
        }}
        onDecrement={() => {
            store.dispatch({type: 'DECREMENT'})
        }}/>, document.getElementById('app')
    )
}

store.subscribe(render);

class Counter extends React.Component {
    render(){
        const { counter, onDecrement, onIncrement } = this.props;
        return <div>
            <div>
                Counter
                <div>{counter}</div>
            </div>
            <button onClick={onDecrement}>-</button>
            <button onClick={onIncrement}>+</button>
        </div>
    } 
}

render();