import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { FormControl, FormLabel, Input, InputProps } from '@chakra-ui/react';
import styles from './app-input.module.scss';

interface IAppInputProps extends InputProps {
  label?: string;
  name: string;
  required?: boolean;
}

export const AppInput: React.FC<IAppInputProps> = (props) => {
  const inputRef = useRef(null);
  const { id, label, name, required, ...rest } = props;
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <FormControl id={id} paddingY="3">
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        isInvalid={error ? true : false}
        name={name}
        ref={inputRef}
        defaultValue={defaultValue}
        required={required}
        {...rest}
      />
      {error && <small className={styles.errorMsg}>{error}</small>}
    </FormControl>
  );
};
