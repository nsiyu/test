from uagents import Agent, Context
from uagents.setup import fund_agent_if_low
import smtplib
from email.message import EmailMessage
from database import get_db
from datetime import datetime, timedelta

email_agent = Agent(
    name="email_agent",
    port=8004,
    seed="send daily reminder mails",
    endpoint=["http://127.0.0.1:8004/submit"],
)

fund_agent_if_low(email_agent.wallet.address())

def send_email_via_sendgrid(subject, body, sender_email, receiver_email, api_key):
    message = EmailMessage()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    message.set_content(body)

    try:
        with smtplib.SMTP("smtp.sendgrid.net", 587) as server:
            server.starttls()
            server.login("apikey", api_key)
            server.send_message(message)
            print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")

def send_email(subject, message):
    send_email_via_sendgrid(
        subject=subject,
        body=message,
        sender_email="redditbotnumber2@gmail.com",
        receiver_email="redditbotnumber2@gmail.com",
        api_key="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"
    )

def get_all_events(ctx: Context):
    db = get_db()
    events_collection = db.events
    current_time = datetime.now()
    upcoming_events = events_collection.find({"date": {"$lte": current_time + timedelta(days=1)}})
    for event in upcoming_events:
        ctx.logger.info(f"Sending email to '{event['email']}'")
        send_email_via_sendgrid(
            subject=f"Reminder: {event['title']} tomorrow!",
            body=f"Hi, just a reminder that the event '{event['title']}' is scheduled for tomorrow at {event['time']}. Don't forget!",
            sender_email="redditbotnumber2@gmail.com",
            receiver_email=event['email'],
            api_key="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"
        )
        events_collection.delete_one({"_id": event['_id']})
        print(f"Deleted event: {event['title']}")

@email_agent.on_interval(period=60.0)
async def interval(ctx: Context):
    get_all_events(ctx)

if __name__ == "__main__":
    email_agent.run()
