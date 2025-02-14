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
      console.log("Candidate Details:", candidateDetails); // Debugging

      if (!candidateDetails) {
        console.warn("No detailed data available.");
        return;
      }

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
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 40px)', padding: '20px 0' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Candidate Card */}
      <div className="card" style={{ borderRadius: '15px', overflow: 'hidden', backgroundColor: '#333', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px', margin: '20px 0' }}>
        <img src={candidateData?.avatar_url ?? "default-avatar.png"} alt="Avatar" style={{ borderRadius: '50%', marginBottom: '20px', width: '100px', height: '100px' }}/>
        <div style={{ flex: 1, textAlign: 'left', width: '100%' }}>
          <h2>Name: {candidateData?.name ?? "No Name Given"}</h2>
          <h2>Login: {candidateData?.login ?? "Unknown User"}</h2>
          <p>Location: {candidateData?.location ?? "No Location"}</p>
          <p>Email: {candidateData?.email ?? "No Email"}</p>
          <p>Company: {candidateData?.company ?? "No Company"}</p>
          <p>HTML URL: {candidateData?.html_url ?? "No HTML URL"}</p>
          <p>BIO: {candidateData?.bio ?? "No Bio"}</p>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '80px', marginTop: '20px' }}>
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
  </div>
);
}

export default CandidateSearch;