import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from '../../lib/firebase';

const functions = getFunctions(app);


export const createPlaidLinkToken = async (): Promise<string> => {
  const callable = httpsCallable(functions, 'createPlaidLinkToken');
  const result = await callable();
  const data = result.data as { linkToken: string };
  return data.linkToken;
};

export const exchangePublicToken = async (publicToken: string): Promise<void> => {
  const callable = httpsCallable(functions, 'exchangePublicToken');
  await callable({ publicToken });
};
