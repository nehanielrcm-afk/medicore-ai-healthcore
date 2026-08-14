"use client"
import { useState } from "react";

export default function NotesPage() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // ====== Clinical note Template ======
  const AI_TEMPLATE = `  // <-- YAHAN naam theek kiya
Tum ek doctor ho. Neeche di gayi info se detailed Clinical Note banao.

Patient Name: {patient_name}
Chief Complaint: {complaint}
Date: {date}

Format:
1. CHIEF COMPLAINT:
2. HISTORY OF PRESENT ILLNESS:
3. ASSESSMENT:
4. PLAN:
`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    
    const patient_name = formData.get("name");
    const complaint = formData.get("complaint");
    const date = new Date().toLocaleDateString();

    const prompt = AI_TEMPLATE  // <-- YAHAN bhi same naam
      .replace("{patient_name}", patient_name)
      .replace("{complaint}", complaint)
      .replace("{date}", date);

    // Sample AI - baad me isme OpenAI lage ga
    const aiDiagnosis = complaint.toLowerCase().includes("stomach") 
      ? "Gastritis, IBS" 
      : "Needs examination";

    const aiNotes = `1. CHIEF COMPLAINT: ${complaint}
2. HISTORY OF PRESENT ILLNESS: Patient aaya ${complaint} ke sath.
3. ASSESSMENT: ${aiDiagnosis}
4. PLAN: Follow up after 1 week.
5. INSURANCE: Self Pay`;

    setResult(aiNotes);
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Create Clinical Note</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" placeholder="Patient Name" className="border p-2 w-full rounded" required/>
        <textarea name="complaint" placeholder="Patient ki shikayat likho" rows="3" className="border p-2 w-full rounded" required/>
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? "Generating..." : "Generate Note"}
        </button>
      </form>
      {result && <pre className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap">{result}</pre>}
    </div>
  )
}