"use client"

import { usePortfolio } from "../portfolio-context"

export default function Achievements() {
  const portfolio = usePortfolio()

  return (
    <div className="h-full bg-[#c0c0c0] p-4">
      <div className="bg-white border-2 border-[#808080] border-t-white border-l-white p-6 h-full overflow-auto">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
            🏆
          </div>
          <div>
            <h2 className="text-2xl font-bold text-orange-800 mb-1">Achievements & Certifications</h2>
            <p className="text-sm text-gray-600">Recognition and professional development</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Achievements Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-bold text-lg mb-4 text-yellow-800 flex items-center">
              <span className="mr-2">🏆</span>Major Achievements
            </h3>
            <div className="space-y-4">
              {portfolio.achievements.map((achievement, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl flex-shrink-0">{achievement.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-gray-800 mb-1 leading-tight">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">{achievement.description}</p>
                      <div className="text-xs text-gray-500">{achievement.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-lg mb-4 text-blue-800 flex items-center">
              <span className="mr-2">📜</span>Professional Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.certifications.map((cert, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <div className="text-xl flex-shrink-0">{cert.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-gray-800 mb-1 leading-tight">{cert.name}</h4>
                      <p className="text-sm text-gray-600 mb-1 leading-relaxed">{cert.issuer}</p>
                      <div className="text-xs text-gray-500">{cert.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Papers Section */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="font-bold text-lg mb-4 text-green-800 flex items-center">
              <span className="mr-2">📄</span>Research Publications
            </h3>
            <div className="space-y-4">
              {portfolio.papers.map((paper, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
                  <h4 className="font-bold text-sm text-gray-800 mb-2 leading-tight">{paper.title}</h4>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{paper.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="font-medium">{paper.organization}</span>
                    <span>{paper.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-bold text-lg mb-4 text-purple-800 flex items-center">
              <span className="mr-2">📊</span>Quick Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-purple-600 mb-1">{portfolio.achievements.length}</div>
                <div className="text-xs text-gray-600 leading-tight">Achievements</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600 mb-1">{portfolio.certifications.length}</div>
                <div className="text-xs text-gray-600 leading-tight">Certifications</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-1">{portfolio.papers.length}</div>
                <div className="text-xs text-gray-600 leading-tight">Publications</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-orange-600 mb-1">2,242</div>
                <div className="text-xs text-gray-600 leading-tight">LeetCode Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
