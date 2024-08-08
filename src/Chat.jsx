import {Box,Container,Button,VStack,HStack,Input, Center,FormControl,FormLabel,FormErrorMessage} from '@chakra-ui/react'
import Message from './Message'
import Header from './components/Header';
import {app} from './firebase'
import './index.scss';
import {onAuthStateChanged,GoogleAuthProvider,getAuth,signInWithPopup,signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'
import {addDoc, collection, getFirestore, onSnapshot, serverTimestamp,query,orderBy} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'
const db=getFirestore(app)
const auth=getAuth(app);


function Chat({isNew}) {
  const navigate=useNavigate()
  const divForScroll=useRef(null);
  const GoogleloginHandler = async()=>{
    const provider=new GoogleAuthProvider();
    await signInWithPopup(auth,provider)
    navigate("/home")
  }
  const logoutHandler=()=>{
    signOut(auth)
    .then((value)=>{
     navigate("/")
    })
    .catch((err)=>alert("Couldn't log out", err));
  }
  const EmailSignUPHandler =()=>{
    createUserWithEmailAndPassword(auth,email,password).then((value)=>console.log("sign IN success"))
    .catch ((err)=>alert(err));
    navigate("/home")
  };
  const EmailSignInHandler =()=>{
    signInWithEmailAndPassword(auth,email,password).then((value)=>console.log(value)).catch((err)=>alert(err));
    navigate("/home")
  }
  const [user,setUser]=useState(false);
  const [message,setMessage]=useState("");
  const [chat,setchat]=useState([]);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [userUri,setUserUri]=useState("");
  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
      setMessage("")
    await addDoc(collection(db,"Message"),{
      text : message,
      uid: user.uid,
      uri: user.photoURL,
      createdAt: serverTimestamp(),
    })
    } catch (error) {
      alert(error.message)
    }
    divForScroll.current.scrollIntoView({behavior:'smooth'})
    }



  useEffect(()=>{
    const q=query(collection(db,"Message"),orderBy("createdAt",'asc'));
    const unsubscribe=onAuthStateChanged(auth,(data)=>{
        setUser(data)
        setUserUri(user.photoURL)
    })
    const unsubscribeforMessage=onSnapshot(q,(snap)=>{
        setchat(snap.docs.map((item)=>{
          const id=item.id;
          return {id,...item.data()};
        })
      );
    });
    return(()=>{
      unsubscribe();
      unsubscribeforMessage();
    });
 },[]);
  return (
     <Box  className='body' borderRadius={"4px"}>
   {
    user?(
      <>
      <Header isUser={true} uri={userUri} />
    <Container borderRadius={'5px'} h={'95vh'} bg={'white'}>
    <VStack paddingY={'2px'}>
    <VStack overflowY={'auto'} w={'full'} h={'85vh'} css={{'&::-webkit-scrollbar':{
      display:"none"
    }}}>
     {
       chat.map((item)=>(
       <Message key={item.id} time={item.createdAt} text={item.text} user={item.uid===user.uid?"me":"other"} uri={item.uri} />
       ))
     }
     <div ref={divForScroll}></div>
    </VStack>
    <form style={{width:"100%"}}>
     <HStack >
       <Input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Enter Your Message..." />
       <Button onClick={submitHandler} color={'black'} bg={'#FFB6B5'} type='submit'>Send</Button>
     </HStack>
    </form>
    </VStack>
  </Container>
  </>):<VStack h={"100vh"} justifyContent={'center'}>
        <Box className='form-outer'>      
        <FormControl color={"black"} w={"50vh"} marginY={"10px"} isRequired>
        <FormLabel>Username/Email</FormLabel>
        <Input focusBorderColor='black' textColor={"black"} value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder={"Enter your username"}/>
        <FormLabel>Password</FormLabel>
        <Input focusBorderColor='black' textColor={"black"} value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder={"Enter your Password"}/>
        <Button bg={'#d59391'} marginY={"10px"} onClick={isNew===1?EmailSignUPHandler:EmailSignInHandler}>Submit</Button>
        </FormControl>
        <p style={{color:"gray",textAlign:"center"}}>______or______ </p>
        <Button bg={'#d59391'} marginX={"26%"} marginY={"10px"} onClick={GoogleloginHandler}>
          Sign In with Google
        </Button>
        </Box>  
      </VStack>
   }
   </Box>
  )
}
export default Chat
