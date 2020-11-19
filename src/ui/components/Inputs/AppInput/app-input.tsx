import React, { useRef } from 'react';
import styles from './app-input.module.scss';
import { useField } from 'formik';

interface IAppInputProps {
  label?: string;
  name: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  type?: string;
}

export const AppInput: React.FC<IAppInputProps> = (props) => {
  const inputRef = useRef(null);
  const { label, id, required, disabled, type, ...rest } = props;
  const [field, meta] = useField(props);

  return (
    <div
      className={[
        styles.inputWrapper,
        meta.touched && meta.error ? styles.wrapperError : ''
      ].join(' ')}
    >
      {label && (
        <label htmlFor={id}>
          {label}
          {required && (
            <span style={{ color: '#e04949', marginLeft: '5px' }}>*</span>
          )}
        </label>
      )}
      <input
        id={id}
        ref={inputRef}
        required={required}
        disabled={disabled}
        type={type ? type : 'text'}
        {...field}
        {...rest}
      />
      {meta.touched && meta.error && (
        <div className={styles.errorContainer}>
          <small>{meta.error}</small>
        </div>
      )}
    </div>
  );
};
