import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import openai
from sanic import Sanic, text

app = Sanic("DriveTheVote")


@app.post("/email")
async def on_email(request):
    msg = MIMEMultipart()
    msg["From"] = "drivethevote2023@gmail.com"
    msg["To"] = request.args.get("email")
    msg["Subject"] = "Thanks for registering!"
    msg.attach(
        MIMEText(
            f"Thank you for registering to become a volunteer {request.args.get('full-name')}! Keep a "
            f"lookout for future emails!",
            "plain",
        )
    )
    with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
        smtp.ehlo()
        smtp.starttls()
        smtp.ehlo()
        smtp.login("drivethevote2023@gmail.com", "atmkufdlfhgwrqre")
        smtp.sendmail(
            "drivethevote2023@gmail.com",
            request.args.get("email-address"),
            msg.as_string(),
        )
    return text("Email sent!")


@app.post("/chat")
async def on_chat(request):
    openai.api_key = request.args.get("key")
    completion = openai.Completion.create(engine="text-davinci-003", prompt=request.args.get("input"), max_tokens=1000)
    return text(completion.choices[0]['text'])


app.static("/", "resources/static")
app.static("/", "resources/static/index.html")
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, workers=1)
