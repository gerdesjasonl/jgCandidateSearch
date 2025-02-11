import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  // State to hold the fetched candidate data
  const [candidateData, setCandidateData] = useState<Candidate | null>(null);

  // Fetch the user data when the component comes up
  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const response = await searchGithub();
        console.log("API Response:", response);

        const data: Candidate[] = Array.isArray(response) ? response : [response];
        const randomCandidate = data[Math.floor(Math.random() * data.length)];
        setCandidateData(randomCandidate);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchCandidateData();
  }, []);

  // Handle reject button click
  const handleReject = () => {
    console.log(`${candidateData?.username ?? "Unknown"} was rejected.`);
  };

  // Handle save button click
  const handleSave = () => {
    try {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(candidateData);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      console.log(`${candidateData?.username} has been saved.`);
    } catch (error) {
      console.error("Error saving candidate", error)
    }
  };
// This is the card that should show up in the UI
  return (
    <div className="card">
      <h2>{candidateData?.username}</h2>
      <p>{candidateData?.location}</p>
      <p>{candidateData?.email}</p>
      <p>{candidateData?.company}</p>
      <p>{candidateData?.bio}</p>

      <div className="actions">
        {/* Reject Button */}
        <button onClick={handleReject} className="reject-btn">Reject</button>

        {/* Save Button */}
        <button onClick={handleSave} className="save-btn">Save</button>
      </div>
    </div>
  );
}

export default CandidateSearch;