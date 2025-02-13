// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    avatar_url?: string;
    name?: string;
    login: string;
    location?: string;
    email?: string;
    company?: string;
    html_url?: string;
    bio?: string;
}

function Candidate(props: Candidate) {
    return (
        <div className="candidate">
            <img src={props.avatar_url} alt={props.login} />
            <h2>{props.name}</h2>
            <h2>{props.login}</h2>
            <p>{props.location}</p>
            <p>{props.email}</p>
            <p>{props.html_url}</p>
            <p>{props.company}</p>
            <p>{props.bio}</p>
        </div>
    )
}

export default Candidate;