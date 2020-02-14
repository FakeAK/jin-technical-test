import React from 'react';
import ErrorTopBar from '../common/ErrorTopBar';

const Container = (Component) => (props) => {
  return (
    <Component>
      {
        props.error &&
        <ErrorTopBar error={props.error} />
      }
      {props.children}
    </Component>
  );
};

const ContainerHOC = Container(({ children }) => {
  return (
    <div>{children}</div>
  );
});

export default ContainerHOC;