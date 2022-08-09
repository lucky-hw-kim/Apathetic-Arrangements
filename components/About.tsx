import Image from 'next/image'
import React from 'react'
import css from '../styles/About.module.css'
import tinyLogo from "../assets/tinyLogo@2x.png"
import flower1 from "../assets/flower1.png"
import flower2 from "../assets/flower2.png"
import flower3 from "../assets/flower3.png"


const About = () => {
  return (
    <div id="about"  className={css.container}>
      <div className={css.heading}>
        About Us
        <div className={css.logo}><Image src={tinyLogo} layout="responsive" alt=""/></div>
      </div>
      <div className={css.aboutUs}>
        Apathetic Arrangements is the perfect flower delivery service for people who wish to send passive-aggressive gifts to people they hate. You can choose from a variety of arrangements, including &quot;Don't get well&quot;, &quot;I don&apos;t give a damn&quot;, and &quot;I couldn't give two fucks&quot;. Now you can show someone you hate that you really couldn't care less about them.
      </div>
      <div className={css.service}>
        <div className={css.serviceLogo}><Image alt="flower" src={flower1} layout="responsive" />
          <span>Designed with spite</span>
        </div>
        <div className={css.serviceLogo}><Image alt="flower2" src={flower2} layout="responsive" />
        <span>Arranged with care</span>
        </div>
        <div className={css.serviceLogo}><Image alt="flower3" src={flower3} layout="responsive" />
        <span>Deliver with speed</span>
        </div>
      </div>
    </div>
  )
}

export default About