"use client"

import { MeshGradient } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full min-h-[90vh] overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Background Shader - warm beige/orange gradient */}
      <div className="absolute inset-0 z-0">
      <MeshGradient
          colors={[
            "#faf8f5",  // colorBack - Light beige background
            "#fbbf8a",  // colorFront - Softer peach-orange
            "#f5a06a",  // colorAccent - Muted coral
            "#f5f0e6",  // color2 - Warm beige secondary
            "#fcd4a8",  // color3 - Very light peach
            "#f5b08a"   // color4 - Soft peach
          ]}
          speed={isActive ? 0.3 : 0.15}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      {/* Vignette overlay - lighter in center for text readability */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% 35%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.15) 85%)`
        }}
      />

      {/* Content above shader */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  )
}
