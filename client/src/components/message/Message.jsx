import "./message.css";

export default function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://cdn.pixabay.com/photo/2015/11/26/00/14/woman-1063100_960_720.jpg"
          alt=""
        />
        <p className="messageText">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
