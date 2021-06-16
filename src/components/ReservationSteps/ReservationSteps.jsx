import React, { useState, useEffect } from "react";

import { connect } from "react-redux";

import HotelDateSelection from "../HotelDateSelection";
import RoomViewSelection from "../RoomViewSelection";
import Payment from "../Payment";

import Button from "../Button";
import PrevNextSteps from "../PrevNextSteps";
import ProgressSteps from "../ProgressSteps";

import styles from "./ReservationSteps.module.scss";
import { dateRangeCalculator, formatDate } from "../../utils/helpers";

const ReservationSteps = ({ activeTab }) => {
  const [createdReservation, setCreatedReservation] = useState(true);
  const [hotelsList, setHotelsList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelDetails, setHotelDetails] = useState([]);
  const [personSize, setPersonSize] = useState({
    adult: 1,
    child: 0,
  });

  const [selectedRoomType, setSelectedRoomType] = useState(1);
  const [selectedRoomScenic, setSelectedRoomScenic] = useState(1);

  const [cardInformations, setCardInformations] = useState({
    card_name: "",
    card_number: "",
    card_date_month: "",
    card_date_year: "",
    card_cvv: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [totalPrice, setTotalPrice] = useState();

  const values = {
    hotel_id: hotelDetails.length ? hotelDetails[0].hotel_id : null,
    start_date: formatDate(startDate),
    end_date: endDate && formatDate(endDate),
    room_type: selectedRoomType,
    room_scenic: selectedRoomScenic,
    coupon_code: couponCode,
    price: totalPrice,
    ...personSize,
    ...cardInformations,
  };

  useEffect(() => {
    fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels")
      .then((response) => response.json())
      .then((data) => setHotelsList(data));
  }, []);

  useEffect(() => {
    fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details")
      .then((response) => response.json())
      .then((data) =>
        setHotelDetails(data.filter((item) => item.id === selectedHotel?.id))
      );
  }, [selectedHotel]);

  const handleHotelSelect = (selectedHotel) => {
    setSelectedHotel(selectedHotel);
  };

  const handleChangePersonSize = (e) => {
    e.preventDefault();
    const val = e.target.value;
    const name = e.target.name;

    setPersonSize({ ...personSize, [name]: val });
  };

  const handleChangeCardValues = (e) => {
    setCardInformations({
      ...cardInformations,
      [e.target.name]: e.target.value,
    });
  };

  const makeReservation = () => {
    fetch("https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        setCreatedReservation(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  let CurrentStep;

  switch (activeTab) {
    case 1:
      CurrentStep = (
        <HotelDateSelection
          hotelsList={hotelsList}
          hotelDetails={hotelDetails}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          personSize={personSize}
          selectedHotel={selectedHotel}
          handleHotelSelect={handleHotelSelect}
          handleChangePersonSize={handleChangePersonSize}
        />
      );
      break;
    case 2:
      CurrentStep = (
        <RoomViewSelection
          roomTypeList={hotelDetails.length && hotelDetails[0].room_type}
          roomScenicList={hotelDetails.length && hotelDetails[0].room_scenic}
          selectedRoomType={selectedRoomType}
          selectedRoomScenic={selectedRoomScenic}
          setSelectedRoomType={setSelectedRoomType}
          setSelectedRoomScenic={setSelectedRoomScenic}
          dayRange={dateRangeCalculator(startDate, endDate)}
          adult={personSize.adult}
          child={personSize.child}
          selectedHotel={selectedHotel}
          startDate={startDate}
          endDate={endDate}
          hotelDetails={hotelDetails.length > 0 && hotelDetails[0]}
        />
      );
      break;
    case 3:
      CurrentStep = (
        <Payment
          child={personSize.child}
          adult={personSize.adult}
          hotelDetails={hotelDetails}
          selectedRoomType={selectedRoomType}
          selectedRoomScenic={selectedRoomScenic}
          startDate={startDate}
          endDate={endDate}
          couponCode={couponCode}
          selectedHotel={selectedHotel}
          setCouponCode={setCouponCode}
          setTotalPrice={setTotalPrice}
          cardInformations={cardInformations}
          handleChangeCardValues={handleChangeCardValues}
        />
      );
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      {createdReservation ? (
        <div className={styles.successContainer}>
          <span>
            <svg
              class={styles.checkmark}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 40 40"
            >
              <path
                class="checkmark__check"
                fill="none"
                d="M7.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </span>
          <h3>Reservasyon kaydınız alınmıştır.</h3>
          <Button
            label="Yeni Rezervasyon Yap"
            variation="primary"
            onClick={() => (window.location.href = "/")}
          />
        </div>
      ) : (
        <>
          <ProgressSteps />
          {CurrentStep}
          <PrevNextSteps
            disabledNextButton={
              !hotelDetails.length ||
              !startDate ||
              !endDate ||
              personSize.adult_size < 1
            }
            values={values}
            makeReservation={makeReservation}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { activeTab: state.activeTab };
};

export default connect(mapStateToProps)(ReservationSteps);
