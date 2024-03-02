"use client";

import React, { useState } from "react";
import questions from "../public/questions.json";

export default function Quiz() {

    type Answer = {
        answerByUser: string;
    }

    const initialSelectedOptions: Answer[] = [];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState(initialSelectedOptions);

    const handlePrevious = () => {
        const prevQues = currentQuestion - 1;
        prevQues >= 0 && setCurrentQuestion(prevQues);
    };
  
    const handleNext = () => {
        const nextQues = currentQuestion + 1;
        nextQues < questions.length && setCurrentQuestion(nextQues);
    };

    const handleAnswerOption = (answer: string) => {
        setSelectedOptions([
            (selectedOptions[currentQuestion] = { answerByUser: answer }),
        ]);
        setSelectedOptions([...selectedOptions]);
    };

    return (
        <React.Fragment>
            <div className="flex flex-col items-start w-full">
                <h2 className="mt-10 text-xl text-white/70">
                    Question {currentQuestion + 1} of {questions.length}
                </h2>
                <div className="mt-4 text-2xl text-white">
                    {questions[currentQuestion].question}
                </div>
            </div>
            <div className="flex flex-col w-full">
            {questions[currentQuestion].answerOptions.map((answer, index) => (
                <div
                key={index}
                className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
                onClick={(e) => handleAnswerOption(answer.answer)}
                >
                <input
                    type="radio"
                    name={answer.answer}
                    value={answer.answer}
                    onChange={(e) => handleAnswerOption(answer.answer)}
                    checked={
                    answer.answer === selectedOptions[currentQuestion]?.answerByUser
                    }
                    className="w-6 h-6 bg-black"
                />
                <p className="ml-6 text-white">{answer.answer}</p>
                </div>
            ))
            }
            </div>
            <div className="flex justify-between w-full mt-4 text-white">
                <button
                    onClick={handlePrevious}
                    className="w-[49%] py-3 bg-green-600 rounded-lg"
                    >Previous</button>
                <button
                    onClick={handleNext}
                    className="w-[49%] py-3 bg-green-600 rounded-lg"
                    >Next</button>
            </div>
        </React.Fragment>
    )
    
}