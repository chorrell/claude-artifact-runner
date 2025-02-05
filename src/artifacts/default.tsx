import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const BrandArchetypeCalculator = () => {
  const [scores, setScores] = useState({});
  const [results, setResults] = useState([]);
  
  const questions = {
    innovator: [
      { id: 1, text: "We prioritize innovation and disrupting industry standards" },
      { id: 7, text: "We communicate with bold, visionary language about the future" },
      { id: 13, text: "We challenge conventional thinking and encourage new approaches" },
      { id: 19, text: "We value creativity and breaking new ground" }
    ],
    expert: [
      { id: 2, text: "Our primary focus is helping other businesses achieve operational excellence" },
      { id: 8, text: "Our messaging emphasizes precision, expertise, and technical excellence" },
      { id: 14, text: "Our solutions are built on established methodologies and best practices" },
      { id: 20, text: "Excellence and precision are our top priorities" }
    ],
    partner: [
      { id: 3, text: "We see ourselves as trusted advisors and knowledge leaders" },
      { id: 9, text: "We focus on building long-term partnerships and relationships" },
      { id: 15, text: "We customize our approach for each client's unique needs" },
      { id: 21, text: "We prioritize long-term relationships over short-term gains" }
    ],
    leader: [
      { id: 4, text: "We aim to empower organizations to transform and reach their full potential" },
      { id: 10, text: "Our communication style is authoritative and confident" },
      { id: 16, text: "We set industry standards and influence market direction" },
      { id: 22, text: "Leadership and vision guide our decisions" }
    ],
    anchor: [
      { id: 5, text: "We pride ourselves on being reliable, stable, and trustworthy" },
      { id: 11, text: "We emphasize practical results and proven solutions" },
      { id: 17, text: "We focus on reliability and consistent delivery" },
      { id: 23, text: "Stability and dependability are central to our identity" }
    ],
    strategist: [
      { id: 6, text: "Our goal is to help businesses navigate complex challenges and find clarity" },
      { id: 12, text: "We use data-driven insights and analytical approaches" },
      { id: 18, text: "We solve complex problems through systematic analysis" },
      { id: 24, text: "We value intellectual rigor and expertise" }
    ]
  };

  const getAlignmentStrength = (score) => {
    if (score >= 16) return "Very Strong";
    if (score >= 12) return "Strong";
    if (score >= 8) return "Moderate";
    return "Weak";
  };

  const handleScoreChange = (questionId, value) => {
    setScores(prev => ({
      ...prev,
      [questionId]: parseInt(value) || 0
    }));
  };

  useEffect(() => {
    const calculateResults = () => {
      const archetypeScores = Object.entries(questions).map(([archetype, qs]) => ({
        name: archetype.charAt(0).toUpperCase() + archetype.slice(1),
        score: qs.reduce((sum, q) => sum + (scores[q.id] || 0), 0),
      }));

      archetypeScores.sort((a, b) => b.score - a.score);
      setResults(archetypeScores);
    };

    calculateResults();
  }, [scores]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>B2B Brand Archetype Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {Object.entries(questions).map(([archetype, questionList]) => (
              <div key={archetype} className="space-y-4">
                <h3 className="text-lg font-semibold capitalize">{archetype}</h3>
                {questionList.map(question => (
                  <div key={question.id} className="flex items-center space-x-4">
                    <span className="flex-grow">{question.text}</span>
                    <select
                      value={scores[question.id] || ""}
                      onChange={(e) => handleScoreChange(question.id, e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="">Select...</option>
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Archetype Scores</h3>
                <BarChart width={600} height={300} data={results}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 20]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#4F46E5" />
                </BarChart>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Analysis</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Primary Archetype:</p>
                    <p>{results[0]?.name} ({results[0]?.score}/20) - {getAlignmentStrength(results[0]?.score)} Alignment</p>
                  </div>
                  <div>
                    <p className="font-medium">Secondary Archetype:</p>
                    <p>{results[1]?.name} ({results[1]?.score}/20) - {getAlignmentStrength(results[1]?.score)} Alignment</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Full Rankings</h3>
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <div key={result.name} className="flex justify-between">
                      <span>{index + 1}. {result.name}</span>
                      <span>{result.score}/20 ({getAlignmentStrength(result.score)})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BrandArchetypeCalculator;
