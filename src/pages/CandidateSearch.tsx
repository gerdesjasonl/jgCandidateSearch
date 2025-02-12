import { useState, useEffect } from 'react';
import { searchGithub , searchGithubUser} from '../api/API';
import Candidate from '../interfaces/Candidate.interface';


const CandidateSearch: React.FC<Candidate> = () => {
  // State to hold the fetched candidate data
  const [candidateData, setCandidateData] = useState<Candidate | null>(null);

  // Fetch the user data when the component comes up
  const fetchCandidateData = async () => {
    try {
      const response = await searchGithub();
      console.log("API Response:", response);

      const data: Candidate[] = Array.isArray(response) ? response : [response];
      const randomCandidate = data[Math.floor(Math.random() * data.length)];
      const candidateDetails = await searchGithubUser(randomCandidate.login);
      setCandidateData(candidateDetails);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  useEffect(() => {
    fetchCandidateData();
  }, []);

  // Handle reject button click
  const handleReject = () => {
    console.log(`${candidateData?.login ?? "Unknown"} was rejected.`);
    // Fetch a new candidate after rejection
    fetchCandidateData();
  };

  // Handle save button click
  const handleSave = () => {
    const storedCandidates = localStorage.getItem('candidates');
    let parsedCandidates: Candidate[] = storedCandidates ? JSON.parse(storedCandidates) : [];
    
    if (typeof storedCandidates === 'string') {
      parsedCandidates = JSON.parse(storedCandidates);
    }
    if (candidateData) {
      parsedCandidates.push(candidateData);
    }
    localStorage.setItem('candidates', JSON.stringify(parsedCandidates));
    fetchCandidateData();
  };
// This is the card that should show up in the UI
  return (
    <div className="card">
      <img src={candidateData?.avatar_url ?? "default-avatar.png"} alt="Avatar"/>
      <h2>{candidateData?.login ?? "Unknown User"}</h2>
      <p>{candidateData?.location}</p>
      <p>{candidateData?.email}</p>
      <p>{candidateData?.company}</p>
      <p>{candidateData?.bio}</p>

      <div className="actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {/* Reject Button */}
        <button onClick={handleReject} className="reject-btn" style={{ borderRadius: '50%', backgroundColor: 'red', border: 'none', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'black', fontSize: '24px' }}>−</span>
        </button>

        {/* Save Button */}
        <button onClick={handleSave} className="save-btn" style={{ borderRadius: '50%', backgroundColor: 'green', border: 'none', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'black', fontSize: '24px' }}>+</span>
        </button>
      </div>
    </div>
  );
}

export default CandidateSearch;