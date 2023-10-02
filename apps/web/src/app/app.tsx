// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import styles from './app.module.css';
import axios from 'axios';

export type Models = {
  [make: string]: {
    [model: string]: string[];
  };
};

export function App() {
  const MODELS: Models = {
    ford: {
      Ranger: ['Raptor', 'Raptorx', 'wildtrak'],
      Falcon: ['XR6', 'XR6 Turbo', 'XR8'],
      'Falcon Ute': ['XR6', 'XR6 Turbo'],
    },
    bmw: {
      '130d': ['xDrive 26d', 'xDrive 30d'],
      '240i': ['xDrive 30d', 'xDrive 50d'],
      '320e': ['xDrive 75d', 'xDrive 80d', 'xDrive 85d'],
    },
    tesla: {
      'Model 3': ['Performance', 'Long Range', 'Dual Motor'],
    },
  };

  // const makeOptions = Object.keys(MODELS);

  // const modelOptions = Object.keys(MODELS[makeOptions[0]]);

  // const badgeOptions = MODELS[makeOptions[0]][modelOptions[0]];

  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [badge, setBadge] = useState<string>('');
  const [logbook, setLogbook] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('make', make);
    formData.append('model', model);
    formData.append('badge', badge);

    if (logbook) {
      formData.append('logbook', logbook);
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/logbook',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setMake(event.target.value);
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(event.target.value);
    setBadge('');
  };

  const handleBadgeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBadge(event.target.value);
  };

  const handleLogbookChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setLogbook(event.target.files[0]);
    }
  };

  const onClickHello = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Populate the model dropdown based on the selected make
  useEffect(() => {
    if (make && MODELS[make]) {
      setModel('');
      setBadge('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [make]);

  return (
    <div>
      <button onClick={onClickHello}>Test Server</button>
      <div>
        <h1>Vehicle Selection and Logbook Upload</h1>
        <form onSubmit={handleSubmit} style={styles}>
          <div>
            <label htmlFor="make">Select Make:</label>
            <select
              id="make"
              name="make"
              value={make}
              onChange={handleMakeChange}
            >
              <option value="">Select Make</option>
              <option value="ford">Ford</option>
              <option value="bmw">BMW</option>
              <option value="tesla">Tesla</option>
            </select>
          </div>

          <div>
            <label htmlFor="model">Select Model:</label>
            <select
              id="model"
              name="model"
              value={model}
              onChange={handleModelChange}
            >
              <option value="">Select Model</option>
              {make &&
                MODELS[make] &&
                Object.keys(MODELS[make]).map((modelOption) => (
                  <option key={modelOption} value={modelOption}>
                    {modelOption}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="badge">Select Badge:</label>
            <select
              id="badge"
              name="badge"
              value={badge}
              onChange={handleBadgeChange}
            >
              <option value="">Select Badge</option>
              {model &&
                MODELS[make][model] &&
                MODELS[make][model].map((badgeOption) => (
                  <option key={badgeOption} value={badgeOption}>
                    {badgeOption}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="logbook">Upload Logbook:</label>
            <input
              type="file"
              id="logbook"
              name="logbook"
              onChange={handleLogbookChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
