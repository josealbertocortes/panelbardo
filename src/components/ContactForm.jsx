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
    // Here you would typically send the form data to a backend server
    console.log('Form submitted:', formData);
    alert('Mensaje enviado. ¡Gracias por contactarnos!');
    setFormData({ name: '', email: '', message: '' }); // Clear form
  };

  return (
    <>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Contacto</h2>
      <p className="text-white text-base font-normal leading-normal pb-3 pt-1 px-4">Visítanos en nuestra tienda o contáctanos para pedidos especiales y consultas.</p>
      <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
        <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#4d4d4d] py-5">
          <p className="text-[#adadad] text-sm font-normal leading-normal">Teléfono</p>
          <p className="text-white text-sm font-normal leading-normal">+1 (555) 123-4567</p>
        </div>
        <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#4d4d4d] py-5">
          <p className="text-[#adadad] text-sm font-normal leading-normal">Correo Electrónico</p>
          <p className="text-white text-sm font-normal leading-normal">info@panelbardo.com</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">Nombre</p>
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#4d4d4d] bg-neutral-800 focus:border-[#4d4d4d] h-14 placeholder:text-[#adadad] p-[15px] text-base font-normal leading-normal"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">Correo Electrónico</p>
            <input
              type="email"
              name="email"
              placeholder="Tu correo electrónico"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#4d4d4d] bg-neutral-800 focus:border-[#4d4d4d] h-14 placeholder:text-[#adadad] p-[15px] text-base font-normal leading-normal"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">Mensaje</p>
            <textarea
              name="message"
              placeholder="Tu mensaje"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#4d4d4d] bg-neutral-800 focus:border-[#4d4d4d] min-h-36 placeholder:text-[#adadad] p-[15px] text-base font-normal leading-normal"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <div className="flex px-4 py-3 justify-start">
          <button
            type="submit"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#141414] text-white text-sm font-bold leading-normal tracking-[0.015em]"
          >
            <span className="truncate">Enviar</span>
          </button>
        </div>
      </form>
    </>
  );
}

export default ContactForm;