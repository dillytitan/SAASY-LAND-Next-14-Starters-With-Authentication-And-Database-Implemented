import Link from "next/link"
import { auth } from "@/auth"
import Image from "next/image"
import { siteConfig } from "@/config/site"
// import { cn } from "@/lib/utils"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { buttonVariants } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { SignOutButton } from "@/components/auth/signout-button"
// import { Icons } from "@/components/icons"
// import { Navigation } from "@/components/nav/navigation"
// import { NavigationMobile } from "@/components/nav/navigation-mobile"
import { ThemeToggle } from "@/components/theme-toggle"
import JoinDiscordButton from "../ui/join-discord"

export async function Header(): Promise<JSX.Element> {
  const session = await auth()

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full bg-transparent">
      <div className="container flex items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center justify-center gap-8 text-lg font-bold tracking-wide transition-all duration-300 ease-in-out"
        >
          <Image src="/orangecube-logo.png" width={30} height={30} alt="logo" />
          <span className="hidden font-michroma md:flex">{siteConfig.name}</span>
        </Link>
        {/* <Navigation navItems={siteConfig.navItems} /> */}
        <div className="flex items-center justify-center gap-x-2 md:gap-x-4">
     
        <JoinDiscordButton inviteLink="https://discord.gg/orangecube" />
          <ThemeToggle />
          
          {/* <NavigationMobile navItems={siteConfig.navItems} /> */}

          {/* <nav className="space-x-1">
            {session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className={cn(
                    buttonVariants({ variant: "user", size: "icon" }),
                    "transition-all duration-300 ease-in-out hover:opacity-70"
                  )}
                >
                  <Avatar className="size-9">
                    {session?.user.image ? (
                      <AvatarImage
                        src={session?.user.image}
                        alt={session?.user.name ?? "user's profile picture"}
                        className="size-7 rounded-full"
                      />
                    ) : (
                      <AvatarFallback className="size-9 cursor-pointer p-1.5 text-xs capitalize">
                        <Icons.user className="size-5 rounded-full" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session?.user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild disabled>
                      <Link href="/dashboard/account">
                        <Icons.avatar
                          className="mr-2 size-4"
                          aria-hidden="true"
                        />
                        Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild disabled>
                      <Link href="/dashboard/settings">
                        <Icons.settings
                          className="mr-2 size-4"
                          aria-hidden="true"
                        />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                aria-label="Connect Wallet"
                href="/signup"
                className={cn(buttonVariants({ size: "sm" }), "ml-2")}
              >
                Connect Wallet
                <span className="sr-only">Connect Wallet</span>
              </Link>
            )}
          </nav> */}
        </div>
      </div>
    </header>
  )
}
