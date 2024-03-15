import React, { useState, useEffect, useRef } from 'react';

// Type definitions
type Question = {
  prompt: string;
  answer: string;
};

type HistoryItem = React.ReactNode;

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>(['Type \'help\' to get started']);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  const questions: Question[] = [
    { prompt: "Wen?", answer: "Jan/2009" },
    { prompt: "Why? Banks on the brink of _______________________.", answer: "second bailout" },
    { prompt: "What? In the beginning", answer: "Genesis Block" },
    { prompt: "Who? Anon", answer: "Satoshi Nakamoto" },
  ];

  const orangecubeInfo = `Whois Orangecube\nDisplays information about us, full mission statement, full easter egg`;

  useEffect(() => {
    terminalRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'Backspace' && input.length) {
      setInput(input.slice(0, -1));
    } else if (e.key.length === 1) {
      setInput(input + e.key);
    }
  };

  const addCommandToHistory = (cmd: string, output: HistoryItem) => {
    setHistory(history => {
        const updatedHistory = [
            ...history, 
            <div key={history.length}>
                <span className="">{`> ${cmd}`}</span>
            </div>, 
            output
        ];
        // Queue the scroll adjustment to run after the state update has been applied and the DOM has been updated
        setTimeout(() => {
            if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
        }, 0);
        return updatedHistory;
    });
};

  const processCommand = (cmd: string) => {
    switch (cmd.trim().toLowerCase()) {
      case 'help':
      const helpOutput = (
        <>
          <div><span className="text-orange-500">help</span> – Show this help message</div>
          <div><span className="text-orange-500">clear</span> – Clears the terminal</div>
          <div><span className="text-orange-500">logo</span> – Show the company logo</div>
          <div><span className="text-orange-500">cube</span> – Enter the cube</div>
          <div><span className="text-orange-500">join</span> – Join Our Discord</div>
        </>
      );
      addCommandToHistory(cmd, helpOutput);
      break;
      case 'clear':
        setHistory([]);
        break;
      case 'logo':
        // Replace the placeholder with your actual ASCII art logo
        const asciiLogo = `YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
        YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
        YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
        YYYYYYYYYYYYYYYYYYJJJJJJJJJJJJJJJJJJJJJJJJJJJYYYYYYYYYYJJJJJJJJJJJJJJJJJJJJJJJJJJJYYYYYYYYYYYYYYYYYY
        YYYYYYYY77YYYYYYYYY!.::::::::::::::::::::::.:JYYYYYYYYJ:.::::::::::::::::::::::.!YYYYYYYYY7?YYYYYYYY
        YYYYYYYY! JYYYYYYYYJ~                        ?YYYYYYYY?                        ~YYYYYYYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYYYYYYY!                       7YYYYYYYY7                       !YYYYYYYYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYYYYYYYY7                      ~YYYYYYYY~                      7YYYYYYYYYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYYYYYYYYY?.                    :YYYYYYYY:                    .?YYYYYYYJYYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ~JYYYYYY?^^^^^^^^^^^^^^^^^^^^~YYYYYYYY~^^^^^^^^^^^^^^^^^^^^?YYYYYYY~?YYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ.?YYYYYYYYY?JJJJJJJJJJJJJJJJJJJYYYYYYJJJJJJJJJJJJJJJJJJJ?YYYYYYYYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ:?YYYYYYYYJ^                  7YYYYYY7                  ^JYYYYYYYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ:?YYJ?JYYYYJ~                 !YYYYYY!                 ~YYYYYY?JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ:?YYY^JYYYYYY!                ^YYYYYY^                !YYYYYYJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ:?YYY^JYJJYYYY7^^^^^^^^^^^^^^^!YYYYYY!^^^^^^^^^^^^^^^7YYYYJJYJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ:?YYY^JY?!YYYYYY7!!!!!!!!!!!!!!JYYYYJ!!!!!!!!!!!!!!7YYYYYY7?YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ:?YYY^JY?!YJJYYY?.             ?YYYY?             .?YYYJJY!7YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ:?YYY^JY?!Y7?YYYYJ:            !YYYY!            :JYYYJJ!Y77YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ:?YYY^JY?!Y7??JJJJJ!!!!!!!!!!!!?JJJJ?!!!!!!!!!!!!JJJJJ?J7Y77YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ:?YYY^JY?!Y7????^:^^^^^^^^^^^^^^::::^^^^^^^^^^^^^^:^??7J7Y77YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY! ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.!YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.~YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.~YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.~YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.~YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.~YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    7J7J7Y77YJ^JYYJ:?YYYYJ.~YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7????                                    ?J7J7Y77YJ^JYYJ:?YYYYJ.~YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JY?!Y7J?77^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^7??J7Y77YJ^JYYJ:?YYYYJ.~YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JYJ!Y!~:. ....................................  :~~Y7?YJ^JYYJ:?YYYYJ.~YYYYYYYY
        YYYYYYYY7 ?YYYYJ:?YYY^JJ!..                                              .:~?J^JYYJ:?YYYYJ.~YYYYYYYY
        YYYYYYYY7 ?YYYYJ:JYJ7::                                                      :.7JYY:?YYYYJ.~YYYYYYYY
        YYYYYYYY7 ?YYYYJ.~^.                                                            .:~.?YYYYJ.~YYYYYYYY
        YYYYYYYY7 JYJ7^.                                                                    .^!?YY.~YYYYYYYY
        YYYYYYYY7 ~:.                                                                           :~ ~YYYYYYYY
        YYYYYYYYJ??????????????????????????????????????????????????????????????????????????????????JYYYYYYYY
        YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
        YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
        YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY`;
        addCommandToHistory(cmd, <pre>{asciiLogo}</pre>);
        break;
      case 'join':
        window.open('https://discord.gg/4RvS8ZwRcj', '_blank');
        addCommandToHistory(cmd, <span>Opening Discord...</span>);
        break;
        case 'cube':
          if (currentQuestionIndex === -1) {
            // Start the game logic...
            addCommandToHistory(cmd, "Help Orangecube\nThesis / Hook, a hint about the riddle and prompts with the first question\nHint: ”Enter the cube?”");
            setCurrentQuestionIndex(0); // Ensure we're starting at the first question
            addCommandToHistory("", `Question: ${questions[0]?.prompt}`); // Safely access the first question's prompt
          }
          break;
          default:
      // Handling game answers or unknown commands
      if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
        // Safely asserting that currentQuestion is not undefined because of the bounds check
        const currentQuestion = questions[currentQuestionIndex]!;

        if (cmd.toLowerCase() === currentQuestion.answer.toLowerCase()) {
          addCommandToHistory(cmd, <span className="text-green-500">Correct!</span>);
          const nextQuestionIndex = currentQuestionIndex + 1;
          if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
            const nextQuestion = questions[nextQuestionIndex];
            if (nextQuestion) {
              addCommandToHistory("", `Question: ${nextQuestion.prompt}`);
            }
          } else {
            setCurrentQuestionIndex(-1); // End the game
            addCommandToHistory("", orangecubeInfo); // Display final info
          }
        } else {
          addCommandToHistory(cmd, <span className="text-red-500">Incorrect. Try again.</span>);
        }
      } else {
        // When the command is not recognized and we're not in the middle of the game
        addCommandToHistory(cmd, <span className="text-red-500">Command not found: </span>);
        addCommandToHistory("", <span className="text-white">{cmd}</span>);
      }
  }
};

  return (
    <div
      ref={terminalRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="h-[900px] w-full overflow-auto bg-black p-4 text-white"
      style={{ whiteSpace: 'pre-wrap', fontFamily: '"Press Start 2P", monospace', fontSize: '0.75rem' }}
    >
      {history.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <div className="flex">
        <span>admin@orangecube: ~/ </span>
        <span className="text-white">{input}</span>
        <div className="inline-block w-2 h-5 bg-white animate-pulse"></div>
      </div>
    </div>
  );
};

export default Terminal;
