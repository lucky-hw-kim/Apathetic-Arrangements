import Image from "../node_modules/next/image"
import css from "../styles/Header.module.css"
import Logo from "../assets/Logo.png"
import Link from "../node_modules/next/link"

function Header() {
  return (
    <div className={css.header}>
      {/* LEFT SIDE */}
      <ul className={css.menu}>
        <li>ABOUT</li>
        <li>SHOP</li>
        <li>CONTACT</li>
      </ul>
      {/* CENTER LOGO */}
      <div className={css.logo}>
        <Image src={Logo} alt="logo" layout="responsive" 
        />
      </div>
      {/* RIGHT CART */}
      <ul className={css.menu}>
        <li>SEARCH</li>
        <li> <Link href="/cart">CART</Link> </li>
        <div className={css.badge}>1</div>
      </ul>
    </div>
  )
}

export default Header