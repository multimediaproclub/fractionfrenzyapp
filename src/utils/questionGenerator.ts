import { Question } from '../types';

// Helper functions
const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const lcm = (a: number, b: number): number => {
  return (a * b) / gcd(a, b);
};

const simplifyFraction = (num: number, den: number): { num: number; den: number } => {
  const divisor = gcd(Math.abs(num), Math.abs(den));
  return { num: num / divisor, den: den / divisor };
};

const formatFraction = (num: number, den: number): string => {
  if (den === 1) return num.toString();
  if (num === 0) return '0';
  const simplified = simplifyFraction(num, den);
  return `${simplified.num}/${simplified.den}`;
};

const formatMixedNumber = (num: number, den: number): string => {
  if (num < den) return formatFraction(num, den);
  const wholeNumber = Math.floor(num / den);
  const remainder = num % den;
  if (remainder === 0) return wholeNumber.toString();
  return `${wholeNumber} ${formatFraction(remainder, den)}`;
};

const mixedToImproper = (whole: number, num: number, den: number): { num: number; den: number } => {
  return { num: whole * den + num, den };
};

const improperToMixed = (num: number, den: number): { whole: number; num: number; den: number } => {
  const whole = Math.floor(num / den);
  const remainder = num % den;
  return { whole, num: remainder, den };
};

// Fraction pools for different types
const properFractions = [
  { num: 1, den: 2 }, { num: 1, den: 3 }, { num: 2, den: 3 }, { num: 1, den: 4 }, { num: 3, den: 4 },
  { num: 1, den: 5 }, { num: 2, den: 5 }, { num: 3, den: 5 }, { num: 4, den: 5 }, { num: 1, den: 6 },
  { num: 5, den: 6 }, { num: 1, den: 8 }, { num: 3, den: 8 }, { num: 5, den: 8 }, { num: 7, den: 8 }
];

const improperFractions = [
  { num: 3, den: 2 }, { num: 5, den: 2 }, { num: 7, den: 2 }, { num: 4, den: 3 }, { num: 5, den: 3 },
  { num: 7, den: 3 }, { num: 8, den: 3 }, { num: 5, den: 4 }, { num: 7, den: 4 }, { num: 9, den: 4 },
  { num: 6, den: 5 }, { num: 7, den: 5 }, { num: 8, den: 5 }, { num: 9, den: 5 }, { num: 11, den: 5 }
];

const mixedNumbers = [
  { whole: 1, num: 1, den: 2 }, { whole: 1, num: 1, den: 3 }, { whole: 1, num: 2, den: 3 },
  { whole: 2, num: 1, den: 4 }, { whole: 2, num: 3, den: 4 }, { whole: 1, num: 3, den: 5 },
  { whole: 3, num: 1, den: 6 }, { whole: 2, num: 5, den: 8 }, { whole: 1, num: 7, den: 8 }
];

// ADDITION QUESTIONS
const generateSimilarFractionAddition = (id: number): Question => {
  const denominators = [2, 3, 4, 5, 6, 8];
  const den = denominators[Math.floor(Math.random() * denominators.length)];
  
  const num1 = Math.floor(Math.random() * (den - 1)) + 1;
  const num2 = Math.floor(Math.random() * (den - num1)) + 1;
  
  const resultNum = num1 + num2;
  const correctAnswer = formatFraction(resultNum, den);
  
  const wrongAnswers = [
    formatFraction(resultNum + 1, den),
    formatFraction(Math.max(1, resultNum - 1), den),
    formatFraction(num1 + num2, den + 1)
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${formatFraction(num1, den)} + ${formatFraction(num2, den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Since both fractions have the same denominator (${den}), just add the numerators: ${num1} + ${num2}.`,
    solution: [
      `Both fractions have the same denominator: ${den}`,
      `Add the numerators: ${num1} + ${num2} = ${resultNum}`,
      `Keep the same denominator: ${den}`,
      `The answer is ${formatFraction(resultNum, den)} = ${correctAnswer}`
    ],
    explanation: "When fractions have the same denominator, we simply add the numerators and keep the denominator the same.",
    operation: 'addition'
  };
};

const generateDissimilarFractionAddition = (id: number): Question => {
  const frac1 = properFractions[Math.floor(Math.random() * properFractions.length)];
  const frac2 = properFractions[Math.floor(Math.random() * properFractions.length)];
  
  // Ensure different denominators
  while (frac1.den === frac2.den) {
    const frac2 = properFractions[Math.floor(Math.random() * properFractions.length)];
  }
  
  const commonDen = lcm(frac1.den, frac2.den);
  const num1 = (frac1.num * commonDen) / frac1.den;
  const num2 = (frac2.num * commonDen) / frac2.den;
  const resultNum = num1 + num2;
  
  const correctAnswer = formatFraction(resultNum, commonDen);
  
  const wrongAnswers = [
    formatFraction(frac1.num + frac2.num, frac1.den + frac2.den),
    formatFraction(resultNum + 1, commonDen),
    formatFraction(frac1.num + frac2.num, Math.max(frac1.den, frac2.den))
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${formatFraction(frac1.num, frac1.den)} + ${formatFraction(frac2.num, frac2.den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Find the LCD of ${frac1.den} and ${frac2.den}, which is ${commonDen}. Convert both fractions to have this denominator.`,
    solution: [
      `Find the LCD of ${frac1.den} and ${frac2.den}, which is ${commonDen}`,
      `Convert ${formatFraction(frac1.num, frac1.den)} to ${formatFraction(num1, commonDen)}`,
      `Convert ${formatFraction(frac2.num, frac2.den)} to ${formatFraction(num2, commonDen)}`,
      `Add: ${formatFraction(num1, commonDen)} + ${formatFraction(num2, commonDen)} = ${formatFraction(resultNum, commonDen)}`,
      `Simplify: ${correctAnswer}`
    ],
    explanation: "To add fractions with different denominators, find the LCD, convert both fractions, then add the numerators.",
    operation: 'addition'
  };
};

const generateMixedNumberAddition = (id: number): Question => {
  const mixed1 = mixedNumbers[Math.floor(Math.random() * mixedNumbers.length)];
  const mixed2 = mixedNumbers[Math.floor(Math.random() * mixedNumbers.length)];
  
  const improper1 = mixedToImproper(mixed1.whole, mixed1.num, mixed1.den);
  const improper2 = mixedToImproper(mixed2.whole, mixed2.num, mixed2.den);
  
  const commonDen = lcm(improper1.den, improper2.den);
  const num1 = (improper1.num * commonDen) / improper1.den;
  const num2 = (improper2.num * commonDen) / improper2.den;
  const resultNum = num1 + num2;
  
  const correctAnswer = formatMixedNumber(resultNum, commonDen);
  
  const wrongAnswers = [
    formatMixedNumber(resultNum + commonDen, commonDen),
    formatMixedNumber(Math.max(commonDen, resultNum - commonDen), commonDen),
    `${mixed1.whole + mixed2.whole} ${formatFraction(mixed1.num + mixed2.num, Math.max(mixed1.den, mixed2.den))}`
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${mixed1.whole} ${formatFraction(mixed1.num, mixed1.den)} + ${mixed2.whole} ${formatFraction(mixed2.num, mixed2.den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Convert mixed numbers to improper fractions first, then add them together.`,
    solution: [
      `Convert ${mixed1.whole} ${formatFraction(mixed1.num, mixed1.den)} to improper: ${formatFraction(improper1.num, improper1.den)}`,
      `Convert ${mixed2.whole} ${formatFraction(mixed2.num, mixed2.den)} to improper: ${formatFraction(improper2.num, improper2.den)}`,
      `Find LCD of ${improper1.den} and ${improper2.den}: ${commonDen}`,
      `Add: ${formatFraction(num1, commonDen)} + ${formatFraction(num2, commonDen)} = ${formatFraction(resultNum, commonDen)}`,
      `Convert back to mixed number: ${correctAnswer}`
    ],
    explanation: "To add mixed numbers, convert to improper fractions, find common denominator, add, then convert back to mixed number if needed.",
    operation: 'addition'
  };
};

// SUBTRACTION QUESTIONS
const generateSimilarFractionSubtraction = (id: number): Question => {
  const denominators = [2, 3, 4, 5, 6, 8];
  const den = denominators[Math.floor(Math.random() * denominators.length)];
  
  const num2 = Math.floor(Math.random() * (den - 1)) + 1;
  const num1 = num2 + Math.floor(Math.random() * (den - num2)) + 1;
  
  const resultNum = num1 - num2;
  const correctAnswer = formatFraction(resultNum, den);
  
  const wrongAnswers = [
    formatFraction(resultNum + 1, den),
    formatFraction(Math.max(1, resultNum - 1), den),
    formatFraction(Math.abs(num1 - num2), den + 1)
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${formatFraction(num1, den)} - ${formatFraction(num2, den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Since both fractions have the same denominator (${den}), just subtract the numerators: ${num1} - ${num2}.`,
    solution: [
      `Both fractions have the same denominator: ${den}`,
      `Subtract the numerators: ${num1} - ${num2} = ${resultNum}`,
      `Keep the same denominator: ${den}`,
      `The answer is ${formatFraction(resultNum, den)} = ${correctAnswer}`
    ],
    explanation: "When fractions have the same denominator, we simply subtract the numerators and keep the denominator the same.",
    operation: 'subtraction'
  };
};

const generateDissimilarFractionSubtraction = (id: number): Question => {
  const frac1 = properFractions[Math.floor(Math.random() * properFractions.length)];
  let frac2 = properFractions[Math.floor(Math.random() * properFractions.length)];
  
  // Ensure different denominators and first fraction is larger
  while (frac1.den === frac2.den || frac1.num / frac1.den <= frac2.num / frac2.den) {
    frac2 = properFractions[Math.floor(Math.random() * properFractions.length)];
  }
  
  const commonDen = lcm(frac1.den, frac2.den);
  const num1 = (frac1.num * commonDen) / frac1.den;
  const num2 = (frac2.num * commonDen) / frac2.den;
  const resultNum = num1 - num2;
  
  const correctAnswer = formatFraction(resultNum, commonDen);
  
  const wrongAnswers = [
    formatFraction(Math.abs(frac1.num - frac2.num), Math.max(frac1.den, frac2.den)),
    formatFraction(resultNum + 1, commonDen),
    formatFraction(Math.max(1, resultNum - 1), commonDen)
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${formatFraction(frac1.num, frac1.den)} - ${formatFraction(frac2.num, frac2.den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Find the LCD of ${frac1.den} and ${frac2.den}, which is ${commonDen}. Convert both fractions to have this denominator.`,
    solution: [
      `Find the LCD of ${frac1.den} and ${frac2.den}, which is ${commonDen}`,
      `Convert ${formatFraction(frac1.num, frac1.den)} to ${formatFraction(num1, commonDen)}`,
      `Convert ${formatFraction(frac2.num, frac2.den)} to ${formatFraction(num2, commonDen)}`,
      `Subtract: ${formatFraction(num1, commonDen)} - ${formatFraction(num2, commonDen)} = ${formatFraction(resultNum, commonDen)}`,
      `Simplify: ${correctAnswer}`
    ],
    explanation: "To subtract fractions with different denominators, find the LCD, convert both fractions, then subtract the numerators.",
    operation: 'subtraction'
  };
};

const generateMixedNumberSubtraction = (id: number): Question => {
  const mixed1 = mixedNumbers[Math.floor(Math.random() * mixedNumbers.length)];
  let mixed2 = mixedNumbers[Math.floor(Math.random() * mixedNumbers.length)];
  
  // Ensure first mixed number is larger
  while (mixed1.whole + (mixed1.num / mixed1.den) <= mixed2.whole + (mixed2.num / mixed2.den)) {
    mixed2 = mixedNumbers[Math.floor(Math.random() * mixedNumbers.length)];
  }
  
  const improper1 = mixedToImproper(mixed1.whole, mixed1.num, mixed1.den);
  const improper2 = mixedToImproper(mixed2.whole, mixed2.num, mixed2.den);
  
  const commonDen = lcm(improper1.den, improper2.den);
  const num1 = (improper1.num * commonDen) / improper1.den;
  const num2 = (improper2.num * commonDen) / improper2.den;
  const resultNum = num1 - num2;
  
  const correctAnswer = formatMixedNumber(resultNum, commonDen);
  
  const wrongAnswers = [
    formatMixedNumber(resultNum + commonDen, commonDen),
    formatMixedNumber(Math.max(1, resultNum - commonDen), commonDen),
    `${Math.abs(mixed1.whole - mixed2.whole)} ${formatFraction(Math.abs(mixed1.num - mixed2.num), Math.max(mixed1.den, mixed2.den))}`
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${mixed1.whole} ${formatFraction(mixed1.num, mixed1.den)} - ${mixed2.whole} ${formatFraction(mixed2.num, mixed2.den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Convert mixed numbers to improper fractions first, then subtract them.`,
    solution: [
      `Convert ${mixed1.whole} ${formatFraction(mixed1.num, mixed1.den)} to improper: ${formatFraction(improper1.num, improper1.den)}`,
      `Convert ${mixed2.whole} ${formatFraction(mixed2.num, mixed2.den)} to improper: ${formatFraction(improper2.num, improper2.den)}`,
      `Find LCD of ${improper1.den} and ${improper2.den}: ${commonDen}`,
      `Subtract: ${formatFraction(num1, commonDen)} - ${formatFraction(num2, commonDen)} = ${formatFraction(resultNum, commonDen)}`,
      `Convert back to mixed number: ${correctAnswer}`
    ],
    explanation: "To subtract mixed numbers, convert to improper fractions, find common denominator, subtract, then convert back to mixed number if needed.",
    operation: 'subtraction'
  };
};

// MULTIPLICATION QUESTIONS
const generateProperImproperMultiplication = (id: number): Question => {
  const frac1 = Math.random() > 0.5 ? 
    properFractions[Math.floor(Math.random() * properFractions.length)] :
    improperFractions[Math.floor(Math.random() * improperFractions.length)];
  
  const frac2 = Math.random() > 0.5 ? 
    properFractions[Math.floor(Math.random() * properFractions.length)] :
    improperFractions[Math.floor(Math.random() * improperFractions.length)];
  
  const resultNum = frac1.num * frac2.num;
  const resultDen = frac1.den * frac2.den;
  
  const correctAnswer = formatMixedNumber(resultNum, resultDen);
  
  const wrongAnswers = [
    formatFraction(frac1.num + frac2.num, frac1.den + frac2.den),
    formatMixedNumber(resultNum + 1, resultDen),
    formatMixedNumber(resultNum, resultDen + 1)
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${formatFraction(frac1.num, frac1.den)} × ${formatFraction(frac2.num, frac2.den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Multiply numerators together and denominators together: (${frac1.num} × ${frac2.num}) ÷ (${frac1.den} × ${frac2.den}).`,
    solution: [
      `Multiply the numerators: ${frac1.num} × ${frac2.num} = ${resultNum}`,
      `Multiply the denominators: ${frac1.den} × ${frac2.den} = ${resultDen}`,
      `Result: ${formatFraction(resultNum, resultDen)}`,
      `Convert to mixed number if needed: ${correctAnswer}`
    ],
    explanation: "When multiplying fractions, multiply numerator by numerator and denominator by denominator, then simplify.",
    operation: 'multiplication'
  };
};

const generateWholeNumberMixedMultiplication = (id: number): Question => {
  const wholeNumber = Math.floor(Math.random() * 5) + 2; // 2-6
  const mixed = mixedNumbers[Math.floor(Math.random() * mixedNumbers.length)];
  
  const improper = mixedToImproper(mixed.whole, mixed.num, mixed.den);
  const resultNum = wholeNumber * improper.num;
  const resultDen = improper.den;
  
  const correctAnswer = formatMixedNumber(resultNum, resultDen);
  
  const wrongAnswers = [
    formatMixedNumber(resultNum + resultDen, resultDen),
    `${wholeNumber * mixed.whole} ${formatFraction(wholeNumber * mixed.num, mixed.den)}`,
    formatMixedNumber(resultNum, resultDen + 1)
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${wholeNumber} × ${mixed.whole} ${formatFraction(mixed.num, mixed.den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Convert the mixed number to an improper fraction first, then multiply by the whole number.`,
    solution: [
      `Convert ${mixed.whole} ${formatFraction(mixed.num, mixed.den)} to improper fraction: ${formatFraction(improper.num, improper.den)}`,
      `Multiply: ${wholeNumber} × ${formatFraction(improper.num, improper.den)} = ${formatFraction(wholeNumber * improper.num, improper.den)}`,
      `Simplify: ${formatFraction(resultNum, resultDen)}`,
      `Convert to mixed number: ${correctAnswer}`
    ],
    explanation: "To multiply a whole number by a mixed number, convert the mixed number to an improper fraction first, then multiply.",
    operation: 'multiplication'
  };
};

// DIVISION QUESTIONS
const generateProperImproperDivision = (id: number): Question => {
  const frac1 = Math.random() > 0.5 ? 
    properFractions[Math.floor(Math.random() * properFractions.length)] :
    improperFractions[Math.floor(Math.random() * improperFractions.length)];
  
  const frac2 = properFractions[Math.floor(Math.random() * properFractions.length)];
  
  const resultNum = frac1.num * frac2.den;
  const resultDen = frac1.den * frac2.num;
  
  const correctAnswer = formatMixedNumber(resultNum, resultDen);
  
  const wrongAnswers = [
    formatFraction(frac1.num * frac2.num, frac1.den * frac2.den),
    formatMixedNumber(resultNum + 1, resultDen),
    formatMixedNumber(resultNum, resultDen + 1)
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${formatFraction(frac1.num, frac1.den)} ÷ ${formatFraction(frac2.num, frac2.den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `To divide fractions, multiply by the reciprocal: ${formatFraction(frac1.num, frac1.den)} × ${formatFraction(frac2.den, frac2.num)}.`,
    solution: [
      `To divide by a fraction, multiply by its reciprocal`,
      `Reciprocal of ${formatFraction(frac2.num, frac2.den)} is ${formatFraction(frac2.den, frac2.num)}`,
      `Calculate: ${formatFraction(frac1.num, frac1.den)} × ${formatFraction(frac2.den, frac2.num)}`,
      `Multiply: ${formatFraction(frac1.num * frac2.den, frac1.den * frac2.num)} = ${formatFraction(resultNum, resultDen)}`,
      `Convert to mixed number: ${correctAnswer}`
    ],
    explanation: "To divide fractions, multiply by the reciprocal of the divisor (flip the second fraction and multiply).",
    operation: 'division'
  };
};

const generateWholeNumberMixedDivision = (id: number): Question => {
  const wholeNumber = Math.floor(Math.random() * 6) + 3; // 3-8
  const mixed = mixedNumbers[Math.floor(Math.random() * mixedNumbers.length)];
  
  const improper = mixedToImproper(mixed.whole, mixed.num, mixed.den);
  const resultNum = wholeNumber * improper.den;
  const resultDen = improper.num;
  
  const correctAnswer = formatMixedNumber(resultNum, resultDen);
  
  const wrongAnswers = [
    formatMixedNumber(resultNum + resultDen, resultDen),
    formatFraction(wholeNumber, mixed.whole + (mixed.num / mixed.den)),
    formatMixedNumber(resultNum, resultDen + 1)
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `What is ${wholeNumber} ÷ ${mixed.whole} ${formatFraction(mixed.num, mixed.den)}?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Convert the mixed number to an improper fraction, then multiply the whole number by the reciprocal.`,
    solution: [
      `Convert ${mixed.whole} ${formatFraction(mixed.num, mixed.den)} to improper fraction: ${formatFraction(improper.num, improper.den)}`,
      `Rewrite division as multiplication by reciprocal: ${wholeNumber} × ${formatFraction(improper.den, improper.num)}`,
      `Calculate: ${formatFraction(wholeNumber * improper.den, improper.num)} = ${formatFraction(resultNum, resultDen)}`,
      `Convert to mixed number: ${correctAnswer}`
    ],
    explanation: "To divide by a mixed number, convert it to an improper fraction, then multiply by its reciprocal.",
    operation: 'division'
  };
};

// Main question generation function
export const generateQuestions = (level: number): Question[] => {
  const questions: Question[] = [];
  const questionsPerType = 3; // 3 questions per sub-type, total 9 per level
  
  for (let i = 0; i < questionsPerType; i++) {
    let question1: Question, question2: Question, question3: Question;
    
    switch (level) {
      case 1: // Addition
        question1 = generateSimilarFractionAddition(i * 3 + 1);
        question2 = generateDissimilarFractionAddition(i * 3 + 2);
        question3 = generateMixedNumberAddition(i * 3 + 3);
        break;
      case 2: // Subtraction
        question1 = generateSimilarFractionSubtraction(i * 3 + 1);
        question2 = generateDissimilarFractionSubtraction(i * 3 + 2);
        question3 = generateMixedNumberSubtraction(i * 3 + 3);
        break;
      case 3: // Multiplication
        question1 = generateProperImproperMultiplication(i * 3 + 1);
        question2 = generateWholeNumberMixedMultiplication(i * 3 + 2);
        question3 = generateProperImproperMultiplication(i * 3 + 3);
        break;
      case 4: // Division
        question1 = generateProperImproperDivision(i * 3 + 1);
        question2 = generateWholeNumberMixedDivision(i * 3 + 2);
        question3 = generateProperImproperDivision(i * 3 + 3);
        break;
      default:
        question1 = generateSimilarFractionAddition(i * 3 + 1);
        question2 = generateDissimilarFractionAddition(i * 3 + 2);
        question3 = generateMixedNumberAddition(i * 3 + 3);
    }
    
    questions.push(question1, question2, question3);
  }
  
  // Shuffle questions to mix the types
  return questions.sort(() => Math.random() - 0.5);
};