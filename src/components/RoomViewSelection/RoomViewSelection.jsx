import React from "react";
import { priceFormatter, formatDate } from "../../utils/helpers";
import Radio from "../Radio";
import styles from "./RoomViewSelection.module.scss";

const RoomViewSelection = ({
  roomTypeList,
  roomScenicList,
  selectedRoomType,
  selectedRoomScenic,
  setSelectedRoomType,
  setSelectedRoomScenic,
  dayRange,
  adult,
  child,
  startDate,
  endDate,
  selectedHotel,
  hotelDetails,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.reservationInformations}>
        <div>
          <h1>
            {selectedHotel.label} <span>({hotelDetails.city})</span>
          </h1>
        </div>
        <div className={styles.infoDetail}>
          <span>
            <b>Giriş Tarihi:</b> {formatDate(startDate)}
          </span>
          <span>
            <b>Çıkış Tarihi:</b> {formatDate(endDate)}
          </span>
          <span>
            <b>Yetişkin:</b> {adult}
          </span>
          <span>
            <b>Çocuk:</b> {child}
          </span>
        </div>
      </div>
      <div className={styles.roomsContainer}>
        <h2>Oda Seçimi</h2>
        <div>
          {roomTypeList.map((room) => {
            const { id, title, photo, price } = room;
            return (
              <div className={styles.room} key={id}>
                <Radio
                  value={id}
                  label={title}
                  image={photo}
                  price={priceFormatter.format(price)}
                  adult={adult}
                  dayRange={dayRange}
                  selected={selectedRoomType}
                  onChange={setSelectedRoomType}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.scenicContainer}>
        <h2>Manzara Seçimi</h2>
        <div>
          {roomScenicList.map((scenic) => {
            const { id, title, photo, price_rate } = scenic;
            return (
              <div className={styles.scenic} key={id}>
                <Radio
                  value={id}
                  label={title}
                  image={photo}
                  priceRate={price_rate}
                  selected={selectedRoomScenic}
                  onChange={setSelectedRoomScenic}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomViewSelection;
