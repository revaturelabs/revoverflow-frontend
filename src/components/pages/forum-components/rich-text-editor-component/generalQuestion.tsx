
import React, {useState} from 'react';

const questionList = [
    'Learn React',
    'Learn Firebase',
    'Learn GraphQL',
];

export const RevatureQuestionComponent: React.FC = () => {
   
    const[list, setList] = React.useState(questionList);
    return (
        <div>
            {/* <ul>
                {list.map(item =>{
                    <li key={item}>{item}</li>
                })}
            </ul> */}
        </div>
    )
}