import React, { useState, useEffect } from 'react';

import { FlexRow } from 'ui/layout/component/flex';
import { getAllCurrentSeasonQuestion } from 'api/resource.api';
import { getCategoryIcon } from 'daily-quiz/daily-quiz.constant';
import { Answers, CurrentSeasonQuestion } from 'daily-quiz/daily-quiz.type';

const getCurrentSeasonQuestion = async (
  setQuestions: (props: Array<CurrentSeasonQuestion>) => void
) => {
  const { data, error } = await getAllCurrentSeasonQuestion();

  if (error) {
    return;
  }

  setQuestions(data.result);
};

const Question = ({ question }: { question: CurrentSeasonQuestion }) => (
  <div className="col-md-12 p-0 row m-0 question">
    <div className="col-md-8 p-0 pr-4 text-muted">
      <div className="small">
        <i className="icon ion-md-calendar mr-2" />
        {question.createdAt}
      </div>
      <div className="bold text-primary">{question.question}</div>
      <div className="d-inline-block p-0 shake mr-4 mt-2">
        <i
          className={`icon ion-md-${getCategoryIcon(
            question.category
          )} d-inline-block mr-2`}
        />
        {question.category}
      </div>
      <div className="d-inline-block shake p-0 mt-2">
        <i className="icon ion-md-checkmark-circle-outline d-inline-block mr-2" />
        {question.point}pts
      </div>
    </div>
    <div className="col-md-4 p-0">
      <Options options={question.answers} />
    </div>
  </div>
);

const Options = ({ options }: { options: Array<Answers> }) => (
  <div className="col-md-12">
    <p className="m-0 text-primary">Options</p>
    {options.map((option, key) => (
      <div key={key} className="shake">
        <i
          className={`icon ion-md-${
            option.correct
              ? 'checkmark-circle-outline text-success p'
              : 'close-circle-outline text-danger p'
          } mr-2 d-inline-block`}
        />
        {option.answer}
      </div>
    ))}
  </div>
);

const CurrentSeasonQuestionList = () => {
  const [questions, setQuestions] = useState<Array<CurrentSeasonQuestion>>();

  useEffect(() => {
    getCurrentSeasonQuestion(setQuestions);
  }, []);

  return (
    <FlexRow>
      {questions?.map((question, key) => (
        <Question key={key} question={question} />
      ))}
    </FlexRow>
  );
};

export default CurrentSeasonQuestionList;
