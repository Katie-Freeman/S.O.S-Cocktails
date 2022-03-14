import Menu from "./Menu";

function BaseLayout(props) {
  return (
    <div>
      <Menu />
      <h1>BaseLayout</h1>
      {props.children}
    </div>
  );
}

export default BaseLayout;
