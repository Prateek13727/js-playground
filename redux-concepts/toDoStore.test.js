var deepFreeze = require('deep-freeze');

const todos = (state=[], action) => {
    switch(action.type){
        case 'ADD_TODO':
            return [
                ...state,
                {
                  text: action.text,
                  id: action.id,
                  completed: false
                }
            ]
        default:
            return state
    }
}

const testAddToDo = () =>{
    const stateBefore = [];
    const stateAfter = [{
        text: "hey",
        completed: false,
        id:0
    }]
    const action = {
        type: 'ADD_TODO',
        text: "hey",
        id: 0,
    }
    deepFreeze(stateBefore);
    deepFreeze(action);

    test('add to do', () => {
        expect(todos(stateBefore, action)).toEqual(stateAfter)  
    })
}

testAddToDo();