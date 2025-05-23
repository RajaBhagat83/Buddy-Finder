import React from "react";

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* 1. Team Making Section */}
        <section className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-3 text-blue-700">🤝 Team Making</h2>
          <p className="text-gray-600 leading-relaxed">
            Collaborate and form teams with like-minded individuals. Browse members, invite participants, and build synergy across domains.
          </p>
        </section>

        {/* 2. Social Handles with Profile */}
        <section className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">📱 Social Profiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="p-6 bg-blue-50 border border-blue-100 rounded-xl hover:shadow-md transition"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={`https://via.placeholder.com/60`}
                    alt="Profile"
                    className="rounded-full w-16 h-16"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">Jane Doe</h3>
                    <p className="text-sm text-gray-500">@janedoe</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-blue-600 text-sm">
                  <span className="hover:underline cursor-pointer">🌐 Website</span>
                  <span className="hover:underline cursor-pointer">🐦 Twitter</span>
                  <span className="hover:underline cursor-pointer">💼 LinkedIn</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Expansion to Multiple Fields */}
        <section className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-3 text-blue-700">🚀 Expand Across Fields</h2>
          <p className="text-gray-600 leading-relaxed">
            This platform supports teams across tech, design, marketing, research, and more. Select your field and start meaningful collaboration.
          </p>
        </section>

        {/* 4. Team Project Additions */}
        <section className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-4 text-blue-700">🧩 Team Projects</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Add and manage team projects</li>
            <li>Assign roles and track progress</li>
            <li>Showcase completed work on profiles</li>
          </ul>
        </section>

        {/* 5. Social Profile Building */}
        <section className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">👤 Build Your Profile</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Create a standout professional profile to highlight your experience, skills, and achievements. Network and grow your team.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border p-6 rounded-xl bg-blue-50 hover:shadow-md">
                <div className="flex items-center space-x-4 mb-3">
                  <img
                    src="https://via.placeholder.com/60"
                    alt="User"
                    className="rounded-full w-14 h-14"
                  />
                  <div>
                    <h3 className="font-bold text-lg">Alex Smith</h3>
                    <p className="text-sm text-gray-500">Full-Stack Developer</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Passionate about scalable web apps. Open to collaborations in JavaScript, React, and Node.js.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamPage;
