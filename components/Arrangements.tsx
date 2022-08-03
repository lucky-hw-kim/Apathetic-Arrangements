import css from "../styles/Arrangements.module.css"
import tinyLogo from "../assets/tinyLogo@2x.png"
import Image from "next/image"
import Link from "next/link"
import {urlFor} from "../lib/client"

const Arrangements = ({flowers}) => {

  return (
    <div className={css.container}>
      <div className={css.heading}>
        Arrangements
        <div className={css.tinyLogo}>
          <Image src={tinyLogo} layout="responsive"/>
        </div>
      </div>
      <div className={css.arrangements}>
        {flowers.map((flower: any, id: string) => {
            const src = urlFor(flower.image).url();
          return (
            <div className={css.flower} key={id}>
              <Link href={`./flower/${flower.slug.current}`}>
                <div className={css.imageWrapper}>
                  <Image loader={()=>src} src={src} alt="flower" layout="fill" objectFit="cover" unoptimized/>
                </div>
              </Link>
              <span>{flower.name}</span>
              <span>
                <span style={{color:"var(--themeRed)"}}>$ </span>
                {flower.price[1]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Arrangements