import React, { useContext } from 'react'
import { AppContext } from "../../context/AppContext";



export default function ReplyMsg({sernderName, msg, repliedTo, msgRef, mensioned, index }) {
    
    const { recentChatdata, newMessages } = useContext(AppContext)
    let msgIndex = recentChatdata.indexOf(repliedTo)
    let reference = msgIndex !== -1 ? msgRef.current[msgIndex] : msgRef[recentChatdata.length ]
    return (
        <div className={"repliesTo "}>
            <div className='receive-msg'>
                <div className="right-receive-msg" onClick={() => reference?.scrollIntoView()} >
                <span className="senderName">{sernderName}</span>
                    {repliedTo && (repliedTo.message_id) ?
                        <div className="receive-msg-main">
                            <p className="msg-text">gsr</p>
                        </div>
                        : null
                    }
                </div>
            </div>
            <div className="send-msg-main" >
                <p className="msg-text ">fgfgfdgfdgdfgdfgfdg</p>
            </div>
        </div>
    )
}
