import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import img2 from "../../assets/images/Chating_images/Chat_img2.jpg"
import close_icon from "../../assets/images/close_icon.svg"

export default function ReplyShowMsg({ replyTo, msgRef }) {
    const { recentChatdata, newMessages } = useContext(AppContext)
    let msgIndex = recentChatdata.indexOf(replyTo)
    let reference = msgIndex !== -1 ? msgRef.current[msgIndex] : msgRef[recentChatdata.length]
    return (
        <div className={"replyTo"}>
            <div className='message-main'>
                <div className='receive-msg' id='replyMsgImg'>
                    <div className="right-receive-msg" onClick={() => reference?.scrollIntoView()} >
                        {replyTo && replyTo.message_content ?
                            <div className="receive-msg-main">
                                <p className="msg-text">{replyTo.message_content}  </p>
                                {/* <img src={img2} alt="" /> */}
                                {/* <img src={close_icon} alt="" className='close_icon' /> */}
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

