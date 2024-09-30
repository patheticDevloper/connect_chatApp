import { apiClient } from "@/lib/api-client";
import NewDm from "./components/new-dm";
import ProfileInfo from "./components/profile-info";
import { GET_DM_CONTACTS_ROUTES, GET_USER_CHANNELS_ROUTE } from "@/utils/constants";
import { useEffect } from "react";
import { useAppStore } from "@/store";
import ContactList from "@/components/ui/contact-list";
import CreateChannel from "./components/create-channel";

function ContactsContainer() {
  const {setDirectMessagesContacts, directMessagesContacts, channels, setChannels} = useAppStore()

  useEffect(()=>{

    const getContacts = async ()=>{
      const response = await apiClient.get(GET_DM_CONTACTS_ROUTES,{withCredentials:true})
      if(response.data.contacts){
        setDirectMessagesContacts(response.data.contacts);
        
      }
    };

    const getChannels = async ()=>{
      const response = await apiClient.get(GET_USER_CHANNELS_ROUTE,{withCredentials:true});
      if(response.data.channels){
        setChannels(response.data.channels);
        
      }
    };

    getContacts();
    getChannels();
  },[setChannels, setDirectMessagesContacts]);

  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
    <div className="pt-3 text-purple-500 poppins-medium ml-5 text-2xl">
    ....CONNECT
    </div>
      <div className="my-3">
        <div className="flex items-center justify-between pr-10">
            <Title text="Direct Messages"/>
            <NewDm />
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden"><ContactList contacts={directMessagesContacts}/></div>
      </div>
      <div className="my-3">
        <div className="flex items-center justify-between pr-10">
            <Title text=" Channels"/>
            <CreateChannel/>
        </div>
        <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden"><ContactList contacts={channels} isChannel={true}/></div>
      </div>
      <ProfileInfo/>
    </div>
  )
}

export default ContactsContainer;


const Title = ({text})=>{
    return <h6 className="uppercase tracking-widest text-neutral-400 pl-10 fint-light text-opacity-90 text-s">{text}</h6>
}