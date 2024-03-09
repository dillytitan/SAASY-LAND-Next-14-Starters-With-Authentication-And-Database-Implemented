// components/NewsletterSignUpForm.tsx

import { useState } from 'react';

export default function NewsletterSignUpForm(): JSX.Element {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/klaviyo/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe');
      }

      // Reset form and state
      setEmail('');
      setError('');
    } catch (error) {
      setError('Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="flex items-center" onSubmit={handleSubmit}>
      <input
        className="mr-2 rounded border p-2"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </button>
      {error && <p className="text-red-500 ml-2">{error}</p>}
    </form>
  );
}
