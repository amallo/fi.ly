"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  PieChart,
  Video,
  Upload,
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "./auth/auth.hook"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  projects: [
    {
      name: "Mes videos",
      url: "/videos/mine",
      icon: Video,
    },
    {
      name: "Tableau de bord",
      url: "/dashboard",
      icon: PieChart,
    },
    {
      name: "Nouvelle video",
      url: "/videos/new",
      icon: Upload,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { current } = useAuth()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <p className="ml-2 text-2xl font-bold text-left">fi.ly</p>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        {current && <NavUser user={current} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
