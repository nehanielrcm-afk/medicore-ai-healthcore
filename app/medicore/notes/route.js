export async function POST(request) {
  const formData = await request.formData();
  const complaint = formData.get('complaint');

  // ====== YEH TUMHARA TEMPLATE HAI ======
  const TEMPLATE = `
  Tum ek doctor ho. 
  Patient ki shikayat: ${complaint}
  
  Iska detailed Clinical Note banao is format me:
    1. Chief Complaint
    2. History of Present Illness  
    3. Assessment
  4. Plan
  Professional medical language use karo.
  `

  // Yahan AI ko call hoga TEMPLATE ke sath
  const aiResponse = "AI ka jawab yahan aayega"; 

  return Response.json({ note: aiResponse });
}