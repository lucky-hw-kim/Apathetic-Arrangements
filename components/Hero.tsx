import Image from "next/image"
import css from "../styles/Hero.module.css"
import heroImg from "../assets/Hero@4x.png"
const Hero = () => {
  return (

      <div className={css.container}>
        {/* Left Image */}
        <div className={css.heroImg}>
          <Image src={heroImg} layout="responsive"/>
        </div>
        {/* Right slogan */}
        <div className={css.slogan}>
          <span>Show them</span>
          <span>your</span>
          <span>TRUE</span>
          <span>feelings</span>
        </div>
      </div>

  )
}

export default Hero