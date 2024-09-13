import {
    Box,
    Button,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  import "./modal.css";
  import Chatbot from "./chatbot";
  
  const ChatbotIcon = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <div width={'40%'} border={'1px solid red'}>
        <Image
        
          onClick={() => {
            // console.log("Image clicked");
            onOpen();
          }}
          // _hover={{ cursor: "pointer" }}
          // position={"fixed"}
          // bottom={100}
          // right={1}
          //   background="linear-gradient(135deg, #86efac 0%, #60a5fa 100%)"
          // w={"80px"}
          // h={"80px"}
          // zIndex={2}
          // borderRadius={"50%"}
          className="bot-image-icon"
          src="/images/chatbot.png"
        />
        <Modal
          isCentered
          onClose={onClose}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent
          className="modal-content"
          >
            <ModalHeader style={{textAlign:"center",fontSize:"30px",color:"white",fontWeight:"600",padding:"10px"}}>Hype Drinks
            <ModalCloseButton style={{width:"20px",fontSize:"20px",marginLeft:"90%",cursor:"pointer",padding:"10px",borderRadius:"5px",border:'transparent',marginTop:"-39px"}}/>
            </ModalHeader>
            <ModalBody
             className="hide-scrollbar"
             style={{
               overflowY: 'auto', 
             }}
            >
              <Chatbot />
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </Modal>
      </div>
    );
  };
  
  export default ChatbotIcon;
  