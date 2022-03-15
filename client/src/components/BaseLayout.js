import Menu from "./Menu";
import styles from './baseLayout.module.css'

function BaseLayout(props) {
  return (
    <div className={styles.baseLayoutContainer}>
      <Menu />
      <img src= 'images/Logo.png'/>
      {props.children}
    </div>
  );
}

export default BaseLayout;
