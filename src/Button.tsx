import {ButtonHTMLAttributes} from "react";

type Props=ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({title, onClick,disabled,className }:Props) => {
    return (
        <button className={className}
                disabled={disabled}
                onClick={onClick}>{title}</button>

    );
};
