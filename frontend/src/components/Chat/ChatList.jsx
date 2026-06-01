import React from 'react'
import { useSelector } from 'react-redux'

function ChatList() {
    const messages = useSelector(state=>state.message.list);
    
    return (
        <div>
            <ul>
                {console.log(messages)}
                {messages?.map(ele=>(
                    <li key={ele.id}><p>{ele.name}</p><p>{ele.message}</p></li>
                ))}
            </ul>
        </div>
    )
}

export default ChatList
