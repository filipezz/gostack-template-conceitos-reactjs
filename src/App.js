import React, {useEffect, useState} from "react";

import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories]= useState([])
  
  useEffect(()=>{
    async function loadRepos(){
      const response = await api.get('/repositories')
      setRepositories(response.data)
      
    }
    loadRepos()
  }, [])
  async function handleAddRepository() {
    const newRepository = {
      title:"Desafio ReactJS",
      url:"google.com",
      techs:["ReactJS", "Node"]
    }
    const response = await api.post('/repositories', newRepository)
setRepositories([...repositories, newRepository])
  }

  async function handleRemoveRepository(id) {
 setRepositories(repositories.filter((repo)=> repo.id!== id))
   
  await api.delete(`/repositories/${id}`)


  }
  
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo, index)=>(

        <li key={index}>
          <strong>{repo.title}</strong>

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
