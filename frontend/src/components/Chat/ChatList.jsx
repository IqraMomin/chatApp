import React from 'react'
import { useSelector } from 'react-redux'

function ChatList() {
    const messages = useSelector(state=>state.message.list);
    
    return (
        <div>
            <ul>
                {messages?.map(ele=>(
                    <li key={ele.message.id}>
                        <div className='d-flex gap-2'>
                        <p>{ele.username}</p><p>{ele.message.message}</p>
                            </div></li>
                ))}
            </ul>
        </div>
    )
}

export default ChatList
