import Menu from "./Menu";
import styles from './baseLayout.module.css'

function BaseLayout(props) {
  return (
    <div className={styles.baseLayoutContainer}>
      <Menu />
      <img className={styles.logo} src={require("../images/Logo.png")} />
      {props.children}
    </div>
  );
}

export default BaseLayout;
