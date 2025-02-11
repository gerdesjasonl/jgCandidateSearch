import { useState, useEffect } from 'react';
import { searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

export default function CandidateSearch(props: Candidate) {
  // State to hold the fetched candidate data
  const [candidateData, setCandidateData] = useState<Candidate | null>(null);

  // Fetch the user data when the component mounts
  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const data = await searchGithubUser(props.username);
        setCandidateData(data);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchCandidateData();
  }, [props.username]);

  // Handle reject button click
  const handleReject = () => {
    console.log(`${props.username} was rejected.`);
  };

  // Handle save button click
  const handleSave = () => {
    if (candidateData) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      savedCandidates.push(candidateData);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      console.log(`${candidateData.username} has been saved.`);
    }
  };

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