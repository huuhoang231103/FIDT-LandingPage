import React from 'react';

const TeamSection = () => {
    return (
        <section id="team" className="py-10 md:py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        Meet Our <span className="text-white bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 rounded-full shadow-md">Leadership Team</span>
                    </h2>
                    <p className="text-lg text-blue-800 max-w-xl mx-auto">
                        A team of passionate professionals dedicated to excellence
                    </p>
                </div>

                {/* CEO Section */}
                <div className="ceo-card p-6 rounded-lg shadow-md mb-10 text-center max-w-md mx-auto transition-all hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600">
                    <div className="flex justify-center mb-4">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dd30ddc7-d91a-4aed-a6ac-1fa2fdb8a2f1.png" alt="Portrait of Mai Hân, female CEO with professional attire in blue tones" className="rounded-full border-4 border-blue-200 w-24 h-24" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Mai Hân</h3>
                    <p className="text-blue-600 font-semibold mb-2 text-lg">CEO & Founder</p>
                    <p className="text-blue-800 px-2">Chị Mai Hân là một trong những Hội viên Chuyên gia tiêu biểu đầu tiên của Hiệp hội Tài chính Việt Nam (VFCA).</p>
                    <div className="mt-4 flex justify-center space-x-2">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full transition">
                            Contact
                        </button>
                    </div>
                </div>

                {/* Team Members */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[
                        {
                            name: "Jane Doe",
                            title: "Chief Technology Officer",
                            description: "Full Stack Development",
                            role: "Technical Leadership",
                            imgSrc: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2318a1f3-fc2a-4ca8-9804-9f30f65b080c.png",
                        },
                        {
                            name: "Mike Johnson",
                            title: "Head of Design",
                            description: "UI/UX Design",
                            role: "Creative Direction",
                            imgSrc: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2e765f3a-1478-47f1-964f-45ce7f60521d.png",
                        },
                        {
                            name: "Sarah Wilson",
                            title: "Marketing Director",
                            description: "Digital Marketing",
                            role: "Brand Strategy",
                            imgSrc: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/44035dd4-d43e-4aab-9829-c2bed1359be7.png",
                        },
                        {
                            name: "David Brown",
                            title: "Project Manager",
                            description: "Agile Management",
                            role: "Team Coordination",
                            imgSrc: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d358d9ec-d622-4250-b99f-a9562ad92990.png",
                        },
                    ].map((member, index) => (
                        <div key={index} className="team-card bg-white p-4 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-lg hover:-translate-y-1 border-t-4 border-blue-600">
                            <div className="flex justify-center mb-3">
                                <img src={member.imgSrc} alt={`${member.name}, ${member.title}`} className="rounded-full border-2 border-blue-300 w-20 h-20" />
                            </div>
                            <h3 className="text-lg font-semibold text-blue-900 mb-1">{member.name}</h3>
                            <p className="text-blue-600 font-medium mb-1">{member.title}</p>
                            <p className="text-gray-600 text-sm mb-2">{member.description}</p>
                            <div className="bg-blue-100 text-blue-700 font-medium text-xs px-3 py-1 rounded-full inline-block border border-blue-200">
                                {member.role}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all hover:shadow-lg hover:scale-105">
                        Meet the Full Team
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
