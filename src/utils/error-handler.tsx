import { AxiosError } from 'axios';
import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';

const toast = createStandaloneToast();

const config: UseToastOptions = {
  duration: 9000,
  isClosable: true,
  position: 'top-right',
};

export const handleError = (error: AxiosError) => {
  const { response } = error;
  if (response && response.data) {
    const { message } = response.data;

    if (message && typeof message === 'string' && message.length) {
      toast({
        ...config,
        status: 'error',
        title: 'Oops...',
        description: message,
      });
    } else {
      toast({
        ...config,
        status: 'error',
        title: 'Oops...',
        description: 'Algo de errado aconteceu.',
      });
    }
  } else {
    toast({
      ...config,
      status: 'error',
      title: 'Oops...',
      description: 'Algo de errado aconteceu.',
    });
  }
};
