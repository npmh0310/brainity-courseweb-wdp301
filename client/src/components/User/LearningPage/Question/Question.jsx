import { Checkbox } from '@mui/material';
import React, { useState } from 'react';

function Question() {
    const answers = [
        "React is a JavaScript library for building user interfaces.",
        "React is maintained by Facebook and a community of individual developers.",
        "React can be used to build single-page applications.",
        "React allows developers to create large web applications that can update and render efficiently."
    ];

    const [checkedItems, setCheckedItems] = useState(new Array(answers.length).fill(false));

    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
    };

    return (
        <div className='px-4 py-2 mb-4'>
            <h2 className='p-2 mb-2 text-lg'>
                <strong>1. </strong>Describe React JS?
            </h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {answers.map((answer, index) => (
                    <div
                        key={index}
                        className={`p-2 flex justify-start items-center gap-2 border rounded-md cursor-pointer ${
                            checkedItems[index] ? 'bg-blue-200' : ''
                        }`}
                        onClick={() => handleCheckboxChange(index)}
                    >
                        <Checkbox checked={checkedItems[index]} onChange={() => handleCheckboxChange(index)} />
                        <p>{answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Question;
