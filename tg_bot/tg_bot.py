# TELEGRAM_BOT_TOKEN=
# OPENROUTER_API_KEY=sk-
import os
import logging
import requests
from dotenv import load_dotenv
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Load environment variables
load_dotenv()

TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
OPENROUTER_API_KEY = os.getenv('OPENROUTER_API_KEY')

# Set up logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# System prompt for the AI
SYSTEM_PROMPT = """You are a language assistant that helps with English-Russian translation and Russian grammar correction.

Your task:
1. If the user's message is not in Russian: Translate it to Russian. Respond with ONLY the Russian translation, nothing else.
2. If the user's message is in Russian: 
   - Check the grammar (the user is male, so use masculine grammatical forms)
   - If there are grammar errors, respond with ONLY the corrected Russian text
   - If the grammar is perfect, respond with ONLY:  👍

Rules:
- Never explain what you're doing or add comments or notes, just provide the translation or correction or 👍
- The user is male, use masculine forms when correcting Russian (он, я понял, etc.)
"""

async def process_message_with_ai(text: str) -> str:
    """Send message to OpenRouter API and get response."""
    try:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": "anthropic/claude-3.5-sonnet",
                "messages": [
                    {
                        "role": "system",
                        "content": SYSTEM_PROMPT
                    },
                    {
                        "role": "user",
                        "content": text
                    }
                ],
                "temperature": 0.3,
            }
        )
        
        response.raise_for_status()
        result = response.json()
        
        return result['choices'][0]['message']['content'].strip()
    
    except Exception as e:
        logger.error(f"Error calling OpenRouter API: {e}")
        return "Извините, произошла ошибка. / Sorry, an error occurred."

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /start is issued."""
    await update.message.reply_text(
        'Привет! Send me messages in English to translate to Russian, '
        'or in Russian to check grammar. 👋'
    )

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handle incoming messages."""
    user_message = update.message.text
    
    # Get AI response
    ai_response = await process_message_with_ai(user_message)
    
    # Send response
    await update.message.reply_text(ai_response)

def main() -> None:
    """Start the bot."""
    # Create the Application
    application = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    # Register handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    # Run the bot
    logger.info("Bot started...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()