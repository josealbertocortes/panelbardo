import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Para Netlify Forms, la lógica de envío de datos HTTP la maneja Netlify directamente.
    // Aquí puedes opcionalmente enviar un fetch si quieres más control o validación JS extra,
    // pero para la funcionalidad básica de Netlify Forms, solo necesitas los atributos en <form>.

    // Netlify recomienda usar un simple post al mismo path o un action="#"
    // y dejar que su procesador de formularios se encargue.

    // Simplemente redirigiremos al usuario a una página de "gracias" o mostraremos un mensaje.
    // Si quieres una página de gracias de Netlify, puedes usar la acción /success.
    // Pero para esta demostración, solo el alert.
    setFormData({ name: '', email: '', message: '' });
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

      {/* !!! CAMBIOS AQUÍ para Netlify Forms !!! */}
      <form
        name="contact" // Importante: un nombre único para el formulario
        method="POST" // Debe ser POST
        data-netlify="true" // Le dice a Netlify que capture este formulario
        // action="/success" // Opcional: Redirige a una página /success después del envío
        onSubmit={handleSubmit} // Mantenemos tu lógica de limpieza de formulario y alerta
        action="/success"
        className="grid gap-6 max-w-xl"
      >
        {/* Campo oculto necesario para Netlify Forms con React/JSX */}
        <input type="hidden" name="form-name" value="contact" />

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