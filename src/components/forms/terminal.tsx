'use client'
// Import React and useState, useEffect, useRef hooks
import React, { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import JSConfetti from 'js-confetti';

// Define type for questions and history items
type Question = {
  prompt: string;
  answer: string;
  hint: string;
};

interface GenerateCodeResponse {
  uniqueCode: string;
}

interface FileContents {
  [key: string]: string;
}



type HistoryItem = React.ReactNode;
// eslint-disable-next-line @typescript-eslint/unbound-method
const originalAddConfetti = JSConfetti.prototype.addConfetti;

JSConfetti.prototype.addConfetti = function (...args) {
  console.log('Appending canvas to the document.');
  return originalAddConfetti.apply(this, args);
};

const jsConfetti = new JSConfetti();
const questions: Question[] = [
  { prompt: "Enter the cube? (y/n)", answer: "y", hint: "" },
  { prompt: "Wen?", answer: "2009", hint: "What year did it start?" },
  { prompt: "Why?", answer: "second bailout", hint: "When banks faltered and the economy quaked, Bitcoin emerged from the _ _ _ _ _ _  _ _ _ _ _ _ _?" },
  { prompt: "What?", answer: "genesis block", hint: "In the beginning, what happened?" },
  { prompt: "Who?", answer: "satoshi nakamoto", hint: "Who is Anon?" },
];

// Define file contents
const fileContents: FileContents = {
  "about.txt": `exclusive digital arthouse

>> offering curated releases of the best digital artists on BTC

>> highlighting art that pushes the boundaries of what’s possible on-chain

>> providing innovative release strategies to benefit both the artists and collectors

>> team

>> Aaron - Founder & Curator

>> Alec - Co-Founder

>> David - Chief of Marketing

>> Erwin - Art Director

>> Shawn - Lead Dev

>> Chantha - Dev

>> Griffin - Head of Community

>> t&cs

>> a reputable VPN is your friend

>> we aren’t tracking you, your browser is

>> clear your mind and your cache

>> don’t ask don’t tell

>> your data your responsibility`,

"mission.txt": `“To preserve artifacts, and define contemporary”

>> Orange Cube is dedicated to showcasing the finest
   emerging digital art, inscribing it onto Bitcoin, 
   and providing curated collections that are accessible 
   to all collectors. Our mission goes beyond profitability, 
   aiming to spark innovation and foster a vibrant community
   around on-chain art inscriptions.`,

  "contact.txt": `Get in Touch with Orangecube

>> We'd love to hear from you! Whether you're interested 
   in our projects, looking to collaborate, or just want 
   to say hello, here's how you can reach us:

>> Email: hello@orangecube.art
>> Twitter: @orangecube_art
`
};

const Terminal: FC = () => {
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<React.ReactNode[]>(['Type \'help\' to get started']);
  const [viewingFileContent, setViewingFileContent] = useState<string | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);

  useEffect(() => {
    const terminalElement = terminalRef.current;
    const handleScroll = (event: WheelEvent) => {
      if (terminalElement) {
        event.preventDefault(); 
        terminalElement.scrollTop += event.deltaY; 
      }
    };

    terminalElement?.addEventListener('wheel', handleScroll);

    return () => {
      terminalElement?.removeEventListener('wheel', handleScroll);
    };
  }, []);




  const addCommandToHistory = (cmd: string, output: HistoryItem) => {
    setHistory(history => [
        ...history, 
        <div key={history.length}>
            <span className="">{`> ${cmd}`}</span>
        </div>, 
        output
    ]);
  };

  const handleAnswersAndCommands = (cmd: string) => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion && cmd.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
          setCurrentQuestionIndex(nextIndex);
          addCommandToHistory(cmd, <span className="text-green-500">Correct!</span>);
          addCommandToHistory("", <span>{questions[nextIndex]?.prompt}</span>);
        } else {
          setCurrentQuestionIndex(-1); 
          addCommandToHistory(cmd, <span className="text-green-500">Correct! You&apos;ve completed the challenge.</span>);
          addCommandToHistory("", <pre>{`Whois Orangecube\n${fileContents["about.txt"]}\n${fileContents["mission.txt"]}`}</pre>);
        }
      } else if (!viewingFileContent) {
        addCommandToHistory(cmd, <span className="text-red-500">Incorrect. Try again or type &lsquo;hint&rsquo; for a hint.</span>);
      }
    } else if (!viewingFileContent) {
      addCommandToHistory(cmd, <span className="text-red-500">Command not found: {cmd}</span>);
    }
  };


  const processCommand = async (cmd: string) => {
    if (viewingFileContent && cmd.trim().toLowerCase() === 'exit') {
      setViewingFileContent(null); 
      return;
    }
  
    if (cmd.startsWith('vi ')) {
      const fileName = cmd.substring(3).trim(); 
      if (fileContents[fileName as keyof typeof fileContents]) { 
        addCommandToHistory(cmd, <pre className="whitespace-pre-wrap">{fileContents[fileName as keyof typeof fileContents]}</pre>);
        return;
      } else {
        addCommandToHistory(cmd, <span>File not found.</span>); 
        return;
      }
    }

    if (currentQuestionIndex === questions.length - 1 && input.trim().toLowerCase() === questions[currentQuestionIndex]?.answer?.toLowerCase()) {
      try {
        const response = await fetch('/api/kv', { 
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({}) 
      });
  
          if (!response.ok) {
            throw new Error('Failed to generate code');
          }

          const { uniqueCode } = await response.json() as GenerateCodeResponse;
          addCommandToHistory(input, <span className="text-green-500">Congratulation! Your unique code: {uniqueCode}. Use the /redeem command in Discord to claim your special role.</span>);
          

          // Game completion logic here
          setCurrentQuestionIndex(-1);
      } catch (error) {
          console.error('Error during code generation:', error);
          addCommandToHistory('error', <span>There was a problem generating your unique code. Please try again.</span>);
      }
  } else {
  
  
    switch (cmd.trim().toLowerCase()) {
      case 'help':
        const helpOutput = (
          <>
            <div><span className="text-orange-500">help</span> – Show this help message</div>
            <div><span className="text-orange-500">clear</span> – Clears the terminal</div>
            <div><span className="text-orange-500">logo</span> – Show the company logo</div>
            <div><span className="text-orange-500">ls</span> – List files</div>
            <div><span className="text-orange-500">vi [file]</span> – View a file (about.txt, mission.txt, contact.txt)</div>
            <div><span className="text-orange-500">cube</span> – Enter the cube (Starts the game)</div>
            <div><span className="text-orange-500">join</span> – Join Our Discord</div>
          </>
        );
        addCommandToHistory(cmd, helpOutput);
        break;
      case 'clear':
        setHistory([]); 
        break;
        case 'logo':
          addCommandToHistory(cmd, (
            <pre className="text-orange-500">
          {`
      ********************************************************************************
      ********************************************************************************
      ******* ********                    *********                    ******** ******
      *******  ********                    *******                    ********* ******
      *******  **********                  *******                  *********** ******
      *******  ***********                 *******                 ************ ******
      *******  **** ***************************************************** ***** ******
      *******  **** *********              ******               ********* ***** ******
      *******  **** *** ******              *****              ****** *** ***** ******
      *******  **** *** ********************************************* *** ***** ******
      *******  **** *** ** ******           *****           ****** ** *** ***** ******
      *******  **** *** ** *******          *****          ******* ** *** ***** ******
      *******  **** *** ** *************************************** ** *** ***** ******
      *******  **** *** ** *****                             ***** ** *** ***** ******
      *******  **** *** ** *****                             ***** ** *** ***** ******
      *******  **** *** ** *****                             ***** ** *** ***** ******
      *******  **** *** ** *****                             ***** ** *** ***** ******
      *******  **** *** ** *****                             ***** ** *** ***** ******
      *******  **** *** ** *****                             ***** ** *** ***** ******
      *******  **** *** ** *****                             ***** ** *** ***** ******
      *******  **** *** ** *****                             ***** ** *** ***** ******
      *******  **** *** ** *****                             ***** ** *** ***** ******
      *******  **** *** ** *************************************** ** *** ***** ******
      *******  **** *** **                                         ** *** ***** ******
      *******  **** ***                                               *** ***** ******
      *******  ****                                                       ***** ******
      *******                                                                 * ******
      ********************************************************************************
      ********************************************************************************
      `}
            </pre>
          ));
          break;
      case 'ls':
        addCommandToHistory(cmd, <pre>{"about.txt\nmission.txt\ncontact.txt"}</pre>); 
        break;
      case 'join':
        window.open('https://discord.gg/4RvS8ZwRcj', '_blank'); 
        addCommandToHistory(cmd, <span>Opening Discord...</span>);
        break;
      case 'cube':
        if (currentQuestionIndex === -1) {
          setCurrentQuestionIndex(0);
          setViewingFileContent(null); 
          const firstQuestionPrompt = questions[0]?.prompt; 
          addCommandToHistory(cmd, <span>{firstQuestionPrompt}</span>); 
        } else {
          addCommandToHistory(cmd, <span>You are already inside the cube. Answer the question or type &apos;hint&apos; for help.</span>);
        }
        break;
      case 'hint':
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
          const hint = questions[currentQuestionIndex]?.hint; 
          addCommandToHistory(cmd, <span>{hint}</span>);
        }
        break;
        case 'party':
          console.log("Triggering confetti!"); 
          jsConfetti.addConfetti({
            emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
            confettiNumber: 100,
          })
          
          .then(() => {
            console.log('Confetti animation completed!');
          })
          .catch((error) => {
            console.error('Confetti animation failed', error);
          });
          addCommandToHistory(cmd, <span>Party time!</span>);
          const canvas = document.querySelector('canvas');
if (canvas) {
  const context = canvas.getContext('2d');
  console.log('Canvas context:', context);
} else {
  console.log('No canvas found');
}
          break;
      default:
        handleAnswersAndCommands(cmd);
        break;
    }
  };
  
  return null;
};
 
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log('Form submitted, page should not reload.');
   // If the game is completed, check if the input is a reset command
   if (gameCompleted && input.trim().toLowerCase() !== 'reset') {
    console.log("Game completed. Type 'reset' to start a new game.");
    setInput('');
    return; 
  }
  if (input.trim().toLowerCase() === 'reset') {
    // Reset game state to allow new inputs and start a new game session
    setGameCompleted(false);
    setCurrentQuestionIndex(-1);
    setHistory(['Type \'help\' to get started']); // Optionally reset the command history
    // Any other state resets needed
    console.log("Game reset. Ready for a new game.");
    setInput('');
    return; // Prevent further processing of the 'reset' command beyond resetting state
  }
  void (async () => {
    if (currentQuestionIndex === questions.length - 1 && input.trim().toLowerCase() === questions[currentQuestionIndex]?.answer?.toLowerCase()) {
      try {
        const response = await fetch('/api/kv', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error('Failed to generate code');
        }

        const { uniqueCode } = await response.json() as GenerateCodeResponse;
        addCommandToHistory(input, <span className="text-green-500">Congratulations! Your unique code: {uniqueCode}. Use the /redeem command in Discord to claim your special role.</span>);

        setCurrentQuestionIndex(-1);
      } catch (error) {
          console.error('Error during code generation:', error);
          addCommandToHistory(input, <span>There was a problem generating your unique code. Please try again.</span>);
      }
    } else {
      // The catch method is used here to handle any potential errors from processCommand.
      processCommand(input).catch(error => console.error("Error processing command:", error));
    }
  })();

  setInput('');
};


return (
  <div ref={terminalRef} className="min-h-screen w-full overflow-y-auto px-4 md:px-0 md:pt-8">

    {/* Command history */}
    {history.map((item, index) => (
      <div key={index} >{item}</div>
    ))}
    {/* Input form */}
    <form onSubmit={handleSubmit} className="flex w-full font-space-mono">
      <label className="mr-2 hidden text-orange-500 md:flex">admin@orangecube:~/</label>
      <label className="mr-2 text-orange-500 md:hidden">admin:~/</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="m-0 flex-1 border-none bg-background p-0 font-space-mono text-base text-black outline-none dark:text-white md:text-sm lg:text-base" // Adjust font sizes here
        autoFocus
      />
    </form>
  </div>
);
};

export default Terminal;
