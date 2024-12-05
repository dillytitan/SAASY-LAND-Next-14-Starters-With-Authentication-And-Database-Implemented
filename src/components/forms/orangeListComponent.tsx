'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
// import { FaTwitter } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import Link from 'next/link';

export default function OrangeListComponent() {
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [currentField, setCurrentField] = useState('name');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentField === 'newsletter') {
      const templateParams = {
        name,
        email,
        twitterHandle,
        walletAddress,
        newsletter: newsletter ? 'Yes' : 'No',
      };

      try {
        const response = await emailjs.send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Service ID
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Template ID
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY // Public Key
        );
        console.log('SUCCESS!', response.status, response.text);
        setSubmitted(true);
      } catch (error) {
        console.error('FAILED...', error);
      }
    } else {
      // Move to the next field
      if (currentField === 'name') {
        setName(input);
        setInput('');
        setCurrentField('email');
      } else if (currentField === 'email') {
        setEmail(input);
        setInput('');
        setCurrentField('twitter');
      } else if (currentField === 'twitter') {
        setTwitterHandle(input);
        setInput('');
        setCurrentField('wallet');
      } else if (currentField === 'wallet') {
        setWalletAddress(input);
        setInput('');
        setCurrentField('newsletter');
      }
    }
  };

  const asciiArt = `
   ____                             _     _     _   
  / __ \\                           | |   (_)   | |  
 | |  | |_ __ __ _ _ __   __ _  ___| |    _ ___| |_ 
 | |  | | '__/ _\` | '_ \\ / _\` |/ _ \\ |   | / __| __|
 | |__| | | | (_| | | | | (_| |  __/ |___| \\__ \\ |_ 
  \\____/|_|  \\__,_|_| |_|\\__, |\\___|______/_|___/\\__|
                          __/ |                     
                         |___/                      
`;

  return (
    <>
      <pre className="mb-4 break-words text-xs text-orange-500 sm:text-base">{asciiArt}</pre>
      <a
        href="https://x.com/orangecube_art"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {/* <FaTwitter className="mx-auto mb-8 text-xl text-orange-500 hover:text-orange-600 sm:text-2xl" /> */}
      </a>
      <div className="mb-4 px-2 text-sm sm:text-base">
        Welcome to Orange Cube Terminal. Please enter your details:
      </div>
      {!submitted ? (
        <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e).catch((err) => {
            console.error('Error during form submission:', err);
          });
        }}
        className="mx-auto max-w-sm space-y-4 px-4"
      >
          <div className="text-sm sm:text-base">
            {currentField === 'name' && '> Enter your name:'}
            {currentField === 'email' && '> Enter your email:'}
            {currentField === 'twitter' && '> Enter your Twitter handle:'}
            {currentField === 'wallet' && '> Enter your wallet address:'}
            {currentField === 'newsletter' && '> Would you like to subscribe to our newsletter?'}
          </div>
          {currentField !== 'newsletter' ? (
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border-orange-500 bg-black text-sm text-orange-500 sm:text-base"
            />
          ) : (
            <div className="flex items-center">
              <Checkbox
                checked={newsletter}
                onCheckedChange={(checked) => setNewsletter(!!checked)}
                className="mr-2"
              />
              <label className="text-sm text-orange-500 sm:text-base">
                Yes, subscribe me to the newsletter
              </label>
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-orange-500 text-sm text-black hover:bg-orange-600 sm:text-base"
          >
            Submit
          </Button>
        </form>
      ) : (
        <div className="space-y-2 text-sm sm:text-base">
          <div>Thank you for submitting your details:</div>
          <div>Name: {name}</div>
          <div>Email: {email}</div>
          <div>Twitter Handle: {twitterHandle}</div>
          <div>Wallet Address: {walletAddress}</div>
          <div>Subscribed to Newsletter: {newsletter ? 'Yes' : 'No'}</div>
          <Link href="https://orangecube.art" target="_self" rel="noopener noreferrer" className='text-sm text-orange-500 hover:text-orange-600 sm:text-base'> Go to site</Link>
        </div>
      )}
    </>
  );
}
