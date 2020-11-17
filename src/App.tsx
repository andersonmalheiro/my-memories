import React from 'react';
import { AuthProvider } from 'context/auth';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Routes from 'routes';

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  );
};
