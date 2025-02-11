// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    img?: string;
    name: string;
    location?: string;
    email: string;
    company?: string;
    bio?: string;
}

function Candidate({img, name, location, email, company, bio}: Candidate) {
    return (
        <div className="candidate">
            <img src={img} alt={name} />
            <h2>{name}</h2>
            <p>{location}</p>
            <p>{email}</p>
            <p>{company}</p>
            <p>{bio}</p>
        </div>
    )
}

export default Candidate;