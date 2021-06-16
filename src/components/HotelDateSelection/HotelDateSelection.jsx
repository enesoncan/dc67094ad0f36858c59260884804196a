import React from "react";

import DatePicker from "react-datepicker";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./HotelDateSelection.module.scss";

const HotelDateSelection = ({
  hotelsList,
  hotelDetails,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  personSize,
  selectedHotel,
  handleHotelSelect,
  handleChangePersonSize,
}) => {
  const options = hotelsList.map((hotel) => {
    const { id, hotel_name } = hotel;
    return { id, label: hotel_name, value: hotel_name };
  });

  return (
    <div className={styles.hotelDateSelectionContainer}>
      <div className={styles.selectHotel}>
        <Select
          placeholder="Otel seçiniz"
          isClearable
          options={options}
          defaultValue={selectedHotel}
          onChange={handleHotelSelect}
        />
      </div>
      <div className={styles.fieldsContainer}>
        <div>
          <h5>Giriş Tarihi</h5>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            dateFormat="yyyy/MM/dd"
          />
        </div>

        <div>
          <h5>Çıkış tarihi</h5>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy/MM/dd"
          />
        </div>

        <div>
          <h5>Yetişkin Sayısı</h5>
          <input
            type="number"
            min="1"
            max={
              hotelDetails.length && hotelDetails[0].max_adult_size
                ? hotelDetails[0].max_adult_size.toString()
                : "5"
            }
            name="adult"
            value={personSize.adult}
            onChange={(e) => handleChangePersonSize(e)}
          />
        </div>

        <div>
          <h5>Çocuk Sayısı</h5>
          <input
            type="number"
            min="0"
            max="5"
            name="child"
            value={personSize.child}
            disabled={!hotelDetails[0]?.child_status}
            onChange={(e) => handleChangePersonSize(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelDateSelection;
