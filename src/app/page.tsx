"use client"
import { ListRecentVideosComponent } from "@/components/list-recent-videos.component"
import { useCases } from "@/context/usecase.provider"
import { StoredFile } from "@/core/models/stored-file.model"

import Link from "next/link"
import { useState, useEffect, useCallback } from "react"


export default function Home() {
    return <ListRecentVideosComponent />
  }