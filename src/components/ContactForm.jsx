import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // La URL de tu función Netlify
      // Es /netlify/functions/nombre-de-tu-funcion
      const response = await fetch('/.netlify/functions/submit-contact-form/submit-contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Envía los datos como JSON
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setFormData({ name: '', email: '', message: '' });
        navigate('/gracias');
      } else {
        alert(`Error: ${result.detail || result.message || 'Algo salió mal al enviar el mensaje.'}`);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error de conexión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <section id="talkus" className="px-4 py-6 md:px-16 md:py-10 max-w-7xl mx-auto">
      <h2 className="text-white text-xl md:text-3xl font-bold leading-tight tracking-tight mb-4">
        Contacto
      </h2>
      <p className="text-white text-base md:text-lg font-normal leading-relaxed mb-6">
        Visítanos en nuestra tienda o contáctanos para pedidos especiales y consultas.
      </p>

      <div className="grid gap-6 mb-8 border-t border-[#4d4d4d] pt-6 md:grid-cols-2">
        <div>
          <p className="text-[#adadad] text-sm font-normal">Teléfono</p>
          <p className="text-white text-sm font-normal">+1 (555) 123-4567</p>
        </div>
        <div>
          <p className="text-[#adadad] text-sm font-normal">Correo Electrónico</p>
          <p className="text-white text-sm font-normal">info@panelbardo.com</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 max-w-xl">
        <label className="flex flex-col">
          <span className="text-white text-base font-medium mb-2">Nombre</span>
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            className="rounded-xl text-white border border-[#4d4d4d] bg-neutral-800 h-14 px-4 placeholder:text-[#adadad] text-base focus:outline-none focus:ring-0"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="text-white text-base font-medium mb-2">Correo Electrónico</span>
          <input
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            className="rounded-xl text-white border border-[#4d4d4d] bg-neutral-800 h-14 px-4 placeholder:text-[#adadad] text-base focus:outline-none focus:ring-0"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="text-white text-base font-medium mb-2">Mensaje</span>
          <textarea
            name="message"
            placeholder="Tu mensaje"
            className="rounded-xl text-white border border-[#4d4d4d] bg-neutral-800 min-h-[140px] px-4 py-3 placeholder:text-[#adadad] text-base focus:outline-none focus:ring-0 resize-none"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <div>
          <button
            type="submit"
            className="rounded-full bg-[#141414] text-white text-sm font-bold px-6 py-2 hover:bg-[#1f1f1f] transition"
          >
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;