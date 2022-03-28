import React from 'react'
import { FormattedMessage } from 'react-intl'
import QuizQuestion from './QuizQuestion'

function Quiz() {
  return (
    <div className='Quiz'>
        <div className='quiz-title'>
            <h3><FormattedMessage id="QuizTitle"/></h3>
            <p><FormattedMessage id="QuizText"/></p>
        </div>
        <div className='quiz-questions'>
            <QuizQuestion question="Hola?" answer1="si" answer2="no"/>
            <QuizQuestion question="Hola?" answer1="si" answer2="no"/>
            <QuizQuestion question="Hola?" answer1="si" answer2="no"/>
        </div>
    </div>
  )
}

export default Quiz