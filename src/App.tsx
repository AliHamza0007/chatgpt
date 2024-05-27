import { KeyboardEvent, LegacyRef, useRef, useState } from 'react';
import CopyRight from './CopyRight';
import runChat from './OpenAi';
import Bot from './assets/favicon.ico';

interface Message {
  role: string;
  content: string;
}
function App() {
  const [inputVal, setInputVal] = useState<string>('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const scrollerRef = useRef<LegacyRef<HTMLDivElement> | any>(null);
  const scrollToBottom = () => {
    if (scrollerRef.current) {
      const lastChild = scrollerRef.current.lastElementChild;
      if (lastChild) {
        setTimeout(() => {
          lastChild.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Increased delay to 300 milliseconds
      }
    }
  };

  const handleSubmit = async () => {
    scrollToBottom();
    scrollToBottom();
    scrollToBottom();

    try {
      setConversation((prevConversation) => [
        ...prevConversation,
        {
          role: 'user',
          content: inputVal,
        },
      ]);
      setInputVal('');
      scrollToBottom();

      const response = await runChat(inputVal);

      // Split the text into an array of parts based on the "**" delimiter

      setConversation((prevConversation) => [
        ...prevConversation,
        { content: response, role: 'bot' },
      ]);
      scrollToBottom();
    } catch (error) {
      console.error('An error occurred:', error);
      setConversation((prevConversation) => [
        ...prevConversation,
        { content: 'An error occurred. Please try again later.', role: 'bot' },
      ]);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
      setInputVal('');
    }
  };

  return (
    <div className="dark:bg-gray-dark bg-gray-light h-screen w-screen">
      <h1 className="text-center dark:text-slate-200 text-2xl py-3 font-semibold">
        Welcome To <span className="md:inline hidden">Chat To</span> Ai{' '}
        <i className="fa fa-arrow-down animate-bounce"></i>
      </h1>
      <div className="conversation h-[80vh] overflow-auto   dark:text-slate-50  text-slate-900 ">
        <div className="max-w-4xl mx-auto p-4  ">
          {conversation.map((item: Message, index: number) => (
            <div ref={scrollerRef} key={index} className={`mb-0 scroll-smooth`}>
              <span className="block  font-semibold">
                {item.role === 'user' ? (
                  <div className="flex  items-center gap-3">
                    <i className="fa fa-user rounded-full text-[20px] p-2 bg-slate-700 text-slate-50 dark:bg-white dark:text-slate-700" />
                    <p className="font-bold">You</p>
                  </div>
                ) : (
                  <div className="flex     items-center gap-3">
                    <img className="w-[40px]  h-[40px]" src={Bot} />
                    <p className="font-bold">Bot</p>
                  </div>
                )}
                {/* Render UserIcon for user messages and BotIcon for bot messages */}
              </span>
              <p className={`ps-12 flex flex-wrap`}>
                {item?.role === 'bot' ? (
                  <span dangerouslySetInnerHTML={{ __html: item.content }} />
                ) : (
                  item.content
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-screen z-50 fixed bottom-0  dark:bg-gray-dark py-3">
        <div className="flex justify-center">
          <div
            className={`relative  rounded-3xl   w-[70%] border-[1px] dark:border-border-normal   py-2 pr-10 +
           dark:[&:has(textarea:focus)]:border-border-hover   dark:[&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)]

          [&:has(textarea:focus)]:border-slate-400   [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)]
           `}
          >
            <textarea
              autoFocus
              role="textbox"
              rows={1}
              onKeyDown={handleKeyDown}
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              className={`dark:text-white bg-transparent border-0 focus:outline-none focus:ring-0 focus:shadow-none px-5 w-[100%] text-lg dark:placeholder-slate-400 placeholder-opacity-50 resize-none overflow-y-hidden ${
                inputVal.length > 0 ? 'h-auto' : 'h-[30px!important]'
              }`}
              placeholder="Ask Me Everything"
            />
            <button
              onClick={handleSubmit}
              className="hover:cursor-pointer disabled:cursor-default bottom-[6px] right-[11px] absolute"
              disabled={!inputVal}
            >
              <i
                className={`text-lg w-10 h-10 p-1 flex rounded-2xl justify-center items-center fa fa-arrow-up ${
                  inputVal
                    ? 'dark:bg-white bg-black text-white dark:text-black hover:dark:bg-slate-50'
                    : 'dark:text-white'
                }`}
              />
            </button>
          </div>
        </div>
        <div className=" mt-3">
          <CopyRight />
        </div>
      </div>
    </div>
  );
}

export default App;
