# netlify/functions/submit-contact-form/main.py

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
# Si necesitas CORS, puedes descomentar las siguientes líneas y la configuración de app.add_middleware
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr # EmailStr para validación de email
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Importa Mangum para adaptar FastAPI a Netlify Functions (AWS Lambda)
from mangum import Mangum

# Crea la instancia de FastAPI
app = FastAPI()

# Configuración de CORS (si tu frontend y tu función están en diferentes dominios/subdominios)
# Por lo general, Netlify se encarga de esto bien, pero si tienes problemas de CORS,
# descomenta y ajusta los 'origins' a los dominios de tu frontend.
origins = [
     "http://localhost:5173", # Para desarrollo local de tu frontend con Vite
     "https://animated-griffin-34376c.netlify.app", # Tu dominio de Netlify
     "http://www.pandelbardo.com", # Si usas un dominio personalizado
 ]
app.add_middleware(
     CORSMiddleware,
     allow_origins=origins,
     allow_credentials=True,
     allow_methods=["*"], # Puedes ser más específico, e.g., ["POST"]
     allow_headers=["*"], # Puedes ser más específico, e.g., ["Content-Type"]
 )

# Define el modelo de datos para tu formulario usando Pydantic
class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr # Usa EmailStr para validación automática de formato de email
    message: str

@app.post("/submit-contact-form")
async def submit_contact_form(form_data: ContactFormRequest):
    """
    Endpoint para recibir los datos del formulario de contacto y enviar un correo.
    """
    try:
        # Los datos ya vienen validados y tipados por Pydantic/FastAPI
        name = form_data.name
        email = form_data.email
        message = form_data.message

        # Obtener credenciales de correo desde variables de entorno
        sender_email = os.environ.get('EMAIL_USER')
        sender_password = os.environ.get('EMAIL_PASS') # Usa una contraseña de aplicación para Gmail
        receiver_email = os.environ.get('RECEIVER_EMAIL') # El correo donde quieres recibir los mensajes

        # Verificar que las credenciales estén configuradas
        if not sender_email or not sender_password or not receiver_email:
            print("Error: Credenciales de correo no configuradas en variables de entorno.")
            raise HTTPException(
                status_code=500,
                detail="Error de configuración del servidor. Faltan credenciales de correo."
            )

        # Configurar el mensaje de correo electrónico
        msg = MIMEMultipart()
        msg['From'] = name
        msg['To'] = receiver_email
        msg['Subject'] = f"Nuevo mensaje de contacto de {name} - Pan El Bardo"

        email_body_html = f"""
        <html>
        <body>
            <h2>Nuevo mensaje de contacto desde el sitio web</h2>
            <p><strong>De:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Mensaje:</strong></p>
            <p>{message}</p>
            <br>
            <small>Este mensaje fue enviado desde el formulario de contacto de Pan El Bardo.</small>
        </body>
        </html>
        """
        msg.attach(MIMEText(email_body_html, 'html'))

        # Envío del correo electrónico usando SMTP_SSL (seguro)
        try:
            # Para Gmail, usar 'smtp.gmail.com' y puerto 465 con SMT_SSL
            # Si usas otro proveedor, ajusta el host y puerto según sea necesario.
            # Asegúrate de usar una contraseña de aplicación si usas Gmail.
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                server.login(sender_email, sender_password)
                server.send_message(msg)
            print(f"Correo de contacto enviado con éxito desde: {email}")
            return JSONResponse(
                status_code=200,
                content={'message': '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.'}
            )
        except smtplib.SMTPAuthenticationError:
            print("Error de autenticación SMTP: Verifica usuario/contraseña o App Password.")
            raise HTTPException(
                status_code=500,
                detail="Error al autenticar con el servidor de correo. Revisa tus credenciales."
            )
        except Exception as e:
            print(f"Error al enviar el correo: {e}")
            raise HTTPException(
                status_code=500,
                detail=f"Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo: {str(e)}"
            )

    except HTTPException as e:
        # Re-lanza las excepciones HTTP que ya hemos definido
        raise e
    except Exception as e:
        # Captura cualquier otra excepción inesperada
        print(f"Error inesperado en el endpoint: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error interno del servidor. Por favor, inténtalo de nuevo más tarde. {str(e)}"
        )

# ¡Este es el handler principal que Netlify Functions necesita!
# Mangum se encarga de adaptar las solicitudes de Netlify (basadas en AWS Lambda) a la aplicación FastAPI.
handler = Mangum(app)