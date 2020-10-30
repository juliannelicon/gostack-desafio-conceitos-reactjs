import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const repository = await api.post('repositories', {
      title: 'MenuBar',
      url: 'http://meu.repository',
      techs: ['ReactJS']
    });

    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(item => item.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
