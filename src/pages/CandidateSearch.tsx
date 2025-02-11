import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  useEffect (() => {
    const fetchCandidates = async () => {
      try {
        const response = await searchGithub();
        if (!response.ok) throw new Error("Failed to fetch data");

        const candidatesData: Candidate[] = await response.json();
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
          <p><strong>Name:</strong>{candidate.Name}</p>
          <p><strong>Location:</strong>{candidate.Location}</p>
          <p><strong>Email:</strong> {candidate.Email}</p>
          <p><strong>Company:</strong> {candidate.Company}</p>
          <p><strong>Bio:</strong> {candidate.Bio}</p>
        </li>
      ))}
    </ul>
    );
};

export default CandidateSearch;
