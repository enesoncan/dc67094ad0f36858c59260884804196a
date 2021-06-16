export const dateRangeCalculator = (startDate, endDate) => {
  const Difference_In_Time = endDate.getTime() - startDate.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return Difference_In_Days.toFixed();
};

export const priceFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export const formatDate = (date) => {
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join(".");
};

export const totalPriceCalculator = (
  hotelDetails,
  selectedRoomType,
  selectedRoomScenic,
  startDate,
  endDate
) => {
  if (hotelDetails && hotelDetails.length) {
    const selectedRoomDetail = hotelDetails.map((item) =>
      item.room_type.filter((room) => room.id === selectedRoomType)
    );

    const selectedScenicDetail = hotelDetails.map((item) =>
      item.room_scenic.filter((scenic) => scenic.id === selectedRoomScenic)
    );

    const totalRoomPrice =
      selectedRoomDetail[0][0].price * dateRangeCalculator(startDate, endDate);

    const effectRate = selectedScenicDetail[0][0].price_rate;
    const scenicPrice = (effectRate / 100) * totalRoomPrice;
    const totalPaymentPrice = totalRoomPrice + scenicPrice;

    return totalPaymentPrice.toFixed(2);
  }
};
