import React from 'react'
import {Button,HStack,Avatar} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
import '../index.scss'
import {app} from '../firebase'
import {getAuth,signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
const auth=getAuth(app);
function Header({isUser,uri}) {
  const navigate=useNavigate()
  const logoutHandler=()=>{
    signOut(auth)
    .then((value)=>{
     navigate("/")
    })
    .catch((err)=>alert("Couldn't log out", err));
  }
  return (
    <HStack padding={"10px"} justifyContent={"flex-end"} className="header">
            {
              isUser?<>
            <Link className='link' to='/home'>Home</Link>
            <Link className='link' to='/home'>About</Link>
            <Link className='link' to='/home'>Contact</Link>
              <Link className='link' to='/ChatOld'>Chat</Link>
              <Button onClick={logoutHandler}  color={'black'} bg={'#FFB6B5'} w={"15vw"} h={"35px"}>Logout</Button>
              <Avatar h={"40px"} w={"40px"} src= {uri}/></>
              :<>
              <Link className='link' to='/'>Home</Link>
            <Link className='link' to='/'>About</Link>
            <Link className='link' to='/'>Contact</Link>
              </>
            }
    </HStack>
  )
}

export default Header