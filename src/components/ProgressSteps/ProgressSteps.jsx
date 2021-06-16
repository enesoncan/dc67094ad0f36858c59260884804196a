import React from "react";
import cn from "classnames";

import { connect } from "react-redux";

import styles from "./ProgressSteps.module.scss";

const ProgressSteps = ({ activeTab }) => {
  return (
    <div className={styles.steps}>
      <div className={styles.progressContainer}>
        <div
          className={styles.progress}
          id={styles.progress}
          style={{ width: (activeTab - 1) * 50 + "%" }}
        ></div>
        <div className={cn(styles.circle, activeTab >= 1 && styles.active)}>
          1
        </div>
        <div className={cn(styles.circle, activeTab >= 2 && styles.active)}>
          2
        </div>
        <div className={cn(styles.circle, activeTab >= 3 && styles.active)}>
          3
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { activeTab: state.activeTab };
};

export default connect(mapStateToProps)(ProgressSteps);
