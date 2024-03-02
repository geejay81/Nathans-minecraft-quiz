import Quiz from "@/Components/quiz";

export default function Home() {
  
  return (
      <div className="flex flex-col w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center">
        <h1 className="text-white font-bold text-3xl">Nathan&apos;s Minecraft Quiz</h1>
        <Quiz />
      </div>
  );
}
