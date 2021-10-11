import { useEffect } from 'react';
import { connectSocket, subscribeToNewMessages } from '../socketApi';
import Question from './Question';
import Options from './Options';
import './component.css';
import { useVote } from '../contexts/VoteContext';
import { Pie } from 'react-chartjs-2';

function Container() {
  const { setOptions } = useVote();
  const { data } = useVote();

  useEffect(() => {
    connectSocket();

    subscribeToNewMessages(dta => {
      setOptions(dta);
    });
  }, [setOptions]);

  return (
    <div className="">
      <div className="poll">
        <div className="right">
          <div className="question-header">
            <Question />
          </div>
          <div className="question-body">
            {' '}
            <Options />
          </div>
        </div>
        <div className="left">
          <div className="graph">
            {' '}
            <Pie data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container;
