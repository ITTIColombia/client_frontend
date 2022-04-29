import React from 'react'
import {useEffect, useState} from "react";
import { FormattedMessage } from 'react-intl'
import QuizQuestion from './QuizQuestion'
import Question1 from '../../Mockup/QuizQuestions/QuizQuestion1.json';
import Question2 from '../../Mockup/QuizQuestions/QuizQuestion2.json';
import Question3 from '../../Mockup/QuizQuestions/QuizQuestion3.json';
import AppContext from "../../AppContext";
import {useContext} from "react";

function Quiz() {

    const context = useContext(AppContext);

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
                    <img className='quiz-photo' src={question1.photo} alt="photo1quiz"/>
                    <QuizQuestion question={context.languageSettings.locale.startsWith("en") ? question1.questionEN: question1.questionES}
                                  answer1={context.languageSettings.locale.startsWith("en") ? question1.option1EN: question1.option1ES}
                                  answer2={context.languageSettings.locale.startsWith("en") ? question1.option2EN: question1.option2ES} />
                </div>
                <div className='quiz-block'>
                    <img className='quiz-photo' src={question2.photo} alt="photo2quiz"/>
                    <QuizQuestion question={context.languageSettings.locale.startsWith("en") ? question2.questionEN: question2.questionES}
                                  answer1={context.languageSettings.locale.startsWith("en") ? question2.option1EN: question2.option1ES}
                                  answer2={context.languageSettings.locale.startsWith("en") ? question2.option2EN: question2.option2ES} />
                </div>
                <div className='quiz-block'>
                    <img className='quiz-photo' src={question3.photo} alt="photo3quiz"/>
                    <QuizQuestion question={context.languageSettings.locale.startsWith("en") ? question3.questionEN: question3.questionES}
                                  answer1={context.languageSettings.locale.startsWith("en") ? question3.option1EN: question3.option1ES}
                                  answer2={context.languageSettings.locale.startsWith("en") ? question3.option2EN: question3.option2ES}/>
                </div>
            </div>
        </div>
    )
}

export default Quiz