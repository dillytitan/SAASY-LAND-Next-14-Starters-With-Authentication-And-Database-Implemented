// Import React and useState, useEffect, useRef hooks
import React, { useState, useEffect, useRef } from 'react';
import { kv } from "@vercel/kv";

// Define type for questions and history items
type Question = {
  prompt: string;
  answer: string;
  hint: string;
};

type HistoryItem = React.ReactNode;

const generateUniqueCode = () => {
  // Example: Generate a random code. Adjust the method according to your requirements
  return Math.random().toString(36).substr(2, 9);
};


const questions: Question[] = [
  { prompt: "Enter the cube? (y/n)", answer: "y", hint: "" },
  { prompt: "Wen?", answer: "2009", hint: "What year did it start?" },
  { prompt: "Why?", answer: "second bailout", hint: "Banks on the brink of _______________________?" },
  { prompt: "What?", answer: "genesis block", hint: "In the beginning, what happened?" },
  { prompt: "Who?", answer: "satoshi nakamoto", hint: "Anon" },
];

// Define file contents
const fileContents = {
  "about.txt": `exclusive digital arthouse

>> offering curated releases of the best digital artists on BTC

>> highlighting art that pushes the boundaries of what’s possible on-chain

>> providing innovative release strategies to benefit both the artists and collectors

>> team

>> Aaron - Founder & Curator

>> Alec - Chief of Operations

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

>> Orange Cube is dedicated to showcasing the finest emerging digital art, inscribing it onto Bitcoin, and providing curated collections that are accessible to all collectors. Our mission goes beyond profitability, aiming to spark innovation and foster a vibrant community around on-chain art inscriptions.`,

  "contact.txt": `Get in Touch with Orangecube

>> We'd love to hear from you! Whether you're interested in our projects, looking to collaborate, or just want to say hello, here's how you can reach us:

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
  // Reference to the terminal container element
  const terminalElement = terminalRef.current;

  // Function to handle manual scroll
  const handleWheel = (event: WheelEvent) => {
    if (terminalElement) {
      event.preventDefault(); // Prevent the page scroll
      terminalElement.scrollTop += event.deltaY; // Manually adjust the terminal's scroll position
    }
  };

  // Adding the event listener when the component mounts
  terminalElement?.addEventListener('wheel', handleWheel);

  // Cleanup function to remove the event listener when the component unmounts
  return () => {
    terminalElement?.removeEventListener('wheel', handleWheel);
  };
}, []); 

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      await processCommand(input);
      setInput('');
    } else if (e.key === 'Backspace' && input.length) {
      setInput(input.slice(0, -1));
    } else if (e.key.length === 1) {
      setInput(input + e.key);
    }
  };

  const addCommandToHistory = (cmd: string, output: HistoryItem) => {
    setHistory(history => [
        ...history, 
        <div key={history.length}>
            <span className="">{`> ${cmd}`}</span>
        </div>, 
        output
    ]);
  };

  const processCommand = async (cmd: string) => {
    if (viewingFileContent && cmd.trim().toLowerCase() === 'exit') {
      setViewingFileContent(null); // Exit file view mode
      return;
    }
  
    if (cmd.startsWith('vi ')) {
      const fileName = cmd.substring(3).trim(); // Extract the filename from the command
      if (fileContents[fileName as keyof typeof fileContents]) { // Check if the filename exists in fileContents
        addCommandToHistory(cmd, <pre>{fileContents[fileName as keyof typeof fileContents]}</pre>); // Display the content
        return;
      } else {
        addCommandToHistory(cmd, <span>File not found.</span>); // File not found message
        return;
      }
    }
  
    // Handle game completion and code generation
    if (currentQuestionIndex === questions.length - 1 && cmd.trim().toLowerCase() === questions[currentQuestionIndex]?.answer?.toLowerCase()) {
      // Generate a unique code for the user upon successful game completion
      const uniqueCode = generateUniqueCode();
      await kv.set(uniqueCode, JSON.stringify({ redeemed: false, discordId: '' })); // Saving to KV store
  
      // Reset game state
      setCurrentQuestionIndex(-1);
  
      // Inform the user of their unique code
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
        setHistory([]); // Clear the terminal history
        break;
      case 'logo':
        // Insert your ASCII art or logic to show the logo
        addCommandToHistory(cmd, <pre>{/* ASCII Art Here */}</pre>);
        break;
      case 'ls':
        addCommandToHistory(cmd, <pre>{"about.txt\nmission.txt\ncontact.txt"}</pre>); // List available files
        break;
      case 'join':
        window.open('https://discord.gg/4RvS8ZwRcj', '_blank'); // Open Discord link
        addCommandToHistory(cmd, <span>Opening Discord...</span>);
        break;
      case 'cube':
        if (currentQuestionIndex === -1) {
          // Start the game by setting the current question index to 0
          setCurrentQuestionIndex(0);
          setViewingFileContent(null); // Ensure file view is not active
          const firstQuestionPrompt = questions[0]?.prompt; // Add null check
          addCommandToHistory(cmd, <span>{firstQuestionPrompt}</span>); // Show the first question with null check
        } else {
          // Game already started
          addCommandToHistory(cmd, <span>You are already inside the cube. Answer the question or type &apos;hint&apos; for help.</span>);
        }
        break;
      case 'hint':
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
          // Provide a hint for the current question
          const hint = questions[currentQuestionIndex]?.hint; // Add null check
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

  // Effect to update the terminal view when viewing a file's content
  useEffect(() => {
    if (viewingFileContent) {
      setHistory(currentHistory => [...currentHistory, <pre key="file-view">{viewingFileContent}</pre>]);
    }
  }, [viewingFileContent]);

  return (
    <div
      ref={terminalRef}
      tabIndex={0}
      onKeyDown={handleKeyDown as React.KeyboardEventHandler<HTMLDivElement>}
      className="h-[900px] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words bg-black p-4 font-space-mono text-white"
    >
      {history.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <div className="flex items-center">
        <span className="text-orange-500">admin@orangecube:</span>
        <span> ~/ </span>
        <span className="text-white">{input}</span>
        <div className="inline-block h-5 w-2 animate-pulse bg-white"></div>
      </div>
    </div>
  );
};

export default Terminal;
