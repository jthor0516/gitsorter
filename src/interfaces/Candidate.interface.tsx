// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    login: string;
    id: number;
    name?: string;
    location?: string;
    bio?: string;
    company?: string;
    email?: string;
    avatar_url: string; 
}
export default Candidate