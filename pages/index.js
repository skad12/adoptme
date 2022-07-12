import Head from "next/head";
import Search from "../components/Search";


function Adoptme () {

    return (
        <>
       
<Head>
  <title>Adopt Me!</title>
  <link rel="icon" href="/favicon.ico" />
      </Head>

        <div  className=" antialiased pt-68 bg-cover" style={{ backgroundImage:  `url("https://images.pexels.com/photos/3895275/pexels-photo-3895275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`}}>
        <div className="text-8xl px-16 pt-10 text-gray-200 font-mono font-bold ">Adopt Me!</div>
        <Search/>
        </div>

        </>
    )
}


export default Adoptme;