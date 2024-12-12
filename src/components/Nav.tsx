import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav>
      <div>Nav</div>
      <Link to="/">Candidate Search</Link>
      <br></br>
      <Link to="/SavedCandidates">Saved Candidates</Link>
    </nav>
  )
};

export default Nav;