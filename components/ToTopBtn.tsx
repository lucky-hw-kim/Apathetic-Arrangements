
import css from "../styles/ToTopBtn.module.css"
import { UilArrowCircleUp } from "@iconscout/react-unicons"
import { useEffect, useState } from "react"

const ToTopBtn = () => {

  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.pageYOffset > 300 ?
        setShowBtn(true) : setShowBtn(false)
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className={css.container}>
      {showBtn && (
        <div className={css.button} onClick={scrollToTop}>
          <UilArrowCircleUp height={45} width={45} />
        </div>
      )}

    </div>
  )
}

export default ToTopBtn