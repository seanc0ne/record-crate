import React, { useRef, useEffect, useState } from 'react'
import Playlists from './Playlists'

const Categories = () => {
  const [limiter, setLimiter] = useState(0)
  const mainInnerRef = useRef()
  const dataCategories = [
    {
      id: 1,
      name: 'Annual',
      tagline: 'The best of any given year in your crate.',
    },
    {
      id: 2,
      name: 'Style',
      tagline: 'Electro-disco? Proto-disco? Pick your style.',
    },
    {
      id: 3,
      name: 'Tagged',
      tagline: 'Generate playlist based on your own tags.',
    },
    {
      id: 4,
      name: 'Gig',
      tagline: 'Manually create a potential playlist for your next gig.'
    },
  ]

  useEffect(() => {
    // function
    const handleWindowResize = () => {
      // calculation
      const calculation = Math.floor(
        mainInnerRef.current.getBoundingClientRect().width / 195
      )

      setLimiter(calculation)
    }

    handleWindowResize()

    // assign event listener
    window.addEventListener('resize', handleWindowResize)

    // remove event listener
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return (
    <div className="mainInner" ref={mainInnerRef}>
      {dataCategories.map((category, id) => (
        <div className="cardsWrap" key={id}>
          <h2>{category.name}</h2>
          {/* <span className="seeAll">SEE ALL</span> */}
          <p className="subText">{category.tagline}</p>
          <Playlists category_id={category.id} limiter={limiter} />
        </div>
      ))}
    </div>
  )
};

export default Categories;