import React, { useState, createContext, useContext } from 'react';

const DropDownContext = createContext();

const Dropdown = ({ children, align = 'right', width = '48', contentClasses = 'py-1 bg-white dark:bg-gray-700' }) => {
    const [open, setOpen] = useState(false);

    const alignmentClasses = {
        left: 'ltr:origin-top-left rtl:origin-top-right start-0',
        top: 'origin-top',
        right: 'ltr:origin-top-right rtl:origin-top-left end-0',
    }[align] || 'ltr:origin-top-right rtl:origin-top-left end-0';

    const widthClasses = {
        48: 'w-48',
    }[width] || width;

    return (
        <DropDownContext.Provider value={{ open, setOpen, alignmentClasses, widthClasses, contentClasses }}>
            <div className="relative">
                {children}
            </div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={() => setOpen(!open)}>{children}</div>
        </>
    );
};

const Content = ({ children }) => {
    const { open, setOpen, alignmentClasses, widthClasses, contentClasses } = useContext(DropDownContext);

    return (
        <>
            <div
                className={`absolute z-50 mt-2 ${widthClasses} rounded-md shadow-lg ${alignmentClasses}`}
                style={{ display: open ? 'block' : 'none' }}
                onClick={() => setOpen(false)}
            >
                <div className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}>
                    {children}
                </div>
            </div>
        </>
    );
};

const Link = ({ href, method = 'get', as = 'a', children, ...props }) => {
    const { setOpen } = useContext(DropDownContext);

    const handleClick = () => {
        setOpen(false);
    };

    if (as === 'button') {
        return (
            <button
                {...props}
                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
                onClick={handleClick}
            >
                {children}
            </button>
        );
    }

    return (
        <a
            href={href}
            className="block px-4 py-2 text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
            onClick={handleClick}
            {...props}
        >
            {children}
        </a>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = Link;

export default Dropdown;