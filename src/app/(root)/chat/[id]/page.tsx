import ChatContainer from '@/components/container/ChatContainer';
import MainWrapper from '@/components/MainWrapper';
import { getCurrentUser } from '@/utils/auth.action';
import { getUserCurrentConversations } from '@/utils/db.action';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({params}:{params:any}):  Promise<Metadata> {
  const {id} = params;

  const user = await getCurrentUser();
  const currentChannel = await getUserCurrentConversations(user?.id, id);

  return {
    title: `${currentChannel?.title} - AskNova`,
    description: 'AskNova helps you get answers, find inspiration and be more productive. It is free to use and easy to try. Just ask and AskNova can help with writing, learning, brainstorming and more.',
    keywords: 'ai chat,ai,chap gpt,chat gbt,chat gpt 3,chat gpt login,chat gpt website,chat gpt,chat gtp,chat openai,chat,chatai,chatbot gpt,chatg,chatgpt login,chatgpt,gpt chat,open ai,openai chat,openai chatgpt,openai',
    openGraph: {
      title: `${currentChannel?.title} - AskNova`,
      description: 'A conversational AI system that listens, learns, and challenges'
    }
  }
}

const page = async ({params}:{params:any}) => {
  const { id } = params;

  const user = await getCurrentUser();
  
  return (
    <MainWrapper>
      <div className="pt-[90px] h-[100vh]">
        <ChatContainer userId={user?.id} chnlId={id} />
      </div>
    </MainWrapper>
  );
}

export default page