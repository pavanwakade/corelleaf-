import ViewOpenPositions from './ViewOpenPositions.jsx';
import { useNavigate } from 'react-router-dom';
import { Linkedin, Twitter, Github, Star, Award, Users } from 'lucide-react';

const Team = () => {
  const navigate = useNavigate();
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-founder",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg",
      bio: "10+ years experience in technology strategy and business development. Led digital transformations for Fortune 500 companies.",
      social: {
        linkedin: "#",
        twitter: "#"
      },
      gradient: "from-blue-500 to-purple-500",
      specialty: "Strategy & Leadership"
    },
    {
      name: "Michael Chen",
      role: "CTO & Co-founder",
      image: "https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg",
      bio: "Former senior architect at Google. Expert in scalable systems, cloud infrastructure, and emerging technologies.",
      social: {
        linkedin: "#",
        github: "#"
      },
      gradient: "from-green-500 to-teal-500",
      specialty: "Cloud Architecture"
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Frontend Developer",
      image: "https://images.pexels.com/photos/3760793/pexels-photo-3760793.jpeg",
      bio: "UI/UX specialist with a passion for creating beautiful, accessible web applications. React and Vue.js expert.",
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      },
      gradient: "from-pink-500 to-rose-500",
      specialty: "Frontend & UX"
    },
    {
      name: "David Kim",
      role: "Senior Backend Developer",
      image: "https://images.pexels.com/photos/3760792/pexels-photo-3760792.jpeg",
      bio: "Full-stack developer specializing in Node.js, Python, and microservices architecture. Database optimization guru.",
      social: {
        linkedin: "#",
        github: "#"
      },
      gradient: "from-orange-500 to-amber-500",
      specialty: "Backend Systems"
    },
    {
      name: "Lisa Wang",
      role: "Mobile App Developer",
      image: "https://images.pexels.com/photos/3760794/pexels-photo-3760794.jpeg",
      bio: "React Native and Flutter specialist with 8+ years of mobile development experience. Published 20+ apps on app stores.",
      social: {
        linkedin: "#",
        github: "#"
      },
      gradient: "from-purple-500 to-violet-500",
      specialty: "Mobile Development"
    },
    {
      name: "Alex Thompson",
      role: "DevOps Engineer",
      image: "https://images.pexels.com/photos/3760795/pexels-photo-3760795.jpeg",
      bio: "Cloud infrastructure expert with certifications in AWS, Azure, and GCP. Automation and CI/CD pipeline specialist.",
      social: {
        linkedin: "#",
        github: "#"
      },
      gradient: "from-cyan-500 to-blue-500",
      specialty: "DevOps & Infrastructure"
    }
  ];


  return (
    <section id="team" className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/5 to-purple-400/5 blur-3xl animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-400/5 blur-3xl animate-pulse"></div>
      </div>

      <div className="container px-6 mx-auto">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center mb-4 space-x-2">
            <Users className="text-blue-600 animate-pulse" size={24} />
            <span className="font-semibold text-blue-600">Our People</span>
          </div>
          <h2 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text">Meet Our Team</h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Our diverse team of experts brings together decades of experience in software development,
            design, and technology strategy to deliver exceptional results.
          </p>
        </div>


        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative overflow-hidden transition-all duration-500 border border-gray-100 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl group hover:-translate-y-2"
            >
              {/* Animated border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} style={{ padding: '2px' }}>
                <div className="w-full h-full bg-white rounded-2xl"></div>
              </div>

              <div className="relative overflow-hidden group/image">
                <img
                  src={member.image}
                  alt={member.name}
                  className="object-cover w-full h-64 transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Specialty badge */}
                <div className={`absolute top-4 right-4 bg-gradient-to-r ${member.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg transform translate-x-full group-hover:translate-x-0 transition-transform duration-500`}>
                  {member.specialty}
                </div>

                {/* Floating star */}
                <div className="absolute transition-opacity duration-500 delay-200 opacity-0 top-4 left-4 group-hover:opacity-100">
                  <Star className={`animate-pulse text-yellow-400`} size={20} />
                </div>
              </div>

              <div className="relative z-10 p-6">
                <h3 className="mb-1 text-xl font-bold text-gray-900 transition-all duration-300 group-hover:text-pink-500 group-hover:bg-gradient-to-r group-hover:bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>{member.name}</h3>
                <p className={`text-transparent bg-gradient-to-r ${member.gradient} bg-clip-text font-semibold mb-3`}>{member.role}</p>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">{member.bio}</p>

                <div className="flex justify-center gap-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className={`p-3 bg-gradient-to-r ${member.gradient} text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-110 group/social`}
                    >
                      <Linkedin size={16} className="group-hover/social:animate-bounce" aria-label={`LinkedIn profile of ${member.name}`} />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className={`p-3 bg-gradient-to-r ${member.gradient} text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-110 group/social`}
                      aria-label={`Twitter profile of ${member.name}`}
                    >
                      <Twitter size={16} className="group-hover/social:animate-bounce" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className={`p-3 bg-gradient-to-r ${member.gradient} text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-110 group/social`}
                      aria-label={`GitHub profile of ${member.name}`}
                    >
                      <Github size={16} className="group-hover/social:animate-spin" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="mt-16 text-center">
          <div className="relative max-w-2xl p-8 mx-auto overflow-hidden border border-gray-100 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl group">
            {/* Background gradient */}
            <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 group-hover:opacity-100"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4 space-x-2">
                <Award className="text-purple-600 animate-pulse" size={24} />
                <span className="font-semibold text-purple-600">Join Us</span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Want to Join Our Team?</h3>
              <p className="mb-6 text-gray-600">
                We're always looking for talented individuals who share our passion for technology and innovation.
              </p>











              <button
      onClick={() => navigate('/ViewOpenPositions')}
      className="relative px-8 py-4 overflow-hidden text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 group/btn"
    >
      <span className="relative z-10 flex items-center">
        <Users className="mr-2 group-hover/btn:animate-bounce" size={20} />
        View Open Positions
      </span>
      <div className="absolute inset-0 transition-transform duration-1000 transform -translate-x-full -skew-x-12 bg-white/20 group-hover/btn:translate-x-full"></div>
    </button>












            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Team;