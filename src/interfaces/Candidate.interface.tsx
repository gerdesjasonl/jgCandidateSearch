// TODO: Create an interface for the Candidate objects returned by the API
interface CandidateProps {
    Location: string;
    Email: string;
    Company: string;
    Bio: string;
};

function Candidate(props: CandidateProps) {
    return (
        <div className="candidate">
            <p>{props.Location}</p>
            <p>{props.Email}</p>
            <p>{props.Company}</p>
            <p>{props.Bio}</p>
        </div>
    )
}

export default Candidate;