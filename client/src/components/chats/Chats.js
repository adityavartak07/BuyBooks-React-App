import React,{useRef,useState,useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux'
import {ChatEngine,getOrCreateChat,get } from 'react-chat-engine';
import axios from 'axios';
import { newChat } from 'react-chat-engine';
import dotenv from 'dotenv';

dotenv.config();




const Chats=()=> {
const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

const [loading, setLoading ]= useState(true)
const history=useHistory()
const { name } = useParams();
const [username, setUsername] = useState(name);
console.log(user);
const secret=user.result.googleId ? user.result.googleId:user.result._id

function createDirectChat(creds) {
    getOrCreateChat(
        creds,
        { is_direct_chat: true, usernames: [username] },
        () => setUsername('')
    )
}








const getFile=async(url)=>{
    const response=await fetch(url);
    const data=await response.blob();

    return new File([data],"userPhoto.jpeg",{type:'image/jpeg'})

}


    useEffect(()=>{
        if(!user){
            history.push('/');
            return;
        }
        
        axios.get('https://api.chatengine.io/users/me',{
            headers:{
                "project-id":"a484d0dd-de4b-482f-a0ba-7b8e6117b276",
                "user-name":user.result.email,
                "user-secret":secret


            }
        })
        .then(()=>{
            setLoading(false)
        })
        .catch(()=>{
            let formdata=new FormData();
            formdata.append('email',user.result.email)
            formdata.append('username',user.result.email)
            formdata.append('secret',secret)
            console.log("done")

            getFile(user.result.imageUrl)
            .then((avatar)=>{
            createDirectChat(formdata)

                formdata.append('avatar',avatar,avatar.name)
                axios.post('https://api.chatengine.io/users',formdata,{
                    headers:{"private-key":"e0600173-b0f4-4fbf-96eb-90b90543c944"}
                })
                .then(()=>{
                    setLoading(false)
                })
                .catch((err)=>console.log(err))
            })
        })

    },[user,history])

    if(!user) return "Loading...";
   
    return (
        <div className="chats-page">
        <ChatEngine 
        height="90vh"
        projectID="a484d0dd-de4b-482f-a0ba-7b8e6117b276"
        userName={user.result.email}
        userSecret={secret}
        renderNewChatForm={(creds) => createDirectChat(creds)}/>
        
        
            
        </div>
    )
}

export default Chats
