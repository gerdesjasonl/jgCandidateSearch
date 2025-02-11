// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    img?: string;
    username: string;
    location?: string;
    email: string;
    company?: string;
    bio?: string;
}

function Candidate(props: Candidate) {
    return (
        <div className="candidate">
            <img src={props.img} alt={props.username} />
            <h2>{props.username}</h2>
            <p>{props.location}</p>
            <p>{props.email}</p>
            <p>{props.company}</p>
            <p>{props.bio}</p>
        </div>
    )
}

export default Candidate;