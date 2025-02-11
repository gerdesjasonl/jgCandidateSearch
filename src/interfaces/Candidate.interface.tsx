// TODO: Create an interface for the Candidate objects returned by the API
interface CandidateProps {
    Img?: string;
    Name: string;
    Location?: string;
    Email: string;
    Company?: string;
    Bio?: string;
}

function Candidate({Img, Name, Location, Email, Company, Bio}: CandidateProps) {
    return (
        <div className="candidate">
            <img src={Img} alt={Name} />
            <h2>{Name}</h2>
            <p>{Location}</p>
            <p>{Email}</p>
            <p>{Company}</p>
            <p>{Bio}</p>
        </div>
    )
}

export default Candidate;