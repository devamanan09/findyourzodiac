import axios from "axios";

export const getPanchangamDetails = async ({ date, time, place, lat, lng, timezoneoffset }) => {
  const [year, month, day] = date.split("-").map(Number); // e.g., "2024-01-25" → 2024, 1, 25

  const options = {
    method: "GET",
    url: "https://horoscope-and-panchanga.p.rapidapi.com/zodiac/PanchangaSummary",
    params: {
      day,
      month,
      year,
      place,
      lat,
      lon: lng,
      timezoneoffset,
    },
    headers: {
      "x-rapidapi-host": "horoscope-and-panchanga.p.rapidapi.com",
      "x-rapidapi-key": "914558c740mshddea78e37e79867p15940bjsn5b9a8422d695",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("✅ Panchangam API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Panchangam API Error:", error.response?.data || error.message);
    alert(`An error occurred: ${error.message}`);
    throw error;
  }
};
