import Header from '../../components/header';
import NavBar from '../../components/navigation';
import './style.css';

export default function AboutUs() {
  const teamMembers = [
    {
      name: 'Ali Haider Khan',
      role: 'Backend Developer',
      description: 'Participated in the development the backend of the project.',
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      image: 'src/images/image1.jpg'
    },
    {
      name: 'Muaath Zerouga',
      role: 'Backend Developer',
      description: 'Modelled, prototyped and developed the core features of the project.',
      github: 'https://github.com/janesmith',
      linkedin: 'https://linkedin.com/in/johndoe',
      image: 'src/images/image1.jpg'
    },
    {
      name: 'John Ferdie Abueg',
      role: 'Frontend Developer',
      description: 'Prototyped and developed the user interface of the project.',
      github: 'https://github.com/alicejohnson',
      linkedin: 'https://linkedin.com/in/johndoe',
      image: 'src/images/image1.jpg'
    },
    {
      name: 'Magnus Brandsegg',
      role: 'Frontend Developer',
      description: 'Developed the user interface of the project.',
      github: 'https://github.com/bobbrown',
      linkedin: 'https://linkedin.com/in/johndoe',
      image: 'src/images/image1.jpg'
    }
  ];

  return (
    <div className="dashboard-layout">
      <Header />
      <NavBar />
      <div className="dashboard-content">
        <h1>Team Members</h1>
        <div className="about-us">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.image} alt={`${member.name}'s picture`} />
              <h3>{member.name}</h3>
              <p><strong>Role:</strong><br></br> {member.role}</p>
              <p><strong>Description:</strong><br></br> {member.description}</p>
              <div className="social-links">
                <div>
                  <i className="fab fa-linkedin"></i>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"> LinkedIn</a>
                </div>
                <div>
                  <i className="fab fa-github"></i>
                  <a href={member.github} target="_blank" rel="noopener noreferrer"> GitHub</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}