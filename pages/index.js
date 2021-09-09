// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LinkedInAuth from '../components/LinkedInAuth'
// require("dotenv/config");

export default function Home() {
  return (
    <div className={styles.container}>
    

      <main className={styles.main}>
       
        <LinkedInAuth/>

       
      </main>
    </div>
  )
}
