'use client'
import Balancer from "react-wrap-balancer"
import JoinDiscordButton from "../ui/join-discord"
import Terminal from "../forms/terminal"
export function NewsletterSection(): JSX.Element {
  return (
    <section
      id="newsletter-section"
      aria-label="newsletter section"
      className="w-full bg-background py-16"
    >
      <div className="flex max-w-6xl flex-col items-center justify-center gap-8 md:px-4 mx-auto">
        <img src="/orange-cube-main.png" alt="Your GIF" className="md:flex mb-2 hidden" />

        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <Balancer>
              <span className=" bg-orange-500 px-4">
                ORANGE CUBE
              </span>
            </Balancer>
          </h2>
          <h3 className="max-w-[42rem] text-muted-foreground sm:text-xl sm:leading-8">
            <Balancer>
              Preserving artifacts, defining contemporary.
            </Balancer>
          </h3>
        </div>

        <div className="md:flex w-full max-w-lg items-center justify-center hidden md:max-w-xl">
        <JoinDiscordButton inviteLink="https://discord.gg/4RvS8ZwRcj" />
        
          {/* <NewsletterSignUpForm /> */}
        </div>
        <div className="w-full">
        <Terminal />
        </div>
      </div>
    </section>
  )
}
