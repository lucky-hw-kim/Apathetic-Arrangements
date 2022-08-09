import Image from "../node_modules/next/image"
import css from "../styles/Header.module.css"
import Logo from "../assets/Logo.png"
import Link from "../node_modules/next/link"
import { useStore } from "../store/store"
import { useEffect, useState } from "react"
import { UilReceipt } from "@iconscout/react-unicons"
import { useRouter } from "next/router"

function Header() {
  const [order, setOrder] = useState("")
  useEffect(() => {
    setOrder(localStorage.getItem("order"))
  }, [])
  const state = useStore((state) => state);
  const items = useStore((state) => state.cart.flowers.length)
  const router = useRouter()

  return (
    <div className={css.header}>
      {/* LEFT SIDE */}
      <ul className={css.menu}>
        <li className={css.li}><Link href="/#about">
          ABOUT</Link></li>
        <li><Link href="/#arrangements">SHOP</Link></li>
        <li><Link href="/contact">CONTACT</Link></li>
      </ul>
      {/* CENTER LOGO */}
      <div className={css.logo}>
        <Link href="/">
          <a>
            <Image src={Logo} alt="logo" layout="responsive"
            />
          </a>
        </Link>
      </div>
      {/* RIGHT CART */}
      <ul className={css.menu}>
        <li> <Link href="/cart">CART</Link></li>
        {items !== 0 ?
          <div className={css.badge1}> {items}</div>
          : null
        }
        <li> {order && (
          <Link href={`/order/${order}`}>
            <div className={css.cart}>
              ORDER
              {order != "" && <div className={css.badge2}>
                1
              </div>
              }
            </div>
          </Link>
        )}</li>
      </ul>

    </div>
  )
}

export default Header