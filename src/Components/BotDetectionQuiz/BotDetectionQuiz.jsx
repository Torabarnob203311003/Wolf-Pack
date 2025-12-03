import { useState, useEffect } from 'react';
import { Shield, Brain, AlertCircle, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

const BotDetectionQuiz = ({ isOpen, onClose, onSuccess }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);

  // 20 Random Questions Pool
  const questionPool = [
    // UK History
    { q: "What year did Queen Elizabeth II ascend to the throne?", a: ["1952", "1945", "1960", "1948"], correct: 0 },
    { q: "Which British Prime Minister led during World War II?", a: ["Winston Churchill", "Neville Chamberlain", "Clement Attlee", "Harold Macmillan"], correct: 0 },
    { q: "What is the capital of Scotland?", a: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee"], correct: 0 },
    { q: "In what year did Britain join the European Economic Community?", a: ["1973", "1957", "1985", "1991"], correct: 0 },
    { q: "Who wrote 'Romeo and Juliet'?", a: ["William Shakespeare", "Charles Dickens", "Jane Austen", "George Orwell"], correct: 0 },
    
    // Simple Math
    { q: "What is 15 + 27?", a: ["42", "41", "43", "40"], correct: 0 },
    { q: "What is 8 × 9?", a: ["72", "63", "81", "64"], correct: 0 },
    { q: "What is 100 - 37?", a: ["63", "73", "53", "67"], correct: 0 },
    { q: "What is 144 ÷ 12?", a: ["12", "10", "14", "16"], correct: 0 },
    { q: "What is 25% of 80?", a: ["20", "25", "15", "30"], correct: 0 },
    
    // General Knowledge
    { q: "How many days are in a leap year?", a: ["366", "365", "364", "367"], correct: 0 },
    { q: "What is the largest ocean on Earth?", a: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], correct: 0 },
    { q: "What is the currency of the United Kingdom?", a: ["Pound Sterling", "Euro", "Dollar", "Franc"], correct: 0 },
    { q: "How many letters are in the English alphabet?", a: ["26", "24", "28", "25"], correct: 0 },
    { q: "What planet is known as the Red Planet?", a: ["Mars", "Venus", "Jupiter", "Saturn"], correct: 0 },
    { q: "How many continents are there on Earth?", a: ["7", "6", "8", "5"], correct: 0 },
    { q: "What is the boiling point of water in Celsius?", a: ["100°C", "90°C", "110°C", "212°C"], correct: 0 },
    { q: "How many hours are in a day?", a: ["24", "12", "48", "36"], correct: 0 },
    { q: "What is the largest country by area?", a: ["Russia", "Canada", "China", "USA"], correct: 0 },
    { q: "In which country is the Eiffel Tower located?", a: ["France", "Italy", "Spain", "Germany"], correct: 0 },
  ];

  // Get random question on mount or when question changes
  useEffect(() => {
    if (isOpen && !currentQuestion) {
      getRandomQuestion();
    }
  }, [isOpen]);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questionPool.length);
    setCurrentQuestion(questionPool[randomIndex]);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    const correct = index === currentQuestion.correct;
    setIsCorrect(correct);
    
    if (correct) {
      // Show success message briefly, then allow purchase
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    } else {
      setAttempts(attempts + 1);
      // Show error briefly, then reset
      setTimeout(() => {
        if (attempts + 1 >= 3) {
          // Too many attempts, close modal
          toast.error('Too many incorrect attempts. Please try again later.');
          onClose();
        } else {
          getRandomQuestion();
        }
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-yellow-500/30 max-w-2xl w-full shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-b border-yellow-500/30 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full p-3">
                <Shield className="text-black" size={24} />
              </div>
              <div>
                <h2 className="text-white text-xl font-bold">Security Verification</h2>
                <p className="text-gray-400 text-sm">Answer this question to continue</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
            >
              <X className="text-white" size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {currentQuestion && (
            <>
              {/* Progress Indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Brain className="text-yellow-500" size={20} />
                <span className="text-gray-400 text-sm">
                  Attempt {attempts + 1}/3
                </span>
              </div>

              {/* Question */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700 mb-6">
                <p className="text-white text-lg font-medium leading-relaxed text-center">
                  {currentQuestion.q}
                </p>
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {currentQuestion.a.map((answer, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectAnswer = isCorrect === true && isSelected;
                  const isWrongAnswer = isCorrect === false && isSelected;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                      className={`p-4 rounded-xl font-medium text-left transition-all border-2 ${
                        isCorrectAnswer
                          ? 'bg-green-500/20 border-green-500 text-green-400'
                          : isWrongAnswer
                          ? 'bg-red-500/20 border-red-500 text-red-400'
                          : selectedAnswer === null
                          ? 'bg-gray-800 border-gray-700 text-white hover:border-yellow-500 hover:bg-gray-700'
                          : 'bg-gray-800 border-gray-700 text-gray-500'
                      } disabled:cursor-not-allowed`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{answer}</span>
                        {isCorrectAnswer && <CheckCircle size={20} />}
                        {isWrongAnswer && <X size={20} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Message */}
              {isCorrect === true && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-green-400 font-semibold">Correct!</p>
                    <p className="text-green-300 text-sm">Redirecting to checkout...</p>
                  </div>
                </div>
              )}

              {isCorrect === false && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
                  <AlertCircle className="text-red-500 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-red-400 font-semibold">Incorrect</p>
                    <p className="text-red-300 text-sm">
                      {attempts + 1 >= 3 
                        ? 'Too many attempts. Please try again later.' 
                        : 'Loading new question...'}
                    </p>
                  </div>
                </div>
              )}

              {/* Info */}
              {selectedAnswer === null && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-blue-400 text-sm">
                      This security check helps us prevent automated bots from purchasing tickets. 
                      Please select the correct answer to proceed.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotDetectionQuiz;