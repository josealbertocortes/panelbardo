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
    console.log('Form submitted:', formData);
    alert('Mensaje enviado. ¡Gracias por contactarnos!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="talkus" className="px-4 py-6 md:px-16 md:py-10 max-w-7xl mx-auto">
      <h2 className="text-white text-xl md:text-3xl font-bold leading-tight tracking-tight mb-4">
        Contacto
      </h2>
      <p className="text-white text-base md:text-lg font-normal leading-relaxed mb-6">
        Visítanos en nuestra redes sociales o contáctanos para pedidos especiales y consultas.
      </p>

      {/* Sección de Información de Contacto (Teléfono, Correo) */}
      {/* - `grid gap-6`: Crea una cuadrícula con espacio entre los elementos.
        - `md:grid-cols-2`: En pantallas medianas (md) y superiores, la cuadrícula tendrá 2 columnas,
                           lo que hará que Teléfono y Correo Electrónico se muestren lado a lado.
        - Por defecto (en móviles), `grid` sin `grid-cols-X` implícitamente crea una columna,
          lo que hace que los elementos se apilen verticalmente, ideal para pantallas pequeñas.
      */}
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

      {/* Formulario de Contacto */}
      {/* - `grid gap-6`: Los campos del formulario también se organizan en una cuadrícula.
        - `max-w-xl`: Limita el ancho máximo del formulario para que no se extienda demasiado
                      en pantallas grandes, mejorando la legibilidad.
        - Por defecto (en móviles), cada `<label>` ocupará su propia fila completa.
      */}
      <form onSubmit={handleSubmit} className="grid gap-6 max-w-xl">
        {/* Cada label con `flex flex-col` asegura que el texto del label y el input/textarea
            siempre se apilen verticalmente, lo cual es bueno para la usabilidad en todos los tamaños. */}
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

        {/* Botón de Enviar: Se adapta automáticamente al ancho del formulario. */}
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