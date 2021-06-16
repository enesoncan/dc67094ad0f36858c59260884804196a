import React from "react";

import { connect } from "react-redux";

import Button from "../Button";
import styles from "./PrevNextSteps.module.scss";

const PrevNextSteps = ({
  activeTab,
  increment,
  decrement,
  disabledNextButton,
  values,
  makeReservation,
}) => {
  return (
    <div className={styles.prevNextSteps}>
      <Button
        label="Geri"
        variation="primary"
        disabled={activeTab <= 1}
        onClick={decrement}
      />

      {activeTab < 3 ? (
        <Button
          variation="primary"
          label="Kaydet ve Devam Et"
          disabled={disabledNextButton}
          onClick={increment}
        />
      ) : (
        <Button
          variation="primary"
          label="Ödemeyi Yap ve Bitir"
          onClick={makeReservation}
          disabled={
            !values.card_number ||
            !values.card_name ||
            !values.card_date_month ||
            !values.card_date_year ||
            !values.card_cvv
          }
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { activeTab: state.activeTab };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrevNextSteps);
