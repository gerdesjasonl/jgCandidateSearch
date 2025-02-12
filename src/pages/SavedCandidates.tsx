import { useEffect, useState } from "react";
import Candidate from "../interfaces/Candidate.interface";
import CandidatesList from "../components/CandidatesList";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const removeFromList = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    currentlyOnList: boolean | null | undefined,
    title: string | null
  ) => {
    e.preventDefault();
    if (currentlyOnList) {
      let parsedCandidates: Candidate[] = [];

      const storedCandidates = localStorage.getItem('candidates');
      if (typeof storedCandidates === 'string') {
        parsedCandidates = JSON.parse(storedCandidates);
      }
      parsedCandidates = parsedCandidates.filter(
        (candidate) => candidate.login !== title
      );
      setCandidates(parsedCandidates);
      localStorage.setItem('candidates', JSON.stringify(parsedCandidates));
    }
  };
  
  useEffect(() => {
    const parsedCandidates = JSON.parse(
      localStorage.getItem('candidates') as string
    );
    setCandidates(parsedCandidates);
  }, []);

  return (
    <>
      <h1>Potential Candidates</h1>
      {(!candidates?.length || candidates?.length === 0) ? (
        <h1 style={{ margin: '16px 0' }}>Add candidates to your list.</h1>
      ) : (
        <CandidatesList
          candidates={candidates}
          removeFromList={removeFromList}
        />
      )}
    </>
  );
};

export default SavedCandidates;
