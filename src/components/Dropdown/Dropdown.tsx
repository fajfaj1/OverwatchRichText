import './dropdown.css';
import '../input.css';
import type { InputSize, InputVariant } from '@/types/Input';
import { useState } from 'react';
import Caret from '@/components/icons/FontAwesome/Caret';
import { Popover } from '../Popover/Popover';

export type Option = { id: string; name: string; icon?: React.ReactNode };

function DropdownOption({
    name,
    option,
    onChoice,
    defaultOption,
}: {
    name: string;
    option: Option;
    onChoice: (option: Option) => void;
    defaultOption?: Option;
}) {
    const id = `dropdown-option-${option.name}`;
    return (
        <>
            <input
                type='radio'
                name={`dropdown-option-${name}`}
                className='dropdown-option-checkbox'
                id={id}
                onChange={() => onChoice(option)}
            />
            <label className='dropdown-option' key={option.id} htmlFor={id}>
                {' '}
                <>
                    <div className='dropdown-option-icon'>
                        {option.icon || ''}
                    </div>
                    <span className='dropdown-option-label'>{option.name}</span>
                </>
            </label>
        </>
    );
}

export function Dropdown({
    name,
    options,
    onChoice,
    variant = 'normal',
    size = 'full',
}: {
    name: string;
    options: Option[];
    onChoice: (option: Option) => void;
    variant: InputVariant;
    size: InputSize;
    defaultOption?: Option;
}) {
    const [currentOption, setCurrentOption] = useState<Option>(options[0]);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='dropdown'>
            <Popover
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                content={
                    <>
                        <fieldset className='dropdown-popover'>
                            {options.map((option) =>
                                DropdownOption({
                                    name,
                                    option,
                                    onChoice: (choice) => {
                                        setCurrentOption(choice);
                                        setIsOpen(false);
                                        onChoice(choice);
                                    },
                                })
                            )}
                        </fieldset>
                    </>
                }
            >
                <div className='dropdown-button-wrapper'>
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`input input-${variant} dropdown-button input-${size}`}
                    >
                        <div className='dropdown-button-label'>
                            {/* <div className='dropdown-option-icon'> */}
                            {currentOption.icon}
                            {/* </div> */}
                            <span className='dropdown-button-label-text'>
                                {currentOption.name}
                            </span>
                        </div>
                        <Caret />
                    </button>
                </div>
            </Popover>
        </div>
    );
}
