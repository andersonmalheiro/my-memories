import React from 'react';
import { ChakraProvider, theme, Flex } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Flex alignItems="center" justifyContent="space-between" padding="1rem">
      <h1>My memories</h1>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  </ChakraProvider>
);
