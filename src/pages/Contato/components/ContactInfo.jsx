const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <div>
        <span className="font-medium text-black">Endereço:</span>
        <p className="text-[#333333] opacity-80 text-sm mt-1">....</p>
      </div>
      <div>
        <span className="font-medium text-black">Email de suporte:</span>
        <p className="text-[#333333] opacity-80 text-sm mt-1">....</p>
      </div>
      <div>
        <span className="font-medium text-black">WhatsApp:</span>
        <a href="https://wa.me/5591989045318" target="_blank" rel="noopener noreferrer" className="text-[#333333] opacity-80 text-sm mt-1 block hover:text-[#25D366] transition-colors">(91) 98904-5318</a>
      </div>
    </div>
  )
}

export default ContactInfo
