import React, { useState } from 'react'; // Mantendremos useState para el mensaje
// import { useNavigate } from 'react-router-dom'; // Ya no es necesario si solo es WhatsApp

const WHATSAPP_NUMBER = '5215528508289'; // Asegúrate de que este número sea el correcto

function ContactForm() {
  const [message, setMessage] = useState(''); // Solo necesitamos el estado para el mensaje

  // const navigate = useNavigate(); // Ya no es necesario

  const handleChange = (e) => {
    setMessage(e.target.value); // Actualiza solo el mensaje
  };

  const getWhatsAppLink = () => {
    // Genera el mensaje predefinido con el contenido del textarea
    const predefinedMessage = `Hola, me gustaría contactar con ustedes. Mi mensaje es: "${message}"`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(predefinedMessage)}`;
  };

  return (
    <section id="talkus" className="px-4 py-6 md:px-16 md:py-10 max-w-7xl mx-auto">
      <h2 className="text-white text-xl md:text-3xl font-bold leading-tight tracking-tight mb-4">
        Contacto Directo
      </h2>
      <p className="text-white text-base md:text-lg font-normal leading-relaxed mb-6">
        ¡Contáctanos directamente por WhatsApp para una respuesta más rápida!
      </p>

      <div className="grid gap-6 mb-8 border-t border-[#4d4d4d] pt-6 md:grid-cols-2">
        <div>
          <p className="text-[#adadad] text-sm font-normal">WhatsApp</p>
          <p className="text-white text-sm font-normal">55 2850 8289</p> {/* Muestra el número */}
        </div>
        <div>
          <p className="text-[#adadad] text-sm font-normal">Correo Electrónico</p>
          <p className="text-white text-sm font-normal">pandelbardo@gmail.com</p>
        </div>
      </div>

      {/* Eliminamos el <form> y lo reemplazamos con un div y un textarea/botón */}
      <div className="grid gap-6 max-w-xl">
        <label className="flex flex-col">
          <span className="text-white text-base font-medium mb-2">Escribe tu mensaje para WhatsApp:</span>
          <textarea
            name="message"
            placeholder="Tu mensaje"
            className="rounded-xl text-white border border-[#4d4d4d] bg-neutral-800 min-h-[140px] px-4 py-3 placeholder:text-[#adadad] text-base focus:outline-none focus:ring-0 resize-none"
            value={message}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <div>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green-500 text-white text-sm font-bold px-6 py-2 hover:bg-green-600 transition inline-flex items-center justify-center"
            // Puedes agregar un ícono de WhatsApp aquí si lo deseas
          >
            <span className="truncate">Enviar por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;