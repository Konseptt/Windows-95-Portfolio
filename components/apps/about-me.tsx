"use client"

import { usePortfolio } from "../portfolio-context"

export default function AboutMe() {
  const portfolio = usePortfolio()

  return (
    <div className="h-full bg-[#c0c0c0] p-4">
      <div className="bg-white border-2 border-[#808080] border-t-white border-l-white p-6 h-full overflow-auto">
        <div className="flex items-start space-x-6 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl shadow-lg">
            👨‍💻
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-blue-800">{portfolio.name}</h2>
            <p className="text-lg text-gray-700 mb-2">{portfolio.title}</p>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="mr-2">📍</span>
              {portfolio.location}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-3 text-blue-800 flex items-center">
              <span className="mr-2">🎯</span>About Me
            </h3>
            <p className="text-sm leading-relaxed text-gray-700">{portfolio.bio}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-lg mb-3 text-green-800 flex items-center">
                <span className="mr-2">📞</span>Contact Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">📧</span>
                  <strong>Email:</strong>
                  <span className="ml-1 text-blue-600">{portfolio.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📱</span>
                  <strong>Phone:</strong>
                  <span className="ml-1">{portfolio.phone}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🌐</span>
                  <strong>Website:</strong>
                  <a href={portfolio.social.website} className="ml-1 text-blue-600 hover:underline">
                    {portfolio.social.website}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-bold text-lg mb-3 text-purple-800 flex items-center">
                <span className="mr-2">🔗</span>Social Links
              </h3>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>GitHub:</strong>{" "}
                  <a href={portfolio.social.github} className="text-blue-600 hover:underline">
                    @konseptt
                  </a>
                </div>
                <div>
                  <strong>LeetCode:</strong>{" "}
                  <a href={portfolio.social.leetcode} className="text-blue-600 hover:underline">
                    Profile (Rating: 2,242)
                  </a>
                </div>
                <div>
                  <strong>Twitter:</strong>{" "}
                  <a href={portfolio.social.twitter} className="text-blue-600 hover:underline">
                    @thekonsept
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-bold text-lg mb-3 text-yellow-800 flex items-center">
              <span className="mr-2">🎓</span>Education
            </h3>
            <div className="space-y-3">
              {portfolio.education.map((edu, index) => (
                <div key={index} className="border-b border-yellow-200 pb-2 last:border-b-0">
                  <div className="font-semibold text-sm">{edu.degree}</div>
                  <div className="text-sm text-gray-600">{edu.institution}</div>
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>{edu.duration}</span>
                    <span className="font-semibold">CGPA: {edu.cgpa}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h3 className="font-bold text-lg mb-3 text-red-800 flex items-center">
              <span className="mr-2">💻</span>System Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm font-mono">
              <div>
                <div>
                  <strong>OS:</strong> Windows 95 Portfolio Edition
                </div>
                <div>
                  <strong>Processor:</strong> Creative Mind v3.0
                </div>
                <div>
                  <strong>Memory:</strong> Unlimited Ideas
                </div>
              </div>
              <div>
                <div>
                  <strong>Skills:</strong> {portfolio.skills.length} installed
                </div>
                <div>
                  <strong>Projects:</strong> {portfolio.projects.length} completed
                </div>
                <div>
                  <strong>Languages:</strong> {portfolio.languages.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
