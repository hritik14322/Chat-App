import React from 'react'
import {HStack,Avatar,Text} from '@chakra-ui/react'
function Message({time,text,uri,user="other"}) {
  return (
    <>
    <HStack   alignSelf={user==="me"?'flex-end':'flex-start'} bg={user=="me"? '#eac6c5ce':'#F0F1F5'} borderRadius={'10px'} padding={2}>
        {
          user==="other" && <Avatar h={"35px"} w={"35px"} src={uri} />
        }
        <Text>{text}</Text>
        {
          user==="me" && <Avatar h={"35px"} w={"35px"} src={uri} />
        }
    </HStack>
    </>
  )
}

export default Message