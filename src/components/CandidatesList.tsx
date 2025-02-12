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
// This component is a list of candidates organized in rows that can be removed.
  return (
    <>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {candidates.map((candidate) => (
          <li key={candidate.login} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <img src={candidate.avatar_url} alt={candidate.login} style={{ borderRadius: '50%', marginRight: '10px' }} />
        <h3 style={{ margin: '0 10px 0 0' }}>{candidate.login}</h3>
        <button
          onClick={(e) =>
            removeFromList && removeFromList(e, true, candidate.login)
          }
          style={{ marginLeft: 'auto' }}
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