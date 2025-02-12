// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    avatar_url?: string;
    login: string;
    location?: string;
    email: string;
    company?: string;
    bio?: string;
}

function Candidate(props: Candidate) {
    return (
        <div className="candidate">
            <img src={props.avatar_url} alt={props.login} />
            <h2>{props.login}</h2>
            <p>{props.location}</p>
            <p>{props.email}</p>
            <p>{props.company}</p>
            <p>{props.bio}</p>
        </div>
    )
}

export default Candidate;