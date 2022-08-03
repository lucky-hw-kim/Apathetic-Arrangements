import css from "../styles/Footer.module.css"
import { UilFacebook, UilInstagram, UilLinkedin } from "@iconscout/react-unicons"
import Image from "../node_modules/next/image"
import Logo from "../assets/Logo.png"

const Footer = () => {
  return (
    <div className={css.footer}>
      <span className={css.hLine}></span>
      <span>ALL RIGHT RESERVED</span>
      <div className={css.social}>
        <UilInstagram />
        <UilFacebook />
        <UilLinkedin />
      </div>
      <div className={css.logo}>
      <Image src={Logo} alt="logo" layout="responsive" 
        />
      </div>
    </div>
  )
}

export default Footer