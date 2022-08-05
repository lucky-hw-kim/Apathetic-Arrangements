import Image from "../node_modules/next/image"
import css from "../styles/Header.module.css"
import Logo from "../assets/Logo.png"
import Link from "../node_modules/next/link"
import { useStore } from "../store/store"

function Header() {
  const state = useStore((state) => state);
  const items = useStore((state) => state.cart.flowers.length)

  return (
    <div className={css.header}>
      {/* LEFT SIDE */}
      <ul className={css.menu}>
        <li><Link href="#about">ABOUT</Link> </li>
        <li>SHOP</li>
        <li>CONTACT</li>
      </ul>
      {/* CENTER LOGO */}
      <div className={css.logo}>
        <Link href="/">
        <Image src={Logo} alt="logo" layout="responsive" 
        />
        </Link>
      </div>
      {/* RIGHT CART */}
      <ul className={css.menu}>
        <li>SEARCH</li>
        <li> <Link href="/cart">CART</Link> </li>
        <div className={css.badge}>{items}</div>
      </ul>
    </div>
  )
}

export default Header