import React from 'react'
import {Box,Container,Button,VStack,HStack,Input, Center,FormControl,FormLabel,FormErrorMessage} from '@chakra-ui/react'

import './index.scss'
import {Link} from 'react-router-dom'
import Header from './components/Header'
function Home({isUser}) {
return(
  <>
  <Header isUser={isUser}/>
    <HStack h={"95vh"} className='body' w={"full"}>
    <div id="app">
     <div className='title'>Hii<span className='wave'>👋</span>,Welcome to ChatEase</div>
  <div id='home-text'>
  {
    isUser?<h3>"ChatEase, the ultimate platform for real-time conversations! Log in with your email or Google account and join our vibrant chat room where everyone can share their thoughts and connect instantly. Dive into the conversation today and make new connections!"</h3>
    :<div>
    <h3 color='white'>"ChatEase, the ultimate platform for real-time conversations ! Log in with your email or Google account and join our vibrant chat room where everyone can share their thoughts and connect instantly. Dive into the conversation today and make new connections!".</h3>
    <Link to='/ChatNew'><Button bg={'#d59391'} w={"100px"}>Sign Up</Button></Link>
    <p>or</p>
    <Link to='/ChatOld'><Button bg={'#d59391'} w={"100px"}>Sign In</Button></Link>
    </div>
  }
  </div>
  </div>
  </HStack>
  </>
)
}
export default Home