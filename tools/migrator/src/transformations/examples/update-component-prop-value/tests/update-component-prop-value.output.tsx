import React from 'react';

const MyComponent = (props: any) => {
  return <p>Testing {props.children}</p>;
};

const Child = (props: any) => {
  return <p>Testing {props.children}</p>;
};

export const App = () => {
  return (
    <MyComponent prop="newPropValue" foo="bar">
      Hello
      <Child prop="value" />
    </MyComponent>
  );
};
