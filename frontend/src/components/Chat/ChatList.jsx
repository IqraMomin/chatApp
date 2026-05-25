import React from 'react'
import { useSelector } from 'react-redux'

function ChatList() {
    const messages = useSelector(state=>state.message.list);

    return (
        <div>
            <ul>
                {messages.map(ele=>(
                    <li>{messages.message}</li>
                ))}
            </ul>
        </div>
    )
}

export default ChatList
