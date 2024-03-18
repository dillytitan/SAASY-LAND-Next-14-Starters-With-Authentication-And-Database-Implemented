'use client'
import Balancer from "react-wrap-balancer"
import Terminal from "../forms/terminal"
export function NewsletterSection(): JSX.Element {
  return (
    <section
      id="newsletter-section"
      aria-label="newsletter section"
      className="w-full bg-background md:py-10"
    >
      <div className="mx-auto flex flex-col items-center justify-center md:gap-8 md:px-4">
        <img src="/orange-cube-main.png" alt="Your GIF" className="mb-2 hidden md:flex" />

        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              <span className=" hidden px-4 pt-4 font-michroma md:flex">
                ORANGE CUBE
              </span>
            </Balancer>
          </h2>
          <h3 className="hidden text-muted-foreground sm:text-xl sm:leading-8 md:max-w-[42rem]">
            <Balancer>
              Preserving artifacts, defining contemporary.
            </Balancer>
          </h3>
        </div>

        <div className="hidden w-full max-w-lg items-center justify-center md:flex md:max-w-xl">
        
        
          {/* <NewsletterSignUpForm /> */}
        </div>
      
  <Terminal />

      </div>
    </section>
  )
}
