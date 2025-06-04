// src/components/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Si usas React Router Link

const baseClasses = "flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition duration-300 w-full";

const Button = ({ to, onClick, children, className, target, rel, type = 'button', disabled }) => {
  const fullClassName = `${baseClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if (to) {
    return (
      <Link to={to} className={fullClassName}>
        <span className="truncate">{children}</span>
      </Link>
    );
  } else if (target === '_blank') { // Para enlaces externos como WhatsApp
    return (
      <a href={onClick} className={fullClassName} target={target} rel={rel}> {/* onClick ahora es la URL */}
        <span className="truncate">{children}</span>
      </a>
    );
  } else {
    return (
      <button type={type} onClick={onClick} className={fullClassName} disabled={disabled}>
        <span className="truncate">{children}</span>
      </button>
    );
  }
};

export default Button;