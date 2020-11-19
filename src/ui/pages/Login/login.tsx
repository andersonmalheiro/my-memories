import React, { useState } from 'react';
import styles from './login.module.scss';
import { Flex, Button, Image } from '@chakra-ui/react';
import { AppInput } from 'ui';
import { object, string } from 'yup';
import { ColorModeSwitcher } from 'ColorModeSwitcher';
import { Formik, Form } from 'formik';
import logo from 'assets/icons/memory.svg';
import useAuth from 'context/auth';
import { ILoginBody } from 'api';
import { Redirect } from 'react-router-dom';

export const Login = () => {
  const [invalid, setInvalid] = useState(false);
  const { authenticate, isAuthenticated, loading } = useAuth();

  const schema = object().shape({
    username: string()
      .min(3, 'Must be 3 characters or more')
      .required('Field required'),
    password: string()
      .min(3, 'Must be 3 characters or more')
      .required('Field required'),
  });

  const initialValues: ILoginBody = {
    username: '',
    password: '',
  };

  const handleSubmit = (data: ILoginBody) => {
    authenticate(data);
  };

  const validateForm = async (data: ILoginBody) => {
    try {
      await schema.validate(data);
      setInvalid(false);
    } catch (error) {
      setInvalid(true);
    }
  };


  if (isAuthenticated) {
    return <Redirect to="/memories" />;
  }

  return (
    <div className={styles.container}>
      <ColorModeSwitcher className={styles.colorSwitcher} />
      <div className={styles.formBox}>
        <Image src={logo} boxSize="80px" marginBottom={'3'} />
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          <Form className={styles.form}>
            <AppInput
              type="text"
              label={'User'}
              placeholder={'Your user name'}
              required
              minLength={3}
              name={'username'}
              id={'username'}
            />
            <AppInput
              type="password"
              label={'Password'}
              placeholder={'Your password'}
              required
              name={'password'}
              id={'password'}
              minLength={3}
              maxLength={32}
            />

            <Flex direction="column" marginTop="6">
              <Button
                colorScheme="blue"
                isFullWidth
                marginBottom="3"
                type="submit"
                isLoading={loading}
                isDisabled={invalid}
              >
                Login
              </Button>
              <Button colorScheme="blue" variant="outline" isFullWidth>
                Register
              </Button>
            </Flex>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
