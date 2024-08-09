import useConversation from "../../store/useConversation";

const Conversation = ({conversation}: {conversation:any}) =>{

    const {setSelectedConversation, selectedConversation} = useConversation();
    const isSelected = selectedConversation?.id === conversation.id
    const isOnline = false;

    // console.log("THIS IS A SINGLE CONVERSATION", conversation);

  const handleConversation = async () =>{
    setSelectedConversation(conversation);

    const getConvo = async () =>{

      try{
        console.log("conversation.id", conversation.id);
        const res = await fetch(`api/convos/${conversation.id}/new`)
        console.log("THIS IS CONVERSATION RES", res);
        const data = await res.json();
        if(!res.ok){
          throw new Error(data.error)
        }
        console.log(data);
        setSelectedConversation(data)


      }catch(error: any){

        console.error(error)
      }

    }

    getConvo()

  }





    return (
      <>
        <div
          className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
            isSelected ? "bg-sky-500" : ""
          }`}
          onClick={handleConversation}
        >
          <div className={`avatar ${isOnline ? "online" : "offline"}`}>
            <div className="w-8 md:w-12 rounded-full">
              <img
                src={
                  conversation.profilePic ||
                  `https://avatar.iran.liara.run/public/${conversation.id}`
                }
                alt="user avatar"
              />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="flex gap-3 justify-between">
              <p className="font-bold text-gray-200 text-sm md:text-md">
                {conversation.username}
              </p>
              <span className="text-xl hidden md:inline-block">
                {/* {conversation.emoji} */}
                Hi
              </span>
            </div>
          </div>
        </div>

        <div className="divier my-0 py-0 h-1" />
      </>
    );
}

export default Conversation;