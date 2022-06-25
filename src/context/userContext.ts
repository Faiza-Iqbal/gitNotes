import { createContext } from 'react';

const userContext = createContext({user: null as any,accessToken:''});
export default userContext;