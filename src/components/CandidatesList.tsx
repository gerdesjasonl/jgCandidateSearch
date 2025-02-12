import React from 'react';
import Candidate from '../interfaces/Candidate.interface';

interface CandidatesListProps {
  candidates: Candidate[];
  removeFromList:
    | ((
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        currentlyOnList: boolean | null | undefined,
        title: string | null
      ) => void)
    | null;
}

const CandidatesList = ({ 
    candidates, 
    removeFromList 
}: CandidatesListProps) => {
    console.log(candidates);

  return (
    <>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.login}>
            <img src={candidate.avatar_url} alt={candidate.login} />
            <h3>{candidate.login}</h3>
            <button
              onClick={(e) =>
                removeFromList && removeFromList(e, true, candidate.login)
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CandidatesList;