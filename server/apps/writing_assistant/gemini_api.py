
import json
import requests
from django.conf import settings

class GeminiClient:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models"
        self.model = "gemini-2.0-flash"
    
    def generate_content(self, prompt, instructions=None):
        """
        Generate rewritten content using Gemini API
        """
        url = f"{self.base_url}/{self.model}:generateContent?key={self.api_key}"
        
        # Create a prompt that combines the original text and instructions
        if instructions:
            full_prompt = f"Rewrite the following content: '{prompt}'\nInstructions: {instructions}\nAnd just return the rewritten content."
        else:
            full_prompt = f"Rewrite the following content: '{prompt}'\nAnd just return the rewritten content."
        
        payload = {
            "contents": [{
                "parts": [{"text": full_prompt}]
            }]
        }
        
        headers = {
            "Content-Type": "application/json"
        }
        
        try:
            response = requests.post(url, headers=headers, data=json.dumps(payload))
            response.raise_for_status()
            
            response_data = response.json()
            if 'candidates' in response_data and len(response_data['candidates']) > 0:
                if 'content' in response_data['candidates'][0] and 'parts' in response_data['candidates'][0]['content']:
                    for part in response_data['candidates'][0]['content']['parts']:
                        if 'text' in part:
                            return part['text']
            
            return "Error: Unable to parse response from Gemini API"
            
        except requests.exceptions.RequestException as e:
            return f"Error: API request failed: {str(e)}"