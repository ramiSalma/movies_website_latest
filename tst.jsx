
const withLogger = (WrappedComponent) => (props) => {
  console.log(`Rendering ${WrappedComponent.name}`);
  return <WrappedComponent {...props} />;
};
