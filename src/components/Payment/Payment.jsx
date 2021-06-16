import React, { useState, useEffect } from "react";
import {
  dateRangeCalculator,
  formatDate,
  priceFormatter,
  totalPriceCalculator,
} from "../../utils/helpers";
import { months, years } from "./staticDates";

import Button from "../Button";
import styles from "./Payment.module.scss";

const Payment = ({
  hotelDetails,
  selectedRoomType,
  selectedRoomScenic,
  startDate,
  endDate,
  adult,
  child,
  couponCode,
  selectedHotel,
  setCouponCode,
  setTotalPrice,
  cardInformations,
  handleChangeCardValues,
}) => {
  const [selectedRoomDetail, setSelectedRoomDetail] = useState();
  const [selectedScenicDetail, setSelectedScenicDetail] = useState();
  const [couponDetail, setCouponDetail] = useState();
  const { card_name, card_number, card_date_year, card_date_month, card_cvv } =
    cardInformations;

  useEffect(() => {
    if (hotelDetails && hotelDetails.length) {
      const selectedRoom = hotelDetails.map((item) =>
        item.room_type.filter((room) => room.id === selectedRoomType)
      );
      setSelectedRoomDetail(selectedRoom[0][0]);

      const selectedScenic = hotelDetails.map((item) =>
        item.room_scenic.filter((scenic) => scenic.id === selectedRoomScenic)
      );
      setSelectedScenicDetail(selectedScenic[0][0]);
    }
    const price = totalPriceCalculator(
      hotelDetails,
      selectedRoomType,
      selectedRoomScenic,
      startDate,
      endDate
    );

    setTotalPrice(price);
  }, [hotelDetails, selectedRoomType, selectedRoomScenic]);

  const handlePostCouponCode = () => {
    if (couponCode) {
      fetch(
        `https://5f6d939160cf97001641b049.mockapi.io/tkn/coupons?code=${couponCode}`
      )
        .then((response) => response.json())
        .then((data) => setCouponDetail(data[0]));
    }
  };

  return (
    <div className={styles.payment}>
      <div className={styles.creditCardContainer}>
        <div className={styles.card}>
          <div className={styles.elements}>
            <div className={styles.images}>
              {card_number.charAt(0) === "5" && (
                <img
                  src="https://image.flaticon.com/icons/svg/196/196561.svg"
                  alt="MasterCard"
                />
              )}
              {card_number.charAt(0) === "4" && (
                <img
                  src="https://image.flaticon.com/icons/svg/196/196578.svg"
                  alt="Visa"
                />
              )}
            </div>
            <strong>{card_number.replace(/(\d{4}(?!\s))/g, "$1 ")}</strong>
            <span>
              {card_date_month} / {card_date_year}
            </span>
            <h1>{card_name}</h1>
          </div>
        </div>

        <div className={styles.form}>
          <input
            type="text"
            name="card_number"
            value={card_number}
            placeholder="Kart Numarası"
            maxLength="16"
            onChange={handleChangeCardValues}
          />
          <input
            type="text"
            name="card_name"
            value={card_name}
            placeholder="Kart Üzerindeki İsim"
            onChange={handleChangeCardValues}
          />
          <div>
            <select
              name="card_date_month"
              value={card_date_month}
              onChange={handleChangeCardValues}
            >
              {months.map((month) => {
                const { value, label } = month;
                return (
                  <option key={value} value={value} disabled={value === "ay"}>
                    {label}
                  </option>
                );
              })}
            </select>
            <select
              name="card_date_year"
              value={card_date_year}
              onChange={handleChangeCardValues}
            >
              {years.map((year) => {
                const { value, label } = year;
                return (
                  <option key={value} value={value} disabled={value === "yil"}>
                    {label}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              name="card_cvv"
              placeholder="CVV"
              maxLength="3"
              minLength="3"
              value={card_cvv}
              onChange={handleChangeCardValues}
            />
          </div>
        </div>
      </div>
      <div className={styles.paymentDetail}>
        <h1>{selectedHotel.label}</h1>

        <div className={styles.infoContainer}>
          <p>Giriş Tarihi:</p>
          <span>{formatDate(startDate)}</span>
        </div>
        <div className={styles.infoContainer}>
          <p>Çıkış Tarihi:</p>
          <span>{formatDate(endDate)}</span>
        </div>
        <div className={styles.infoContainer}>
          <p>Yetişkin:</p>
          <span>{adult}</span>
        </div>
        <div className={styles.infoContainer}>
          <p>Çocuk:</p>
          <span>{child}</span>
        </div>
        <div className={styles.infoContainer}>
          <p>Oda Tipi:</p>
          <span>{selectedRoomDetail?.title}</span>
        </div>
        <div className={styles.infoContainer}>
          <p>Manzara:</p>
          <span>{selectedScenicDetail?.title}</span>
        </div>

        <div className={styles.couponCode}>
          <input
            type="text"
            placeholder="Kupon Kodu"
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <Button
            variation="primary"
            label="Kodu Kullan"
            onClick={handlePostCouponCode}
          />
        </div>

        <div className={styles.paymentInfo}>
          <div className={styles.infoBox}>
            <strong>Oda Fiyatı:</strong>
            <span>{priceFormatter.format(selectedRoomDetail?.price)}</span>
          </div>
          <div className={styles.infoBox}>
            <strong>Fiyat Etki Oranı:</strong>
            <span>%{selectedScenicDetail?.price_rate}</span>
          </div>

          <div className={styles.infoBox}>
            <strong>
              Konaklama ({dateRangeCalculator(startDate, endDate)} Gün):
            </strong>
            <span>
              {priceFormatter.format(
                dateRangeCalculator(startDate, endDate) *
                  selectedRoomDetail?.price
              )}
            </span>
          </div>
          {couponDetail ? (
            <div className={styles.infoBox}>
              <strong>İndirim ({couponDetail.code}):</strong>
              <span>
                -{priceFormatter.format(couponDetail.discount_ammount)}
              </span>
            </div>
          ) : null}

          <div className={styles.totalPrice}>
            <h2>Toplam Tutar</h2>
            <h1>
              {couponDetail
                ? priceFormatter.format(
                    totalPriceCalculator(
                      hotelDetails,
                      selectedRoomType,
                      selectedRoomScenic,
                      startDate,
                      endDate
                    ) - couponDetail?.discount_ammount
                  )
                : priceFormatter.format(
                    totalPriceCalculator(
                      hotelDetails,
                      selectedRoomType,
                      selectedRoomScenic,
                      startDate,
                      endDate
                    )
                  )}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
