'use client'
import Balancer from "react-wrap-balancer"
// import Terminal from "../forms/terminal"
export function NewsletterSection(): JSX.Element {
  return (
    <section
      id="newsletter-section"
      aria-label="newsletter section"
      className="w-full bg-background md:py-10 min-h-screen"
    >
      <div className="mx-auto flex flex-col md:justify-center md:items-center md:gap-8 md:px-4 min-h-screen pt-8">
        <img src="/orange-cube-main.png" alt="Your GIF" className="mb-2 md:flex md:max-w-3xl" />

        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              <span className="px-4 pt-6 font-michroma md:flex text-3xl md:text-7xl">
                ORANGE CUBE
              </span>
            </Balancer>
          </h2>
          <h3 className="text-muted-foreground sm:text-xl sm:leading-8 md:max-w-[42rem]">
            <Balancer>
              Preserving artifacts, defining contemporary.
            </Balancer>
          </h3>
        </div>

        <div className=" w-full max-w-lg items-center justify-center md:flex md:max-w-xl">
        
        
          {/* <NewsletterSignUpForm /> */}
        </div>
      
  {/* <Terminal /> */}

      </div>
    </section>
  )
}
