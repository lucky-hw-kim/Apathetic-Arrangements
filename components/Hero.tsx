import Image from "next/image"
import css from "../styles/Hero.module.css"
import heroImg from "../assets/Hero@4x.png"
import Link from "next/link"

const Hero = () => {
  return (

      <div id="hero" className={css.container}>
        {/* Left Image */}
        <div className={css.heroImg}>
          <Image src={heroImg} layout="responsive" alt=""/>
        </div>
        {/* Right slogan */}
        <div className={css.slogan}>
          <span>Show them your</span>
          <span className={css.true}>TRUE<span> feelings</span></span>
          <div className={css.detailSlogan}>Want to tell them how much you hate, despise and not happy with them?</div>
          <div className={css.detailSlogan}>No matter the apathetic message you want to share, we have a bouquet for you.</div>
        <Link href="#arrangements">
        <button className={css.btn}>Order Now</button>
        </Link>
        </div>
      </div>

  )
}

export default Hero