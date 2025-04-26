import PromptInputContainer from "@/components/container/PromptInputContainer";
import MainWrapper from "@/components/MainWrapper";
import PromptInput from "@/components/PromptInput";
import { getCurrentUser } from "@/utils/auth.action";

export default async function Home() {
  const user = await getCurrentUser();
  
  return (
    <MainWrapper>
      <div className="w-full h-[100vh] flex items-center justify-center">
        <div className="w-full flex flex-col gap-[20px] px-[1rem] xl:px-0">
          <div className="w-full flex items-center justify-center">
            <h1 className="text-[2rem]">Apa yang bisa saya bantu?</h1>
          </div>

          <PromptInputContainer>
            <PromptInput
            userId={user?.id}
          />
          </PromptInputContainer>
        </div>
      </div>
    </MainWrapper>
  );
}
