import "./chatOnline.css";

export default function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineContainer">
          <img
          className="chatOnlineImg"
            src="https://cdn.pixabay.com/photo/2015/11/26/00/14/woman-1063100_960_720.jpg"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Jhon Doe</span>
      </div>

      <div className="chatOnlineFriend">
        <div className="chatOnlineContainer">
          <img
          className="chatOnlineImg"
            src="https://cdn.pixabay.com/photo/2015/11/26/00/14/woman-1063100_960_720.jpg"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Jhon Doe</span>
      </div>

      <div className="chatOnlineFriend">
        <div className="chatOnlineContainer">
          <img
          className="chatOnlineImg"
            src="https://cdn.pixabay.com/photo/2015/11/26/00/14/woman-1063100_960_720.jpg"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Jhon Doe</span>
      </div>
    </div>
  );
}
