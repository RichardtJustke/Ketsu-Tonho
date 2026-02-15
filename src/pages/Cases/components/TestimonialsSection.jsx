const TestimonialsSection = () => {
  const testimonials = [
    {
      rating: '5 out of 5 Rating',
      stars: 5,
      text: '"Absolutely revolutionary! I can track my expenses effortlessly, making budgeting incredibly easy and manageable for anyone who truly wants to take"',
      name: 'Max Cole',
      role: 'Architect',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      rating: '4.8 out of 5 Rating',
      stars: 5,
      text: '"The interface is incredibly user-friendly, making budgeting a total breeze for everyone, regardless of their experience level or background, and truly enjoyable"',
      name: 'Leo Park',
      role: 'Property Manager, NY',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
    },
    {
      rating: '4.9 out of 5 Rating',
      stars: 5,
      text: '"I love how financial goals at a quick glance, presented clearly and effectively, which keeps me motivated to achieve them all, every single time without fail!"',
      name: 'Sam Lee',
      role: 'Homeowner, Brooklyn',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
    },
    {
      rating: '4.7 out of 5 Rating',
      stars: 5,
      text: '"The best app I\'ve ever used for managing my finances efficiently and effectively. I highly recommend it to everyone I know and trust wholeheartedly, without hesitation!"',
      name: 'Tom Fox',
      role: 'First-Time Homeowner',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
    },
    {
      rating: '4.5 out of 5 Rating',
      stars: 4.5,
      text: '"This app completely changed how I manage my money. Everything is so simple now. This app completely changed how I manage my money. Everything is so simple now."',
      name: 'Jay Kim',
      role: '8502 Preston Rd. Inglewood',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop'
    },
    {
      rating: '4.5 out of 5 Rating',
      stars: 4.5,
      text: '"This app completely changed how I manage my money. Everything is so simple now. This app completely changed how I manage my money. Everything is so simple now."',
      name: 'Ray Cho',
      role: 'Homeowner, Long Island',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=1974&auto=format&fit=crop'
    },
    {
      rating: '4.8 out of 5 Rating',
      stars: 5,
      text: '"An essential tool for anyone looking to take control of their finances effectively and confidently, without any hassle or confusion whatsoever, truly a must-have resource!"',
      name: 'Lucas Brown',
      role: 'Conditioning Repair',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=2070&auto=format&fit=crop'
    },
    {
      rating: '4.9 out of 5 Rating',
      stars: 5,
      text: '"Fantastic features that help me save more and spend wisely every single month, truly impressive and beneficial for my financial well-being overall, without a doubt, I must say!"',
      name: 'Olivia White',
      role: 'Air Quality Solutions',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop'
    },
    {
      rating: '4.5 out of 5 Rating',
      stars: 4.5,
      text: '"This app has made me much more aware of my spending habits. It is very helpful indeed and quite insightful for my budgeting efforts overall, I must honestly say, and I appreciate it!"',
      name: 'Eva Brooks',
      role: 'HVAC System Tune-Up',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop'
    },
    {
      rating: '4.6 out of 5 Rating',
      stars: 4.5,
      text: '"Great app! I really appreciate the budgeting tools and reminders. Keep up the great work and continuous innovation to enhance user experience overall, always striving!"',
      name: 'Ethan Young',
      role: 'HVAC Repair',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=2070&auto=format&fit=crop'
    },
    {
      rating: '4.7 out of 5 Rating',
      stars: 5,
      text: '"User-friendly and effective! My financial health has improved significantly over time, and I feel truly empowered to make much better financial decisions, every single day!"',
      name: 'Isabella Martinez',
      role: 'Conditioning Repair',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop'
    },
    {
      rating: '5 out of 5 Rating',
      stars: 5,
      text: '"From booking to installation, the Heatfix team was friendly, knowledgeable, and efficient. My new HVAC system works perfectly."',
      name: 'Liam Johnson',
      role: 'Architect',
      avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1998&auto=format&fit=crop'
    }
  ]

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    return (
      <div className="flex gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#FF5F1F" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0L10.3 5.3L16 6.2L12 10.1L12.9 16L8 13.3L3.1 16L4 10.1L0 6.2L5.7 5.3L8 0Z"/>
          </svg>
        ))}
        {hasHalfStar && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#FF5F1F" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="halfStar">
                <stop offset="50%" stopColor="#FF5F1F"/>
                <stop offset="50%" stopColor="#E0E0E0"/>
              </linearGradient>
            </defs>
            <path d="M8 0L10.3 5.3L16 6.2L12 10.1L12.9 16L8 13.3L3.1 16L4 10.1L0 6.2L5.7 5.3L8 0Z" fill="url(#halfStar)"/>
          </svg>
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <svg key={`empty-${i}`} width="16" height="16" viewBox="0 0 16 16" fill="#E0E0E0" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0L10.3 5.3L16 6.2L12 10.1L12.9 16L8 13.3L3.1 16L4 10.1L0 6.2L5.7 5.3L8 0Z"/>
          </svg>
        ))}
      </div>
    )
  }

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Grid de depoimentos - 4 colunas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-[#F7F7F8] rounded-2xl p-5 flex flex-col"
            >
              {/* Rating stars e texto */}
              <div className="flex items-center justify-between mb-3">
                <StarRating rating={testimonial.stars} />
              </div>
              
              <p className="text-[#333333] opacity-80 text-xs mb-3">
                {testimonial.rating}
              </p>

              {/* Review text */}
              <p className="text-black font-medium text-sm leading-relaxed mb-4 flex-grow">
                {testimonial.text}
              </p>

              {/* User info */}
              <div className="flex items-center gap-3 pt-3 border-t border-black/5">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-black text-xs uppercase">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#333333] opacity-80 text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
