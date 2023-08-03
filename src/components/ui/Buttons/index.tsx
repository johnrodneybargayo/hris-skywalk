import * as React from 'react';

interface ButtonProps {
  value: string | number | JSX.Element;
  className?: string;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
  is_loading?: boolean;
  role?: string;
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = (props) => {
  const loading_class = props.is_loading ? 'is-loading' : '';
  const is_disabled = props.is_loading ? true : props.disabled;

  return (
    <button
      className={[props.className, 'button-74', loading_class].join(' ').trim()}
      onClick={props.onClick}
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
      className={`button-74 has-background-primary ${props.className} ${loading_class}`}
      disabled={is_disabled}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

// New UploadButton component
export const UploadButton: React.FunctionComponent<ButtonProps> = (props) => {
  const loading_class = props.is_loading ? 'is-loading' : '';
  const is_disabled = props.is_loading ? true : props.disabled;

  return (
    <button
      type="button"
      className={`button-74 is-info ${props.className} ${loading_class}`}
      disabled={is_disabled}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};
