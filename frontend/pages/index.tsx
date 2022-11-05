import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import CustomNavbar from "../components/CustomNavbar";
import CustomFooter from "../components/CustomFooter"
import CustomHero from "../components/CustomHero"


export default function Home() {
  return (
    <div>
      <CustomNavbar />
      <CustomHero />
      <CustomFooter />
    </div>
  )
}
