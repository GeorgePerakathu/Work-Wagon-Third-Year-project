import React from "react";
import "./myStyles.css";

function MessageOthers(){
    var props1 = {name:"RandomUser",message:"This is a Sample Message"};
   
    return(
<div className="other-message-container">
<div className="conversation-container">
    <div>
        <p className="con-icon">{props1.name[0]}</p>
        </div>
        <div className="other-text-content">
        <p className="con-title">{props1.name}</p>
        <p className="con-lastMessage">{props1.message}</p>
        <p className="self-timeStamp">12:00 am</p>
</div>
</div>
</div>
    );
}

export default MessageOthers;
