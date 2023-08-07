"use client";
import Image from "next/image";
import { Sacramento, Open_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import GuestTable from "@/components/guestTable";
import { motion, useAnimationControls } from "framer-motion";

const greatVibesFont = Sacramento({
  weight: "400",
  subsets: ["latin"],
  variable: "--great-vibes",
  display: "swap",
});

const openSansFont = Open_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--open-sans",
  display: "swap",
});

const timeTable = [
  {
    time: "od 17:00",
    event: "VILLA GALA",
    location: "Gala 67A, 21241, Obrovac Sinjski",
  },
];

export default function Home() {
  const topControls = useAnimationControls();
  const botControls = useAnimationControls();
  const pozadinaControls = useAnimationControls();
  const inviteControls = useAnimationControls();
  const [hasStarted, setHasStarted] = useState(true);
  const [openNow, setOpenNow] = useState(false);

  const [animationStarted, setanimationStarted] = useState(false);

  function playOpeningAnimation() {
    if (animationStarted) return;
    setanimationStarted(true);
    document.body.scrollTop = 0;
    setHasStarted(false);
    pozadinaControls.start({
      y: ["-120px", "-200px", "-250px"],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    });
    topControls
      .start({
        rotateX: 180,
        y: ["0px", "10px", "20px", "30px", "60px", "100px"],
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
        transitionEnd: {
          position: "relative",
          zIndex: 0,
        },
      })
      .then(() => {
        pozadinaControls.start({
          y: ["-250px", "1200px"],
          transition: {
            duration: 2,
            ease: "easeInOut",
          },
        });
        topControls.start({
          y: ["100px", "1200px"],
          transition: {
            duration: 2,
            ease: "easeInOut",
          },
        });
        botControls
          .start({
            y: ["0px", "200px", "1200px"],
            transition: {
              duration: 2,
              ease: "easeInOut",
            },
          })
          .then(() => {
            botControls.start({
              display: "none",
            });
            topControls.start({
              display: "none",
            });
            pozadinaControls.start({
              display: "none",
            });
            document.body.style.overflowY = "auto";
          });
        inviteControls.start({
          scale: [0.8, 0.85, 0.9, 0.92, 1],
          transition: {
            duration: 2,
          },
        });
      });
  }

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = "hidden";
    inviteControls.start({
      scale: [0.8],
    });
    topControls.start({
      rotateX: [5, 20, 5, 20, 5, 20, 5],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    });
    setTimeout(() => {
      setOpenNow(true);
    }, 1500);
  }, []);

  useEffect(() => {
    if (openNow) {
      playOpeningAnimation();
    }
  }, [openNow]);

  return (
    <main
      className={`${greatVibesFont.className} ${greatVibesFont.variable} ${openSansFont.className} bg-white w-screen min-h-screen `}
    >
      {/* A self opening wedding envelope */}
      <div
        style={{
          minWidth: "370px",
          maxWidth: "600px",
          background: "white",
          position: "relative",
          margin: "auto",
        }}
        onClick={() => {
          setOpenNow(true);
        }}
      >
        <motion.div animate={topControls} className="z-20 relative">
          <div className="absolute top-0 left-0 w-full ">
            <img
              src="/images/vrh.svg"
              alt="envelope"
              className="w-full scale-95"
            />
          </div>
        </motion.div>

        <motion.div animate={botControls} className="z-30 relative">
          <div className="absolute top-0 left-0 w-full ">
            <img
              src="/images/dno.svg"
              alt="envelope"
              className="w-full  scale-95"
            />
          </div>
        </motion.div>
        <motion.div animate={pozadinaControls} className="z-0 relative">
          <div className="absolute top-[-50px] left-0 w-full ">
            <img
              src="/images/pozadina.svg"
              alt="envelope"
              className="w-full  scale-95"
            />
          </div>
        </motion.div>
      </div>

      {/* The actual invitation */}
      <motion.div
        animate={inviteControls}
        className={`${hasStarted ? "scale-90" : ""}`}
      >
        <div
          className={
            "flex flex-col h-100 mx-auto shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] shadow-slate-400  relative"
          }
          style={{
            minWidth: "400px",
            maxWidth: "600px",
            background: "white",
            zIndex: 10,
          }}
        >
          <div>
            <Image
              src="/images/maslina_top2.png"
              alt="hero"
              width={600}
              height={600}
            />
          </div>
          <div
            className="text-6xl w-100 flex flex-col justify-center items-center m-24 mb-10 gap-6"
            style={{ marginTop: "-5px" }}
          >
            <h1 className="font-vibes">Margarita</h1>
            <p
              style={{
                fontSize: "20px",
                marginLeft: "40px",
                marginTop: "10px",
              }}
            >
              i
            </p>
            <h1 className="font-vibes" style={{ marginTop: "-40px" }}>
              Mario
            </h1>
          </div>
          <div className=" w-100 flex flex-col justify-center items-center gap-6">
            <p
              className="font-sans"
              style={{
                color: "#333",
                fontWeight: "400",
                letterSpacing: "0.05em",
                fontSize: "15px",
              }}
            >
              pozivaju Vas na vjenčanje
            </p>
          </div>
          <div className="w-100 flex flex-col justify-center items-center  m-10">
            <h1
              className="font-sans"
              style={{
                fontWeight: "700",
                letterSpacing: "0.15em",
                fontSize: "1.21em",
              }}
            >
              SUBOTA, 30.09.2023.
            </h1>
          </div>

          <GuestTable timeTable={timeTable} />
          <div>
            <Image
              src="/images/maslina_bottom.png"
              alt="hero"
              width={600}
              height={600}
            />
          </div>
        </div>
      </motion.div>
    </main>
  );
}
