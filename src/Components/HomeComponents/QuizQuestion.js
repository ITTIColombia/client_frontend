import React, {useState} from 'react'
import "./Quiz.css"; 
import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'



function QuizQuestion(props) {


    // Persistent data array (typically fetched from the server)
    const resData = [
        { text: props.answer1, votes: 0 },
        { text:  props.answer2, votes: 0 }]

    // Object keys may vary on the poll type (see the 'Theme options' table below)
    const customTheme = {
        textColor: '#3B373A',
        mainColor: '#BF522A',
        backgroundColor: '#F5F4F2',
        alignment: 'center'
    }


    return (
        <div className="QuizQuestion">
           
           <LeafPoll type='multiple' question={props.question} results={resData} theme={customTheme} />

        </div>
    )
}

export default QuizQuestion

