import { Question } from '../types';

// Helper functions (reused from questionGenerator)
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

// Assessment Question Interface
interface AssessmentQuestion extends Question {
  category: 'addition' | 'subtraction' | 'multiplication' | 'division';
  subcategory: string;
}

// Fraction pools
const properFractions = [
  { num: 1, den: 2 }, { num: 1, den: 3 }, { num: 2, den: 3 }, { num: 1, den: 4 }, { num: 3, den: 4 },
  { num: 1, den: 5 }, { num: 2, den: 5 }, { num: 3, den: 5 }, { num: 4, den: 5 }, { num: 1, den: 6 },
  { num: 5, den: 6 }, { num: 1, den: 8 }, { num: 3, den: 8 }, { num: 5, den: 8 }, { num: 7, den: 8 }
];

const improperFractions = [
  { num: 3, den: 2 }, { num: 5, den: 2 }, { num: 7, den: 2 }, { num: 4, den: 3 }, { num: 5, den: 3 },
  { num: 7, den: 3 }, { num: 8, den: 3 }, { num: 5, den: 4 }, { num: 7, den: 4 }, { num: 9, den: 4 }
];

const mixedNumbers = [
  { whole: 1, num: 1, den: 2 }, { whole: 1, num: 1, den: 3 }, { whole: 1, num: 2, den: 3 },
  { whole: 2, num: 1, den: 4 }, { whole: 2, num: 3, den: 4 }, { whole: 1, num: 3, den: 5 }
];

// ADDITION ASSESSMENT QUESTIONS
const generateAdditionSimilar = (id: number): AssessmentQuestion => {
  const denominators = [3, 4, 5, 6, 8];
  const den = denominators[Math.floor(Math.random() * denominators.length)];
  
  const num1 = Math.floor(Math.random() * (den - 2)) + 1;
  const num2 = Math.floor(Math.random() * (den - num1 - 1)) + 1;
  
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
    question: `${formatFraction(num1, den)} + ${formatFraction(num2, den)} = ?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Both fractions have the same denominator. Add the numerators and keep the denominator.`,
    solution: [
      `Both fractions have denominator ${den}`,
      `Add numerators: ${num1} + ${num2} = ${resultNum}`,
      `Result: ${formatFraction(resultNum, den)}`
    ],
    explanation: "When adding fractions with the same denominator, add the numerators and keep the denominator unchanged.",
    operation: 'addition',
    category: 'addition',
    subcategory: 'Similar Fractions'
  };
};

const generateAdditionDissimilar = (id: number): AssessmentQuestion => {
  const frac1 = properFractions[Math.floor(Math.random() * properFractions.length)];
  let frac2 = properFractions[Math.floor(Math.random() * properFractions.length)];
  
  while (frac1.den === frac2.den) {
    frac2 = properFractions[Math.floor(Math.random() * properFractions.length)];
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
    question: `${formatFraction(frac1.num, frac1.den)} + ${formatFraction(frac2.num, frac2.den)} = ?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Find the LCD of ${frac1.den} and ${frac2.den}, then convert both fractions.`,
    solution: [
      `LCD of ${frac1.den} and ${frac2.den} is ${commonDen}`,
      `Convert: ${formatFraction(frac1.num, frac1.den)} = ${formatFraction(num1, commonDen)}`,
      `Convert: ${formatFraction(frac2.num, frac2.den)} = ${formatFraction(num2, commonDen)}`,
      `Add: ${formatFraction(num1, commonDen)} + ${formatFraction(num2, commonDen)} = ${correctAnswer}`
    ],
    explanation: "To add fractions with different denominators, find the LCD and convert both fractions.",
    operation: 'addition',
    category: 'addition',
    subcategory: 'Dissimilar Fractions'
  };
};

const generateAdditionMixed = (id: number): AssessmentQuestion => {
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
    `${mixed1.whole + mixed2.whole} ${formatFraction(mixed1.num + mixed2.num, Math.max(mixed1.den, mixed2.den))}`,
    formatMixedNumber(Math.max(commonDen, resultNum - commonDen), commonDen)
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `${mixed1.whole} ${formatFraction(mixed1.num, mixed1.den)} + ${mixed2.whole} ${formatFraction(mixed2.num, mixed2.den)} = ?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Convert mixed numbers to improper fractions, add them, then convert back.`,
    solution: [
      `Convert to improper: ${formatFraction(improper1.num, improper1.den)} + ${formatFraction(improper2.num, improper2.den)}`,
      `Find LCD: ${commonDen}`,
      `Add: ${formatFraction(resultNum, commonDen)}`,
      `Convert back: ${correctAnswer}`
    ],
    explanation: "Convert mixed numbers to improper fractions, add, then convert back to mixed number.",
    operation: 'addition',
    category: 'addition',
    subcategory: 'Mixed Numbers'
  };
};

// SUBTRACTION ASSESSMENT QUESTIONS
const generateSubtractionSimilar = (id: number): AssessmentQuestion => {
  const denominators = [3, 4, 5, 6, 8];
  const den = denominators[Math.floor(Math.random() * denominators.length)];
  
  const num2 = Math.floor(Math.random() * (den - 2)) + 1;
  const num1 = num2 + Math.floor(Math.random() * (den - num2 - 1)) + 1;
  
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
    question: `${formatFraction(num1, den)} - ${formatFraction(num2, den)} = ?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Both fractions have the same denominator. Subtract the numerators.`,
    solution: [
      `Both fractions have denominator ${den}`,
      `Subtract numerators: ${num1} - ${num2} = ${resultNum}`,
      `Result: ${formatFraction(resultNum, den)}`
    ],
    explanation: "When subtracting fractions with the same denominator, subtract the numerators and keep the denominator.",
    operation: 'subtraction',
    category: 'subtraction',
    subcategory: 'Similar Fractions'
  };
};

const generateSubtractionDissimilar = (id: number): AssessmentQuestion => {
  const frac1 = properFractions[Math.floor(Math.random() * properFractions.length)];
  let frac2 = properFractions[Math.floor(Math.random() * properFractions.length)];
  
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
    question: `${formatFraction(frac1.num, frac1.den)} - ${formatFraction(frac2.num, frac2.den)} = ?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Find the LCD of ${frac1.den} and ${frac2.den}, then convert both fractions.`,
    solution: [
      `LCD of ${frac1.den} and ${frac2.den} is ${commonDen}`,
      `Convert: ${formatFraction(frac1.num, frac1.den)} = ${formatFraction(num1, commonDen)}`,
      `Convert: ${formatFraction(frac2.num, frac2.den)} = ${formatFraction(num2, commonDen)}`,
      `Subtract: ${formatFraction(num1, commonDen)} - ${formatFraction(num2, commonDen)} = ${correctAnswer}`
    ],
    explanation: "To subtract fractions with different denominators, find the LCD and convert both fractions.",
    operation: 'subtraction',
    category: 'subtraction',
    subcategory: 'Dissimilar Fractions'
  };
};

const generateSubtractionMixed = (id: number): AssessmentQuestion => {
  const mixed1 = mixedNumbers[Math.floor(Math.random() * mixedNumbers.length)];
  let mixed2 = mixedNumbers[Math.floor(Math.random() * mixedNumbers.length)];
  
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
    `${Math.abs(mixed1.whole - mixed2.whole)} ${formatFraction(Math.abs(mixed1.num - mixed2.num), Math.max(mixed1.den, mixed2.den))}`,
    formatMixedNumber(Math.max(1, resultNum - commonDen), commonDen)
  ];
  
  const options = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return {
    id,
    question: `${mixed1.whole} ${formatFraction(mixed1.num, mixed1.den)} - ${mixed2.whole} ${formatFraction(mixed2.num, mixed2.den)} = ?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Convert mixed numbers to improper fractions, subtract them, then convert back.`,
    solution: [
      `Convert to improper: ${formatFraction(improper1.num, improper1.den)} - ${formatFraction(improper2.num, improper2.den)}`,
      `Find LCD: ${commonDen}`,
      `Subtract: ${formatFraction(resultNum, commonDen)}`,
      `Convert back: ${correctAnswer}`
    ],
    explanation: "Convert mixed numbers to improper fractions, subtract, then convert back to mixed number.",
    operation: 'subtraction',
    category: 'subtraction',
    subcategory: 'Mixed Numbers'
  };
};

// MULTIPLICATION ASSESSMENT QUESTIONS
const generateMultiplicationProperImproper = (id: number): AssessmentQuestion => {
  const frac1 = Math.random() > 0.5 ? 
    properFractions[Math.floor(Math.random() * properFractions.length)] :
    improperFractions[Math.floor(Math.random() * improperFractions.length)];
  
  const frac2 = properFractions[Math.floor(Math.random() * properFractions.length)];
  
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
    question: `${formatFraction(frac1.num, frac1.den)} × ${formatFraction(frac2.num, frac2.den)} = ?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Multiply numerators together and denominators together.`,
    solution: [
      `Multiply numerators: ${frac1.num} × ${frac2.num} = ${resultNum}`,
      `Multiply denominators: ${frac1.den} × ${frac2.den} = ${resultDen}`,
      `Result: ${formatFraction(resultNum, resultDen)}`,
      `Convert: ${correctAnswer}`
    ],
    explanation: "When multiplying fractions, multiply numerator by numerator and denominator by denominator.",
    operation: 'multiplication',
    category: 'multiplication',
    subcategory: 'Proper and Improper Fractions'
  };
};

const generateMultiplicationWholeMixed = (id: number): AssessmentQuestion => {
  const wholeNumber = Math.floor(Math.random() * 4) + 2;
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
    question: `${wholeNumber} × ${mixed.whole} ${formatFraction(mixed.num, mixed.den)} = ?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Convert the mixed number to an improper fraction first.`,
    solution: [
      `Convert ${mixed.whole} ${formatFraction(mixed.num, mixed.den)} to improper: ${formatFraction(improper.num, improper.den)}`,
      `Multiply: ${wholeNumber} × ${formatFraction(improper.num, improper.den)} = ${formatFraction(resultNum, resultDen)}`,
      `Convert: ${correctAnswer}`
    ],
    explanation: "To multiply a whole number by a mixed number, convert the mixed number to an improper fraction first.",
    operation: 'multiplication',
    category: 'multiplication',
    subcategory: 'Whole and Mixed Numbers'
  };
};

// DIVISION ASSESSMENT QUESTIONS
const generateDivisionProperImproper = (id: number): AssessmentQuestion => {
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
    question: `${formatFraction(frac1.num, frac1.den)} ÷ ${formatFraction(frac2.num, frac2.den)} = ?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `To divide fractions, multiply by the reciprocal.`,
    solution: [
      `Reciprocal of ${formatFraction(frac2.num, frac2.den)} is ${formatFraction(frac2.den, frac2.num)}`,
      `Multiply: ${formatFraction(frac1.num, frac1.den)} × ${formatFraction(frac2.den, frac2.num)}`,
      `Result: ${formatFraction(resultNum, resultDen)}`,
      `Convert: ${correctAnswer}`
    ],
    explanation: "To divide fractions, multiply by the reciprocal of the divisor.",
    operation: 'division',
    category: 'division',
    subcategory: 'Proper and Improper Fractions'
  };
};

const generateDivisionWholeMixed = (id: number): AssessmentQuestion => {
  const wholeNumber = Math.floor(Math.random() * 5) + 3;
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
    question: `${wholeNumber} ÷ ${mixed.whole} ${formatFraction(mixed.num, mixed.den)} = ?`,
    options: shuffledOptions,
    correctAnswer: correctIndex,
    hint: `Convert the mixed number to an improper fraction, then multiply by its reciprocal.`,
    solution: [
      `Convert ${mixed.whole} ${formatFraction(mixed.num, mixed.den)} to improper: ${formatFraction(improper.num, improper.den)}`,
      `Multiply by reciprocal: ${wholeNumber} × ${formatFraction(improper.den, improper.num)}`,
      `Result: ${formatFraction(resultNum, resultDen)}`,
      `Convert: ${correctAnswer}`
    ],
    explanation: "To divide by a mixed number, convert it to an improper fraction and multiply by its reciprocal.",
    operation: 'division',
    category: 'division',
    subcategory: 'Whole and Mixed Numbers'
  };
};

// Main assessment question generator
export const generateAssessmentQuestions = (): AssessmentQuestion[] => {
  const questions: AssessmentQuestion[] = [];
  let questionId = 1;
  
  // Generate 5 questions for each operation (20 total)
  
  // Addition (5 questions: 2 similar, 2 dissimilar, 1 mixed)
  questions.push(generateAdditionSimilar(questionId++));
  questions.push(generateAdditionSimilar(questionId++));
  questions.push(generateAdditionDissimilar(questionId++));
  questions.push(generateAdditionDissimilar(questionId++));
  questions.push(generateAdditionMixed(questionId++));
  
  // Subtraction (5 questions: 2 similar, 2 dissimilar, 1 mixed)
  questions.push(generateSubtractionSimilar(questionId++));
  questions.push(generateSubtractionSimilar(questionId++));
  questions.push(generateSubtractionDissimilar(questionId++));
  questions.push(generateSubtractionDissimilar(questionId++));
  questions.push(generateSubtractionMixed(questionId++));
  
  // Multiplication (5 questions: 3 proper/improper, 2 whole/mixed)
  questions.push(generateMultiplicationProperImproper(questionId++));
  questions.push(generateMultiplicationProperImproper(questionId++));
  questions.push(generateMultiplicationProperImproper(questionId++));
  questions.push(generateMultiplicationWholeMixed(questionId++));
  questions.push(generateMultiplicationWholeMixed(questionId++));
  
  // Division (5 questions: 3 proper/improper, 2 whole/mixed)
  questions.push(generateDivisionProperImproper(questionId++));
  questions.push(generateDivisionProperImproper(questionId++));
  questions.push(generateDivisionProperImproper(questionId++));
  questions.push(generateDivisionWholeMixed(questionId++));
  questions.push(generateDivisionWholeMixed(questionId++));
  
  // Shuffle questions to mix the types
  return questions.sort(() => Math.random() - 0.5);
};