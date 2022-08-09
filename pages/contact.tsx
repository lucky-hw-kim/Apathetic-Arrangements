import Image from "next/image"
import Layout from "../components/Layout"
import css from "../styles/contact.module.css"
import bg from "../assets/bg.jpg"
import { UilMapMarker, UilEnvelope, UilPhone, UilFacebook, UilInstagram, UilLinkedin } from "@iconscout/react-unicons"
const contact = () => {
  return (
    <Layout>
      <div className={css.container}>
        <div className={css.left}>
          <Image alt="" src={bg} objectFit="cover" layout="intrinsic" />
        </div>
        <div className={css.right}>
          <div className={css.heading}>
            Contact Us
          </div>
          <div className={css.body}>
            <div className={css.line}>
              <UilMapMarker />
              <span>777 Apathetic Ave, &nbsp;Arrangements,&nbsp;BC&nbsp;Canada </span>
            </div>
            <div className={css.line}>
              <UilEnvelope />
              <span>apathetic_arrangements@gmail.com</span>
            </div>
              <div className={css.line}>
              <UilPhone />
              <span>+1 778 777 7777</span>
            </div>
            <div className={css.social}>
              <div>Follow Us</div>
              <div className={css.icons}>
              <UilInstagram width={40} height={40}/>
              <UilFacebook width={40} height={40}/>
              <UilLinkedin width={40} height={40}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default contact