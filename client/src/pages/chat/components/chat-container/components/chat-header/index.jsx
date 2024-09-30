import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { RiCloseFill } from "react-icons/ri";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";

function ChatHeader() {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center justify-between w-full ">
        <div className="flex gap-3 items-center justify-center b">
          <div className="w-12 relative h-12">
          {
            selectedChatType==="contact" ? (<Avatar className="h-11 w-11 rounded-full overflow-hidden">
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-lg border-[1px] rounded-full flex items-center justify-center ${getColor(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.charAt(0)
                    : selectedChatData.email.charAt(0)}
                </div>
              )}
            </Avatar>) :(<div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">#</div>)
          }
          </div>
          <div>
          {
            selectedChatType==="channel" && selectedChatData.name
          }
            {selectedChatType === "contact" && selectedChatData.firstName ?
              `${selectedChatData.firstName} ${selectedChatData.lastName}` : selectedChatData.email}
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <button className="text-neutral-500 focus:border-none  focus:outline-none focus:text-white duration-300 transition-all">
            <RiCloseFill className="text-3xl" onClick={closeChat} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
