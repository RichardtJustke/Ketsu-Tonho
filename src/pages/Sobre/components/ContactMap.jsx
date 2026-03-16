const ContactMap = () => {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden">
      <iframe
        src="https://maps.google.com/maps?q=Passagem%20S%C3%A3o%20Jo%C3%A3o%2C%2094%2C%20Guam%C3%A1%2C%20Bel%C3%A9m%2C%20PA&t=&z=17&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localização"
      />
    </div>
  )
}

export default ContactMap
