import {ButtonHTMLAttributes} from "react";
// type Props={
//     title: string,
//     onClickHandler?: () => void,
//     disabled?: boolean,
//     className?: string
// }

type Props=ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({title, onClick,disabled,className }:Props) => {
    return (
        <button className={className}
                disabled={disabled}
                onClick={onClick}>{title}</button>

    );
};
