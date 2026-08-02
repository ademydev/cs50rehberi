// Main JS for interactivity: burger menu, accordion, counters, reveal on scroll, back-to-top

// DOM helpers
const $ = (s, el=document) => el.querySelector(s)
const $$ = (s, el=document) => Array.from(el.querySelectorAll(s))

// Loader
window.addEventListener('load', ()=>{
  const loader = $('#page-loader')
  if(loader){
    setTimeout(()=>{loader.style.opacity = '0'; loader.style.pointerEvents='none'; loader.remove(); revealOnScroll(); startCounters();},600)
  } else {
    revealOnScroll(); startCounters();
  }
})

// Burger menu (mobile)
const burger = $('#burger')
const navLinks = $('#nav-links')
if(burger){
  burger.addEventListener('click', ()=>{
    navLinks.classList.toggle('open')
    burger.classList.toggle('open')
  })
}

// Active navbar on scroll
const navItems = $$('.nav-link')
const sections = ['home','about','contents','learn','instructor','faq'].map(id=>document.getElementById(id))
window.addEventListener('scroll', ()=>{
  const top = window.scrollY + 120
  sections.forEach((sec, i)=>{
    if(!sec) return
    const rect = sec.offsetTop
    const h = sec.offsetHeight
    if(top >= rect && top < rect + h){
      navItems.forEach(it=>it.classList.remove('active'))
      if(navItems[i]) navItems[i].classList.add('active')
    }
  })
})

// Accordion
$$('.accordion .accordion-item').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    btn.classList.toggle('active')
    const panel = btn.nextElementSibling
    if(panel.style.maxHeight){
      panel.style.maxHeight = null
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px'
    }
  })
})

// Back to top
const toTop = $('#to-top')
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 400) toTop.style.display='block'; else toTop.style.display='none'
})
if(toTop) toTop.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}))

// Counters
function startCounters(){
  $$('.counter').forEach(el=>{
    const target = +el.dataset.target
    let curr = 0
    const step = Math.max(1, Math.floor(target/120))
    const timer = setInterval(()=>{
      curr += step
      if(curr >= target){el.textContent = target; clearInterval(timer)} else el.textContent = curr
    },10)
  })
}

// Reveal on scroll
function revealOnScroll(){
  const reveals = $$('.reveal')
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible')
        obs.unobserve(entry.target)
      }
    })
  },{threshold:0.15})
  reveals.forEach(r=>obs.observe(r))
}

// Smooth scroll for nav links close mobile nav
$$('.nav-link').forEach(link=>{
  link.addEventListener('click', ()=>{
    navLinks.classList.remove('open')
    burger.classList.remove('open')
  })
})

// Simple intersection observer to lazy highlight when page loads
revealOnScroll()

// small accessibility: allow panels to be toggled with Enter/Space
$$('.accordion .accordion-item').forEach(btn=>{
  btn.setAttribute('tabindex','0')
  btn.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); btn.click() }
  })
})
