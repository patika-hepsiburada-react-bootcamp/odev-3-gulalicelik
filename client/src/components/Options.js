import { useState, useEffect } from 'react';
import { sendMessage } from '../socketApi';
import { useVote } from '../contexts/VoteContext';
import './component.css';
function Options() {
  const { options } = useVote();
  const { setData } = useVote();
  const [selectedOption, setSelectedOption] = useState('malatya');

  const handleSelect = ({ target }) => setSelectedOption(target.value);

  const handleSubmit = () => {
    sendMessage('new-vote', selectedOption);
  };
  useEffect(() => {
    setData({
      labels: ['Malatya', 'İstanbul', 'İzmir', 'Ankara'],
      datasets: [
        {
          label: '# of Votes',
          data: [
            options['malatya'],
            options['istanbul'],
            options['izmir'],
            options['ankara'],
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [options, setData]);

  const total = Object.keys(options).reduce(
    (previous, key) => previous + options[key],
    0
  );

  const getPercent = key => {
    return ((options[key] * 100) / (total === 0 ? 1 : total)).toFixed(1);
  };

  return (
    <div id="options">
      <label htmlFor="">
        <input
          name="option"
          type="radio"
          value="malatya"
          onChange={handleSelect}
          checked={selectedOption === 'malatya'}
        />
        Malatya({getPercent('malatya')} %)
      </label>

      <label htmlFor="">
        <input
          name="option"
          type="radio"
          value="istanbul"
          onChange={handleSelect}
          checked={selectedOption === 'istanbul'}
        />
        İstanbul ({getPercent('istanbul')} %)
      </label>

      <label htmlFor="">
        <input
          name="option"
          type="radio"
          value="izmir"
          onChange={handleSelect}
          checked={selectedOption === 'izmir'}
        />
        İzmir ({getPercent('izmir')} %)
      </label>

      <label htmlFor="">
        <input
          name="option"
          type="radio"
          value="ankara"
          onChange={handleSelect}
          checked={selectedOption === 'ankara'}
        />
        Ankara({getPercent('ankara')} %)
      </label>

      <br />
      <br />
      <div>
        <button onClick={handleSubmit}>Vote</button>
      </div>
    </div>
  );
}

export default Options;
