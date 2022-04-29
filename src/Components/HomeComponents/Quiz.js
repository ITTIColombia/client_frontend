import React from 'react'
import {useEffect, useState} from "react";
import { FormattedMessage } from 'react-intl'
import QuizQuestion from './QuizQuestion'
import Question1 from '../../Mockup/QuizQuestions/QuizQuestion1.json';
import Question2 from '../../Mockup/QuizQuestions/QuizQuestion2.json';
import Question3 from '../../Mockup/QuizQuestions/QuizQuestion3.json';

function Quiz() {

    let userLang = navigator.language || navigator.userLanguage;

    const english = userLang.startsWith('en')? true: !userLang.startsWith('es');

    const [question1, setQuestion1] = useState(Question1);
    const [question2, setQuestion2] = useState(Question2);
    const [question3, setQuestion3] = useState(Question3);


    return (
        <div className='Quiz'>
            <div className='quiz-title'>
                <h3><FormattedMessage id="QuizTitle"/></h3>
                <p><FormattedMessage id="QuizText"/></p>
            </div>
            <div className='quiz-questions'>
                <div className='quiz-block'>
                    <img className='quiz-photo' src={"/Images/Mockup/QuizQuestions/Foto1.png"} alt="photo1quiz"/>
                    <QuizQuestion question="Hola?" answer1="si" answer2="no"/>
                </div>
                <div className='quiz-block'>
                    <img className='quiz-photo' src={"/Images/Mockup/QuizQuestions/Foto1.png"} alt="photo1quiz"/>
                    <QuizQuestion question="Hola?" answer1="si" answer2="no"/>
                </div>
                <div className='quiz-block'>
                    <img className='quiz-photo' src={"/Images/Mockup/QuizQuestions/Foto1.png"} alt="photo1quiz"/>
                    <QuizQuestion question="Hola?" answer1="si" answer2="no"/>
                </div>
            </div>
        </div>
    )
}

export default Quiz