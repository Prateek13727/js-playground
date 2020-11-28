var deepFreeze = require('deep-freeze');

const addCounter = (list) => {
    return [...list, 0]
}

const addCounterTest = () => {
    let listBefore = [];
    let listAfter = [0];

    deepFreeze(listBefore)

    test('addCounter', () => {
        expect(addCounter(listBefore)).toEqual(listAfter)
    });
}

const removeCounter = (list, index) => {
    return [
        ...list.slice(0, index),
        ...list.slice(index+1)
    ]
}

const removeCounterTest = () => {
    let listBefore = [10,20,30];
    let listAfter = [10,30];

    deepFreeze(listBefore)

    test('removeCounter', () => {
        expect(removeCounter(listBefore, 1)).toEqual(listAfter)
    });
}

const incrementCounter = (list, index) => {
    return [
        ...list.slice(0, index),
        list[index]+1,
        ...list.slice(index+1)
    ]
}

const incrementCounterTest = () => {
    let listBefore = [10,20,30];
    let listAfter = [10,21,30];

    deepFreeze(listBefore)

    test('incrementCounter', () => {
        expect(incrementCounter(listBefore, 1)).toEqual(listAfter)
    });
}

const toggleToDo = (todo) => {
    return Object.assign({}, todo, {
        completed: !todo.completed
    });
}

const toggleToDoTest = () => {
    const todoBefore = {
        id: 0,
        text: "hey",
        completed: true
    }

    deepFreeze(todoBefore);

    const todoAfter = {
        id: 0,
        text: "hey",
        completed: false
    }

    test("toggletoDo", () => {
        expect(toggleToDo(todoBefore)).toEqual(todoAfter);
    })
}

addCounterTest();
removeCounterTest();
incrementCounterTest();
toggleToDoTest();

console.log("all tests passed")