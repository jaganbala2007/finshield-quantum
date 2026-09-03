import re
import numpy as np

class SocialEngineeringModel:
    """
    NLP analyzer for scam communications (SMS messages & Phone Call Transcripts).
    Detects urgency, coercion, impersonation, fear tactics, and fraudulent instructions.
    """
    def __init__(self):
        self.urgency_words = [
            "urgent", "urgently", "immediately", "frozen", "block", "blocked", "suspension",
            "security alert", "police", "court", "cbi", "arrest", "warrant", "guaranteed",
            "double your", "lottery", "winner", "processing fee", "safe account", "transfer now",
            "do not hang up", "confidential", "secret", "anydesk", "malware", "virus", "kyc expired"
        ]
        
        self.coercion_phrases = [
            r"account.*(frozen|blocked|suspended)",
            r"(call|contact).*(immediately|right now)",
            r"(police|inspector|court|cbi).*(warrant|arrest|escrow)",
            r"transfer.*(safe|temporary|vault) account",
            r"(double|triple|200%|250%).*(profit|guarantee|savings)",
            r"(won|winner|lottery).*(claim|processing fee)",
            r"(hospital|accident|emergency).*(deposit|cash|send money)",
            r"don'?t (hang up|tell anyone|call parents)"
        ]

    def analyze_communication(self, message_text="", call_transcript=""):
        combined_text = f"{message_text} {call_transcript}".lower().strip()
        
        if not combined_text:
            return 0.0, []

        matches = []
        score = 0.0

        # Check urgency keyword frequencies
        found_keywords = [w for w in self.urgency_words if w in combined_text]
        if found_keywords:
            score += len(found_keywords) * 18.0
            matches.extend([f"Urgency keyword detected: '{kw}'" for kw in found_keywords[:3]])

        # Check regex coercion patterns
        for pattern in self.coercion_phrases:
            if re.search(pattern, combined_text):
                score += 35.0
                matches.append("Social engineering coercion pattern identified")

        # Additional sentiment / panic markers
        if any(term in combined_text for term in ["arrest", "police", "jail", "cbi"]):
            score += 25.0
            matches.append("Law enforcement impersonation/threat detected")

        if any(term in combined_text for term in ["safe account", "vault account", "temp account"]):
            score += 30.0
            matches.append("Classic APP scam 'Safe Account' transfer instruction detected")

        final_score = float(np.round(np.clip(score, 0.0, 100.0), 2))
        return final_score, list(set(matches))
