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
        {candidates.map((candidate, index) => (
            <li
              key={candidate.login}
              style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              backgroundColor: index % 2 === 0 ? 'black' : 'darkgrey',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              flexWrap: 'wrap'
              }}
            >
              <img
              src={candidate.avatar_url}
              alt={candidate.login}
              style={{ borderRadius: '50%', marginRight: '10px', width: '50px', height: '50px' }}
              />
              <span style={{ flex: '1 1 50px', margin: '1px 5px' }}>{candidate.name}</span>
              <span style={{ flex: '1 1 50px', margin: '1px 5px' }}>{candidate.login || 'No login available'}</span>
              <span style={{ flex: '1 1 75px', margin: '1px 5px' }}>{candidate.location || 'No location available'}</span> 
              <span style={{ flex: '1 1 100px', margin: '1px 5px'  }}>{candidate.email || 'No email available'}</span>  
              <span style={{ flex: '1 1 100px', margin: '1px 5px'  }}>{candidate.html_url || 'No HTML URL available'}</span> 
              <span style={{ flex: '1 1 75px', margin: '1px 5px'  }}>{candidate.company || 'No company available'}</span>   
              <span style={{ flex: '1 1 100px', margin: '1px 5px'  }}>{candidate.bio || 'No bio available'}</span>  
                <button
                onClick={(e) =>
                removeFromList && removeFromList(e, true, candidate.login)
                }
                style={{
                marginLeft: 'auto',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '50%',
                cursor: 'pointer',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
                }}
                >
                -
                </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default CandidatesList;