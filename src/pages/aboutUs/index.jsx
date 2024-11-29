import Header from '../../components/header';
import NavBar from '../../components/navigation';
import './style.css';

export default function AboutUs() {
  const teamMembers = [
    {
      name: 'Ali Haider Khan',
      role: 'Backend Developer',
      description: 'Participated in the development the backend of the project.',
      github: 'https://github.com/alihaiderkhannn',
      linkedin: 'https://www.linkedin.com/in/ali-haider-khan-b34752223/',
      image: 'src/images/portrettali.jpg'
    },
    {
      name: 'Muaath Zerouga',
      role: 'Backend Developer',
      description: 'Modelled, prototyped and developed the core features of the project.',
      github: 'https://github.com/Muzea001',
      linkedin: 'https://www.linkedin.com/in/muaath-zerouga-8a56092b3/',
      image: 'src/images/muaath.jpg'
    },
    {
      name: 'John Ferdie Abueg',
      role: 'Frontend Developer',
      description: 'Prototyped and developed the user interface of the project.',
      github: 'https://github.com/johnfa1508',
      linkedin: 'https://www.linkedin.com/in/johnfabueg/',
      image: 'src/images/john.jpg'
    },
    {
      name: 'Magnus Brandsegg',
      role: 'Frontend Developer',
      description: 'Developed the user interface of the project.',
      github: 'https://github.com/Brandsegg',
      linkedin: 'https://www.linkedin.com/in/magnus-brandsegg-b62392266/',
      image: 'src/images/magnus.jpg'
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