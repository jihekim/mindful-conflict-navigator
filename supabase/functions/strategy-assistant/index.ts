
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, caseDetails } = await req.json();
    
    console.log("Received request for strategy assistant:", { message, caseId: caseDetails?.id });
    
    if (!message) {
      throw new Error("Message is required");
    }

    if (!openAIApiKey) {
      throw new Error("OpenAI API key is not configured");
    }

    // System prompt that helps the AI understand its role
    const systemPrompt = `You are an AI Strategy Assistant for conflict mediators and counselors.
Your purpose is to help analyze conflicts and suggest effective resolution strategies.
You have expertise in the Cynefin Framework (Clear, Complicated, Complex, Chaotic domains) and conflict mediation techniques.

When responding, consider:
1. The domain of the conflict in the Cynefin Framework
2. The timeline of events and stakeholder perspectives
3. Appropriate mediation techniques based on the conflict domain
4. Practical next steps the counselor could take

Be concise, practical, and specific in your suggestions. Focus on actionable advice rather than general principles.`;

    // Create context from case details
    let contextPrompt = "";
    if (caseDetails) {
      contextPrompt = `
Case Information:
- Title: ${caseDetails.title}
- Current Status: ${caseDetails.status}
- Stakeholders: ${caseDetails.stakeholders?.join(', ')}
- Current Cynefin Domain: ${caseDetails.cynefinDomain}
- Domain Rationale: ${caseDetails.cynefinRationale}

Timeline:
${caseDetails.timeline?.map(event => 
  `- ${event.date}: ${event.title} (${event.stakeholder || 'Unknown'}) - ${event.description}`
).join('\n')}
`;
    }

    console.log("Sending request to OpenAI");
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: contextPrompt + "\n\nCounselor's question: " + message }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log("Received response from OpenAI");
    
    if (data.error) {
      throw new Error(data.error.message || "Error calling OpenAI API");
    }

    const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in strategy assistant function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
