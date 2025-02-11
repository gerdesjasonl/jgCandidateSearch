import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<typeof Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect (() => {
    const fetchCandidates = async () => {
      try {
        const response = await searchGithub();
        if (!response.ok) throw new Error("Failed to fetch data");

        const candidatesData: typeof Candidate[] = await response.json();
        setCandidates(candidatesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };
    fetchCandidates();
  }, []);
  
  if (error) return <p>Error: {error}</p>

  return (
    <ul>
      {candidates.map((candidate) => (
        <li key={candidate.Name}>
          <Candidate {...candidate}/>
        </li>
      ))}
    </ul>
    );
};

export default CandidateSearch;
