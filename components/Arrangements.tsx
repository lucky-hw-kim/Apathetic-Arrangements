import css from "../styles/Arrangements.module.css"
import tinyLogo from "../assets/tinyLogo@2x.png"
import Image from "next/image"

const Arrangements = () => {
  return (
    <div className={css.container}>
      <div className={css.heading}>
        Arrangements
        <div className={css.tinyLogo}>
          <Image src={tinyLogo} layout="responsive"/>
        </div>
      </div>
      <div className={css.arrangements}>
        
      </div>
    </div>
  )
}

export default Arrangements