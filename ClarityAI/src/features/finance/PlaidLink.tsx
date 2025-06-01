import React from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { exchangePublicToken } from './plaidService';

type PlaidLinkProps = {
  token: string;
};

const PlaidLink: React.FC<PlaidLinkProps> = ({ token }) => {
  const onSuccess = (publicToken: string) => {
    exchangePublicToken(publicToken)
      .then(() => alert('Bank account connected!'))
      .catch(err => {
        console.error('Failed to exchange public token:', err);
      });
  };

  const config = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect Bank Account
    </button>
  );
};

export default PlaidLink;
