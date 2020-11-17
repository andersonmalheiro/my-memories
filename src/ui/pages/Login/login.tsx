import React, { useRef, useState } from 'react';
import { Flex, Box, Button, Image } from '@chakra-ui/react';
import { AppInput } from 'ui';
import { Form } from '@unform/web';
import { ValidationError, object, string } from 'yup';
import styles from './login.module.scss';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
import logo from 'assets/icons/memory.svg';

export const Login = () => {
  const formRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: any) {
    setLoading(true);
    try {
      // Remove all previous errors
      formRef.current.setErrors({});
      const schema = object().shape({
        user: string().min(3).required(),
        password: string().min(6).required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      // Validation passed
      setTimeout(() => {
        console.log(data);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setLoading(false);
      const validationErrors: { [key: string]: string } = {};
      if (err instanceof ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <Box className={styles.container}>
      <ColorModeSwitcher className={styles.colorSwitcher} />
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        direction={'column'}
        borderWidth="1px"
        borderRadius="lg"
        padding="1rem"
        boxShadow="md"
      >
        <Image src={logo} boxSize="80px" marginBottom={'3'} />
        <Form onSubmit={handleSubmit} ref={formRef}>
          <AppInput
            type="text"
            label={'User'}
            placeholder={'Your user name'}
            isRequired
            required
            name={'user'}
            id={'user'}
          />
          <AppInput
            type="password"
            label={'Password'}
            placeholder={'Your password'}
            isRequired
            required
            name={'password'}
            id={'password'}
            maxLength={32}
          />

          <Flex direction="column" marginTop="6">
            <Button
              colorScheme="blue"
              isFullWidth
              marginBottom="3"
              type="submit"
              isLoading={loading}
            >
              Login
            </Button>
            <Button colorScheme="blue" variant="outline" isFullWidth>
              Register
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Box>
  );
};
