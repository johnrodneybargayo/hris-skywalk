import React from 'react';

interface ButtonProps {
  value: JSX.Element | React.ReactText;
  className?: string;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  is_loading?: boolean;
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
  const loading_class = props.is_loading ? 'is-loading' : '';
  const is_disabled = props.is_loading ? true : props.disabled;

  return (
    <button
      className={[props.className, 'button', loading_class].join(' ').trim()}
      onClick={props.onClick}
      role="button"
      type="button"
      disabled={is_disabled}
    >
      {props.value}
    </button>
  );
};

export const SubmitButton: React.FunctionComponent<ButtonProps> = (props) => {
  const loading_class = props.is_loading ? 'is-loading' : '';
  const is_disabled = props.is_loading ? true : props.disabled;

  return (
    <button
      type="submit"
      className={`button is-rounded has-background-primary ${props.className} ${loading_class}`}
      disabled={is_disabled}
      onClick={props.onClick}
      role="button" // Set the role to "button" for a regular button
    >
      {props.value}
    </button>
  );
};
