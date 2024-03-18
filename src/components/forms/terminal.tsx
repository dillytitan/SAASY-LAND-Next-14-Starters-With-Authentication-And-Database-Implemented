
/* eslint-disable @typescript-eslint/no-misused-promises */
// Import React and useState, useEffect, useRef hooks
import React, { useState, useEffect, useRef } from 'react';


// Define type for questions and history items
type Question = {
  prompt: string;
  answer: string;
  hint: string;
};

interface GenerateCodeResponse {
  uniqueCode: string; // Adjust according to the actual expected structure
}


type HistoryItem = React.ReactNode;

const questions: Question[] = [
  { prompt: "Enter the cube? (y/n)", answer: "y", hint: "" },
  { prompt: "Wen?", answer: "2009", hint: "What year did it start?" },
  { prompt: "Why?", answer: "second bailout", hint: "When banks faltered and the economy quaked, Bitcoin emerged from the _ _ _ _ _ _  _ _ _ _ _ _ _?" },
  { prompt: "What?", answer: "genesis block", hint: "In the beginning, what happened?" },
  { prompt: "Who?", answer: "satoshi nakamoto", hint: "Who is Anon?" },
];

// Define file contents
const fileContents = {
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

const Terminal: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<React.ReactNode[]>(['Type \'help\' to get started']);
  const [viewingFileContent, setViewingFileContent] = useState<string | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
const [requestingHint, setRequestingHint] = useState<boolean>(false);

useEffect(() => {
  const terminalElement = terminalRef.current;

  // Function to handle scroll
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

  const processCommand = (cmd: string) => {
    if (viewingFileContent && cmd.trim().toLowerCase() === 'exit') {
      setViewingFileContent(null); // Exit file view mode
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
  
    // Handle game completion and code generation
    const uniqueCode = '12345'; // Replace 'YOUR_UNIQUE_CODE' with the actual unique code

    if (currentQuestionIndex === questions.length - 1 && cmd.trim().toLowerCase() === questions[currentQuestionIndex]?.answer?.toLowerCase()) {

      setCurrentQuestionIndex(-1);

      addCommandToHistory(cmd, <span className="text-green-500">Congratulations! You&apos;ve completed the game. Your unique code: {uniqueCode}. Use this in Discord to claim your role.</span>);
      return;
    }
  
  
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

        addCommandToHistory(cmd, 
          `++++++++++++++++++++++++++++++++++++++++++++++++++++++
          ++++++++++++++++++++++++++++++++++++++++++++++++++++++
          ++++++++++++            ++++++            ++++++++++++
          +++++++++++++           ++++++           +++++++++++++
          ++++++++++++++          ++++++          ++++++++++++++
          ++++++++++++++++++++++++++++++++++++++++++++++++++++++
          ++++++++++++++++         ++++         ++++++++++++++++
          ++++++++++++++++         ++++         ++++++++++++++++
          ++++++++++++++++++++++++++++++++++++++++++++++++++++++
          +++++++++++++++++++      ++++      +++++++++++++++++++
          ++++++++++++++++++++++++++++++++++++++++++++++++++++++
          ++++++++++++++++++                   +++++++++++++++++
          ++++++++++++++++++                   +++++++++++++++++
          ++++++++++++++++++                   +++++++++++++++++
          ++++++++++++++++++                   +++++++++++++++++
          ++++++++++++++++++                   +++++++++++++++++
          ++++++++++++++++++                   +++++++++++++++++
          ++++++++++++++++++                   +++++++++++++++++
          ++++++++++++++++++                   +++++++++++++++++
          ++++++++++++++++++                   +++++++++++++++++
          ++++++++++++++++++                   +++++++++++++++++
          ++++++++++++++++++++++++++++++++++++++++++++++++++++++
          +++++++++++++++                        +++++++++++++++
          ++++++++++++                              ++++++++++++
          +++++++++                                    +++++++++
          ++++++++++++++++++++++++++++++++++++++++++++++++++++++
          ++++++++++++++++++++++++++++++++++++++++++++++++++++++
          ++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
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
          // Start the game by setting the current question index to 0
          setCurrentQuestionIndex(0);
          setViewingFileContent(null); 
          const firstQuestionPrompt = questions[0]?.prompt; 
          addCommandToHistory(cmd, <span>{firstQuestionPrompt}</span>); 
        } else {
          // Game already started
          addCommandToHistory(cmd, <span>You are already inside the cube. Answer the question or type &apos;hint&apos; for help.</span>);
        }
        break;
      case 'hint':
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
          // Provide a hint for the current question
          const hint = questions[currentQuestionIndex]?.hint; 
          addCommandToHistory(cmd, <span>{hint}</span>);
        }
        break;
      default:
        handleAnswersAndCommands(cmd);
        break;
    }
  };
  
  const handleAnswersAndCommands = (cmd: string) => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion && cmd.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
        // Correct answer
        const nextIndex = currentQuestionIndex + 1;
        if (nextIndex < questions.length) {
          setCurrentQuestionIndex(nextIndex); // Proceed to next question
          addCommandToHistory(cmd, <span className="text-green-500">Correct!</span>);
          addCommandToHistory("", <span>{questions[nextIndex]?.prompt}</span>); // Show next question with null check
        } else {
          // All questions answered correctly
          setCurrentQuestionIndex(-1); // Reset game index
          addCommandToHistory(cmd, <span className="text-green-500">Correct! You&apos;ve completed the challenge.</span>);
          // Show completion message
          addCommandToHistory("", <pre>{`Whois Orangecube\n${fileContents["about.txt"]}\n${fileContents["mission.txt"]}`}</pre>);
        }
      } else if (!viewingFileContent) {
        // Incorrect answer and not viewing a file
        addCommandToHistory(cmd, <span className="text-red-500">Incorrect. Try again or type &lsquo;hint&rsquo; for a hint.</span>);
      }
    } else if (!viewingFileContent) {
      // Command not recognized and not part of the game
      addCommandToHistory(cmd, <span className="text-red-500">Command not found: {cmd}</span>);
    }
  };

 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Only proceed with API call if it's the game completion scenario
    if (currentQuestionIndex === questions.length - 1 && input.trim().toLowerCase() === questions[currentQuestionIndex]?.answer?.toLowerCase()) {
        try {
          const response = await fetch('/api/kv/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}), // You can send additional data here if needed
        });

            if (!response.ok) {
                throw new Error('Failed to generate code');
            }

            // Using type assertion for TypeScript's benefit
            const { uniqueCode } = await response.json() as GenerateCodeResponse;
            addCommandToHistory('complete', <span className="text-green-500">Your unique code: {uniqueCode}. Use this in Discord to claim your role.</span>);

            // Game completion logic here
            setCurrentQuestionIndex(-1);
        } catch (error) {
            console.error('Error during code generation:', error);
            addCommandToHistory('error', <span>There was a problem generating your unique code. Please try again.</span>);
        }
    } else {
      // For all other commands, process as usual
      processCommand(input);
    }

    setInput(''); // Clear the input field
};

return (
  <div ref={terminalRef} className="min-h-screen w-full px-4 md:px-8 overflow-y-auto">

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
        className="m-0 flex-1 border-none bg-background p-0 font-space-mono text-black outline-none dark:text-white text-base md:text-sm lg:text-base" // Adjust font sizes here
        autoFocus
      />
    </form>
  </div>
);
};

export default Terminal;
