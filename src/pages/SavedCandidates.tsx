import Candidate from "../interfaces/Candidate.interface";
import { useState } from "react";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    return JSON.parse(localStorage.getItem("savedCandidates") || '[]');
  });
  const handleDelete = (id: number) => {
    const newList = savedCandidates.filter((candidate: Candidate) => candidate.id !== id);
    localStorage.setItem('savedCandidates', JSON.stringify(newList));
    setSavedCandidates(newList);
  }
  
  return (
    <>
      <h1>Potential Candidates</h1>
      <section>
        {savedCandidates.map((candidate: Candidate) => (
          <div className="card" key={candidate.id}>
            <img className="card-image" src={candidate.avatar_url} alt={`${candidate.name}'s avatar`} />
            <h2>{candidate.name}</h2>
            <p>{candidate.login}</p>
            <p>Location: {candidate.location || 'No location given'}</p>
            <p>Email {candidate.email || 'No email given'}</p>
            <p>Company: {candidate.company || 'No company given'}</p>
            <p>Company: {candidate.bio || 'No bio given'}</p>
            <button onClick={() => handleDelete(candidate.id)}>Delete</button>
          </div>
        ))}
      </section>
    </>
  );
};

export default SavedCandidates;
