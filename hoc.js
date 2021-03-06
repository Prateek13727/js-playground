import React from 'react'

const App = ({name}) => {
  return (
    <div>
        <UpperCaseUsername>Kingsley</UpperCaseUsername>
    </div>
  )
}

const hoc = (WrappedComponent) => (props) => {
  return (
    <div>
      <WrappedComponent {...props}>
        {props.children.toUpperCase()}
      </WrappedComponent>
    </div>
  )
}

const Username = (props) => (
  <div>{props.children}</div>
)

const UpperCaseUsername = hoc(Username)


export default App;