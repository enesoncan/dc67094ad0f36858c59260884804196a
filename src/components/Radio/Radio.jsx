import React from "react";
import cn from "classnames";
import styles from "./Radio.module.scss";

const Radio = ({
  selected,
  onChange,
  label,
  value,
  image,
  dayRange,
  adult,
  price,
  priceRate,
}) => {
  return (
    <div
      className={styles.modernRadioContainer}
      onClick={() => {
        onChange(value);
      }}
    >
      <div
        className={cn(
          styles.radioOuterCircle,
          value !== selected && styles.unselected
        )}
      >
        <div className={styles.content}>
          <h5>{label}</h5>
          <img src={image} alt={label} />
          <div className={styles.informations}>
            {priceRate ? (
              <>
                <div>
                  <p>Fiyat Etki Oranı</p>
                </div>
                <div>
                  <p>+{priceRate}%</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p>{dayRange} Gün</p>
                  <p>{adult} Yetişkin</p>
                </div>

                <div>
                  <p>{price}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Radio;
