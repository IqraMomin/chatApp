import React from 'react'
import { useSelector } from 'react-redux'

function ChatList() {
    const messages = useSelector(state=>state.message.list);
    
    return (
        <div>
            <ul>
                {messages?.map(ele=>(
                    
                    <li key={ele.id}>
                        <div className='d-flex gap-2'>
                            {ele.mediaUrl && <img src={ele.mediaUrl} width="400px" height="400px"/>}
                        <p>{ele.username}</p><p>{ele.message}</p>
                            </div></li>
                ))}
            </ul>
        </div>
    )
}

export default ChatList
