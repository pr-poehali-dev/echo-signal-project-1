import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту domstroinn@yandex.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()
    product = body.get('product', '').strip()

    if not name or not email:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Имя и email обязательны'}
        }

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    sender = 'domstroinn@yandex.ru'
    recipient = 'domstroinn@yandex.ru'

    subject = f'Новая заявка с сайта — {product}' if product else 'Новая заявка с сайта'

    html_body = f"""
    <html><body style="font-family: Arial, sans-serif; color: #222; max-width: 600px;">
    <h2 style="color: #1a1a1a;">Новая заявка с сайта</h2>
    {'<p><b>Товар:</b> ' + product + '</p>' if product else ''}
    <p><b>Имя:</b> {name}</p>
    <p><b>Email:</b> <a href="mailto:{email}">{email}</a></p>
    {'<p><b>Сообщение:</b><br>' + message.replace(chr(10), '<br>') + '</p>' if message else ''}
    <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
    <p style="color:#999;font-size:12px;">Заявка отправлена через форму на сайте</p>
    </body></html>
    """

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = recipient
    msg['Reply-To'] = email
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'ok': True}
    }