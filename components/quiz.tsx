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
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

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

    const handleSubmitButton = () => {
        let newScore = 0;
        for (let i = 0; i < questions.length; i++) {
          questions[i].answerOptions.map(
            (answer) =>
              answer.isCorrect &&
              answer.answer === selectedOptions[i]?.answerByUser &&
              (newScore += 1)
          );
        }
        setScore(newScore);
        setShowScore(true);
      };

      return (
        <React.Fragment>
            {showScore ? (
                <h1 className="text-3xl font-semibold text-center text-white">
                    You scored {score} out of {questions.length}
                </h1>
            ): (
                <React.Fragment>
                <h1 className="text-white font-bold text-3xl">Nathan&apos;s Minecraft Quiz</h1>
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
                    className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5
                        hover:border-white focus-within:border-white"
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
                        className="w-[49%] py-3 bg-green-600 rounded-lg border-2 border-green-600 hover:border-white focus:border-white"
                        >Previous</button>
                    <button
                        onClick={
                            currentQuestion + 1 === questions.length ? handleSubmitButton : handleNext
                        }
                        className="w-[49%] py-3 bg-green-600 rounded-lg border-2 border-green-600 hover:border-white focus:border-white"
                        >
                        {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
                        </button>
    
                </div>
                
            </React.Fragment>
            )}
        </React.Fragment>
      )
    
}