import { useUser } from "@clerk/clerk-expo";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import Colors from "./../../constants/Colors";



export default function Chat() {
  const {user} = useUser()
  const [messages , setMessages] = useState([])
  const [loading ,setLoading] = useState(false)
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_KEY ;

  
  const handelSend = async(newMessages = [])=>{
    try{
        const userMessage = newMessages[0]

        setMessages(previousMessages=> GiftedChat.append(previousMessages,userMessage))
        const messagesText = userMessage.text.toLowerCase()

        const keywords = ["hello","hello how are you" ,
          "hello farmer", "good morning farmer", "good afternoon farmer", "good evening farmer", "welcome to the farm", "happy farming", "greetings from the field", "howdy",
          "farmer", "agriculture", "agribusiness", "farming", "agriculture business", "farmer's market", "farm life", "rural life", "agriculturalist",
          "farm tools", "agricultural equipment", "farming equipment", "farm machinery", "agricultural implements", "tractor", "plow", "harvester", "combine harvester", "sower", "sprinkler", "irrigation system", "fertilizer spreader", "weed whacker", "chainsaw",
          "fertilizer", "fertilizer types", "organic fertilizer", "synthetic fertilizer", "fertilizer application", "nitrogen fertilizer", "phosphorus fertilizer", "potassium fertilizer", "NPK fertilizer", "urea", "ammonium nitrate", "diammonium phosphate", "potassium chloride",
          "agriculture", "agronomy", "horticulture", "viticulture", "livestock farming", "dairy farming", "poultry farming", "crop production", "animal husbandry", "soil science", "plant science", "agricultural economics", "agricultural technology", "sustainable agriculture", "precision agriculture",
          "soil health", "crop rotation", "pest control", "weed control", "irrigation", "drainage", "harvesting", "storage", "food security", "rural development", "agricultural policies", "climate change and agriculture", "genetically modified organisms",
          "Indian agriculture", "Indian farmers", "Indian farming practices", "Indian farm tools", "Indian fertilizer", "Indian agriculture ministry",
          "rice farming", "rice cultivation", "rice varieties", "rice production", "rice export",
          "hydroponics", "aquaponics", "permaculture", "grains", "fruits", "vegetables", "flowers", "livestock", "pests", "diseases", "drought", "climate change", "FAO", "USDA", "IFAD", "tillage", "sowing", "germination", "growth", "maturity", "harvest",
          "herbicides", "glyphosate", "atrazine", "2,4-D", "pesticides", "malathion", "carbaryl", "pyrethroids", "fungicides", "sulfur", "copper", "chlorothalonil", "rodenticides", "warfarin", "bromadiolone",
          "fungal diseases", "rust", "mildew", "blight", "rot", "powdery mildew", "late blight", "root rot", "bacterial diseases", "blight", "canker", "wilt", "fire blight", "bacterial wilt", "crown gall", "viral diseases", "mosaic", "yellowing", "stunting", "tobacco mosaic virus", "potato virus Y",
          "nitrogen", "phosphorus", "potassium", "micronutrients", "boron", "manganese", "zinc", "copper", "iron", "molybdenum",
          "seeds", "soil", "water", "climate", "machinery", "storage", "pest control", "disease control", "crop rotation", "cover crops",
        ];
        if(!keywords.some(keywords=>messagesText.includes(keywords))){
          const botMessage = {
            _id : new Date().getTime() + 1,
            text : "I'm your farm buddy , i am not supposed to answer that",
            createdAt : new Date(),
            user : {
              _id: 2,
              name : "Farm Buddy",
              avatar: "https://static.vecteezy.com/system/resources/previews/010/054/157/original/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-illustration-ai-technology-futuristic-helper-communication-conversation-concept-in-flat-style-vector.jpg"
            }
          }
          setMessages(previousMessages=>GiftedChat.append(previousMessages,botMessage))
          return
        }
        setLoading(true)
        const response = await axios({
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
          method: "post",
          data: {
            contents: [{ parts: [{ text: messagesText }] }],
          },
        });

        const answer = response.data.candidates[0].content.parts[0].text
        
        const botMessage =  {
          _id : new Date().getTime()+1,
          text : answer,
          createdAt : new Date(),
          user : {
            _id : 2,
            name : "Farm Buddy",
            avatar: "https://static.vecteezy.com/system/resources/previews/010/054/157/original/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-illustration-ai-technology-futuristic-helper-communication-conversation-concept-in-flat-style-vector.jpg"
          }
        }

        setMessages(previousMessages => GiftedChat.append(previousMessages,botMessage))
        setLoading(false)
    }catch(err){
      console.log("error sending response" ,err)
    }
  }


  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Welcome ${user?.fullName} , Got a farming question? I'm your go-to bot.`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://static.vecteezy.com/system/resources/previews/010/054/157/original/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-illustration-ai-technology-futuristic-helper-communication-conversation-concept-in-flat-style-vector.jpg",
        },
      },
    ],);
  },
  
  []);

 

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.PRIMARY,
          },
          left:{
            backgroundColor: Colors.WHITE
          }
        }}
        textStyle={{
          right: {
            color: Colors.WHITE,
          },
        }}
      />
    );
  };


  

  return (
    <ImageBackground  source={require("./../../assets/images/cats.png")} style={{
      flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    }}>
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => handelSend(newMessages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      style={{ flex: 1, width: '100%', height: '100%' }}
      scrollToBottom
      inverted={true}
      isTyping={loading}
      
    />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE
  },
});