const genai = require("@google/genai");

const ai = new genai.GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})



const generatePrediction = async(prompt)=>{
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt
    });
    return response.text;
}

const predictText = async(req,res)=>{
    try{
        const {text} = req.body;
        const prompt = `
        User typed:
        "${text}"

        Generate 3 next phrase suggestions.
        Return JSON array only.
        `;
        const data = await generatePrediction(prompt);
        const cleaned = data
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

        console.log("Gemini response:", data);
    const suggestions = JSON.parse(cleaned);

        return res.json({suggestions})

    }catch(err){
        console.log("GEMINI ERROR:", err);

    res.status(500).json({
        message: err.message
    });
    }
}

module.exports = {predictText}