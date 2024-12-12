import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([])

  const [currentIndex, setCurrentIndex] = useState(0)

  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);

  const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || '[]');


  useEffect(() => {
    const getCandidates = async () => {
      try {
        const data = await searchGithub();
        setCandidates(data);
      } catch (error) {
        console.error(error)
      }
    }
      getCandidates()
  }, []);

  useEffect(() => {
    const getCanditateDetails = async () => {
      const candidate = candidates[currentIndex]
      if (candidate) {
        try {
          const currentCandidate = await searchGithubUser(candidate.login)
          setCurrentCandidate(currentCandidate)
        } catch (error) {
          console.error(error)
        }
      }
    }
    getCanditateDetails()
  }, [currentIndex, candidates])


  function nextCandidate() {
    setCurrentIndex(currentIndex + 1);
  }


  function saveCandidate() {
    savedCandidates.push(currentCandidate);
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));

    alert("candidate Saved!")
    nextCandidate();
  }

  return (
    <>
      <h1>CandidateSearch</h1>

      <div className='card'>
        <img className="card-image" src={currentCandidate?.avatar_url} alt="Candidate Avatar" />
        {currentCandidate && (
          <>
            <h3>{currentCandidate.name}</h3>
            <h3>{currentCandidate.login}</h3>
            <p>Location: {currentCandidate.location}</p>
            <p>Email: {currentCandidate.email} </p>
            <p>Company: {currentCandidate.company}</p>
            <p>Bio: {currentCandidate.bio}</p>
          </>
        )}
      </div>

      <div className="button-container">
        <button onClick={nextCandidate}> - </button>
        <button onClick={saveCandidate}> + </button>
      </div>
    </>

  )
};

export default CandidateSearch;
