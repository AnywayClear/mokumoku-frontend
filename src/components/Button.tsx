import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'thirdly';
  size?: 'small' | 'medium' | 'large';
}

export function Button({
  variant = 'primary',
  size = 'medium',
  ...props
}: Props) {
  return (
    <button
      style={{
        outline: 'none',
        border: '0 solid transparent',
        borderRadius: '7px',
        cursor: 'pointer',
        transition: 'background .2s ease,color .1s ease',
        fontWeight: 600,
        lineHeight: '26px',
        ...TYPE_VARIANTS[variant],
        ...SIZE_VARIANTS[size],
      }}
      {...props}
    />
  );
}

const TYPE_VARIANTS = {
  primary: {
    color: '#53AD56',
    backgroundColor: '#DDEFDD',
    '&:hover': {
      backgroundColor: '#53AD56',
    },
  },
  secondary: {
    color: '#DDEFDD',
    backgroundColor: '#53AD56',
    '&:hover': {
      backgroundColor: '#53AD56',
    },
  },
  thirdly: {
    color: '#f9fafb',
    backgroundColor: '#d1d5db',
    '&:hover': {
      backgroundColor: '#d1d5db',
    },
  }
};

const SIZE_VARIANTS = {
  small: {
    fontSize: '9px',
    padding: '1px 12px',
  },
  medium: {
    fontSize: '15px',
    padding: '11px 16px',
  },
  large: {
    fontSize: '17px',
    padding: '11px 22px',
  },
};
