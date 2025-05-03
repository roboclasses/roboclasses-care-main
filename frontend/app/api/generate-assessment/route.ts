import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"

// Function to generate a fallback assessment
function generateFallbackAssessment(params: {
  subject: string
  ageGroup: string
  difficultyLevel: number
  numberOfQuestions: number
  additionalInstructions?: string
}) {
  const { subject, ageGroup, difficultyLevel, numberOfQuestions, additionalInstructions } = params

  // Create a title based on subject
  const title = `Fun ${subject} Assessment for Kids!`

  // Determine difficulty level text
  const difficultyText = ["very easy", "easy", "moderate", "challenging", "very challenging"][difficultyLevel - 1]

  // Generate questions based on subject
  let questions = ""
  for (let i = 1; i <= numberOfQuestions; i++) {
    if (subject.toLowerCase().includes("math")) {
      const num1 = i + 1
      const num2 = i + difficultyLevel
      questions += `${i}. What is ${num1} ${i % 2 === 0 ? "+" : "×"} ${num2}?\n\n`
    } else if (subject.toLowerCase().includes("science")) {
      const topics = [
        "Name an animal that lives in the ocean.",
        "What are the three states of matter?",
        "Name a planet in our solar system.",
        "What do plants need to grow?",
        "Name a carnivorous animal.",
        "What is the water cycle?",
        "How do seasons change?",
        "What is photosynthesis?",
        "Name a type of energy.",
        "How do magnets work?",
      ]
      questions += `${i}. ${topics[i % topics.length]}\n\n`
    } else if (subject.toLowerCase().includes("read") || subject.toLowerCase().includes("english")) {
      const topics = [
        "What is your favorite book and why?",
        "Write a short story about a magical forest.",
        "What does the main character learn in the story?",
        "Put these words in alphabetical order: apple, zebra, monkey, dog.",
        "Write a sentence using the word 'adventure'.",
        "What is the difference between a noun and a verb?",
        "Write a rhyming poem about the sun.",
        "What is the setting of your favorite story?",
        "Fill in the blank: The cat ___ on the chair.",
        "What is the opposite of 'happy'?",
      ]
      questions += `${i}. ${topics[i % topics.length]}\n\n`
    } else {
      questions += `${i}. Question about ${subject} (difficulty level: ${difficultyLevel}/5)\n\n`
    }
  }

  // Create an answer key
  let answerKey = "# Answer Key\n\n"
  for (let i = 1; i <= numberOfQuestions; i++) {
    if (subject.toLowerCase().includes("math") && i % 2 === 0) {
      const num1 = i + 1
      const num2 = i + difficultyLevel
      answerKey += `${i}. ${num1 + num2}\n`
    } else if (subject.toLowerCase().includes("math")) {
      const num1 = i + 1
      const num2 = i + difficultyLevel
      answerKey += `${i}. ${num1 * num2}\n`
    } else {
      answerKey += `${i}. [Sample answer for question ${i}]\n`
    }
  }

  // Include any additional instructions
  const instructionsNote = additionalInstructions ? `\nSpecial instructions: ${additionalInstructions}\n` : ""

  return `
# ${title}

## Instructions
This is a ${difficultyText} assessment for ${ageGroup} year olds about ${subject}.
Answer all ${numberOfQuestions} questions to the best of your ability!${instructionsNote}

## Questions

${questions}

${answerKey}

Note: This assessment was generated in offline mode.
`
}

export async function POST(req: Request) {
  try {
    const {
      subject,
      ageGroup,
      difficultyLevel,
      numberOfQuestions,
      additionalInstructions,
      useAI = true,
    } = await req.json()

     // Use environment variable for API key
     const openaiProvider = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
     const model = openaiProvider("gpt-3.5-turbo");

    // If useAI is false, use the fallback generator
    if (!useAI) {
      const fallbackAssessment = generateFallbackAssessment({
        subject,
        ageGroup,
        difficultyLevel,
        numberOfQuestions,
        additionalInstructions,
      })

      return Response.json({
        assessment: fallbackAssessment,
        notice: "Using offline assessment generator. Switch to AI mode for more customized assessments.",
      })
    }

    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is missing. Please add it to your environment variables.")
    }

    // Create a prompt for the AI
    const prompt = `
      Create an educational assessment for children with the following parameters:
      
      Subject: ${subject}
      Age Group: ${ageGroup} years old
      Difficulty Level: ${difficultyLevel} out of 5
      Number of Questions: ${numberOfQuestions}
      Additional Instructions: ${additionalInstructions || "None"}
      
      Please format the assessment with:
      1. A kid-friendly title (use a # heading)
      2. Clear, age-appropriate instructions (use a ## heading)
      3. Numbered questions (use a ## heading for Questions section)
      4. A mix of question types appropriate for the subject (multiple choice, fill-in-the-blank, short answer, etc.)
      5. An answer key at the end (use a # heading for Answer Key)
      
      Make sure the content is educational, engaging, and appropriate for the specified age group.
    `

    try {
      // Generate the assessment using OpenAI
      const { text } = await generateText({
        // model: openai("gpt-3.5-turbo"), // Using 3.5-turbo instead of gpt-4o to reduce token usage
        model,
        prompt,
        temperature: 0.7,
        maxTokens: 2000,
      })

      return Response.json({
        assessment: text,
        aiGenerated: true,
      })
    } catch (apiError) {
      console.error("OpenAI API error:", apiError)

      // If the API call fails, use the fallback generator
      const fallbackAssessment = generateFallbackAssessment({
        subject,
        ageGroup,
        difficultyLevel,
        numberOfQuestions,
        additionalInstructions,
      })

      return Response.json({
        assessment: fallbackAssessment,
        notice: "AI generation failed. Using fallback assessment generator instead.",
        error: apiError instanceof Error ? apiError.message : "Unknown API error",
      })
    }
  } catch (error) {
    console.error("Error generating assessment:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to generate assessment" },
      { status: 500 },
    )
  }
}
