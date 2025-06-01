/*
We used a PlaidLinkWrapper component to handle the asynchronous fetching of the Plaid link 
token before rendering the actual PlaidLink component because:
    - The usePlaidLink hook requires a valid token when it is called.
    - The link token must be created asynchronously (via a backend call).
    - React hooks can’t be called conditionally or inside promises—so we can’t call 
    usePlaidLink until we have the token.
    - Wrapping PlaidLink inside PlaidLinkWrapper lets us fetch the token first, then pass 
    it as a prop so PlaidLink can call usePlaidLink with a valid token right away.
This pattern ensures hooks rules are respected and avoids errors from calling usePlaidLink without a proper token.
*/

import React, { useEffect, useState } from 'react';
import PlaidLink from './PlaidLink'; 
import { createPlaidLinkToken } from './plaidService';

const PlaidLinkWrapper: React.FC = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createPlaidLinkToken()
      .then(token => {
        setLinkToken(token);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to create Plaid link token:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading Plaid Link...</div>;
  }

  if (!linkToken) {
    return <div>Failed to load Plaid Link Token.</div>;
  }

  return <PlaidLink token={linkToken} />;
};

export default PlaidLinkWrapper;
