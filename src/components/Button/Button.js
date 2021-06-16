import React from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

const Button = ({ label, variation, ...attrs }) => {
  return (
    <button className={cn(styles.button, styles[variation])} {...attrs}>
      {label}
    </button>
  );
};

export default Button;
