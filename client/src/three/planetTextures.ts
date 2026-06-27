import * as THREE from 'three'
import type { Planet } from '@shared/types'

export function makePlanetTexture(planet: Planet): THREE.CanvasTexture {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  const { render, name } = planet

  if (render.hasStripes) {
    const bands = [
      '#c88b3a',
      '#e8c97a',
      '#a0622a',
      '#d4a855',
      '#8a5520',
      '#e0b860',
      '#b87838',
      '#d4a040',
      '#c07030',
      '#e8d090',
    ]
    const bh = size / bands.length
    bands.forEach((col, i) => {
      ctx.fillStyle = col
      ctx.fillRect(0, i * bh, size, bh + 1)
    })
    ctx.save()
    ctx.translate(size * 0.6, size * 0.55)
    const grs = ctx.createRadialGradient(0, 0, 0, 0, 0, 38)
    grs.addColorStop(0, '#cc2200')
    grs.addColorStop(0.5, '#aa3300')
    grs.addColorStop(1, 'rgba(150,60,20,0)')
    ctx.fillStyle = grs
    ctx.scale(1.8, 1)
    ctx.beginPath()
    ctx.arc(0, 0, 38, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  } else if (name === 'Earth') {
    ctx.fillStyle = '#1a6090'
    ctx.fillRect(0, 0, size, size)
    const continents = [
      { x: 180, y: 160, rx: 70, ry: 55 },
      { x: 280, y: 220, rx: 55, ry: 70 },
      { x: 100, y: 280, rx: 80, ry: 50 },
      { x: 380, y: 180, rx: 40, ry: 60 },
      { x: 420, y: 300, rx: 50, ry: 35 },
    ]
    ctx.fillStyle = '#3a8a4a'
    continents.forEach((cont) => {
      ctx.beginPath()
      ctx.ellipse(cont.x, cont.y, cont.rx, cont.ry, 0, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.fillStyle = '#e8f4ff'
    ctx.fillRect(0, 0, size, 30)
    ctx.fillRect(0, size - 30, size, 30)
    ctx.globalAlpha = 0.35
    ctx.fillStyle = '#ffffff'
    for (let i = 0; i < 20; i++) {
      ctx.beginPath()
      ctx.ellipse(
        Math.random() * size,
        Math.random() * size,
        30 + Math.random() * 50,
        10 + Math.random() * 20,
        Math.random(),
        0,
        Math.PI * 2,
      )
      ctx.fill()
    }
    ctx.globalAlpha = 1
  } else if (name === 'Mars') {
    ctx.fillStyle = '#c1440e'
    ctx.fillRect(0, 0, size, size)
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const r = 10 + Math.random() * 40
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, `rgba(180,50,10,0.4)`)
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  } else if (name === 'Moon') {
    ctx.fillStyle = '#aaaaaa'
    ctx.fillRect(0, 0, size, size)
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const r = 5 + Math.random() * 30
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, 'rgba(60,60,60,0.5)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  } else if (name === 'Saturn' || name === 'Uranus') {
    ctx.fillStyle = render.color
    ctx.fillRect(0, 0, size, size)
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = `rgba(200,170,80,0.15)`
      ctx.fillRect(0, (i / 8) * size, size, size / 16)
    }
  } else if (name === 'Venus') {
    ctx.fillStyle = '#c8a060'
    ctx.fillRect(0, 0, size, size)
    for (let i = 0; i < 12; i++) {
      ctx.fillStyle = 'rgba(240,200,120,0.3)'
      ctx.fillRect(0, (i / 12) * size, size, size / 20)
    }
  } else if (name === 'Neptune') {
    ctx.fillStyle = '#3f54ba'
    ctx.fillRect(0, 0, size, size)
    for (let i = 0; i < 10; i++) {
      ctx.fillStyle = 'rgba(60,80,200,0.2)'
      ctx.fillRect(0, (i / 10) * size, size, size / 15)
    }
  } else {
    ctx.fillStyle = render.color
    ctx.fillRect(0, 0, size, size)
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const r = 5 + Math.random() * 25
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, 'rgba(0,0,0,0.35)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}
