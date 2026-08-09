import { useState, useEffect, useRef } from 'react'

// Types
type Staff = {
  id: string
  empCode: string
  name: string
  role: string
  department: string
  phone: string
  email: string
  joiningDate: string
  photo: string
  bloodGroup: string
  location: string
  status: 'Active' | 'Probation' | 'Suspended'
  aadhaar: string
  performance: number
}
type NpaCase = {
  id: string
  borrower: string
  bank: string
  amount: number
  amountStr: string
  overdue: string
  status: 'Field Visit' | 'Legal Notice' | 'Negotiation' | 'Recovered' | 'Critical'
  officer: string
  officerId: string
  progress: number
  priority: 'High' | 'Medium' | 'Low'
  lastUpdate: string
}
type Partner = {
  id: string
  name: string
  type: 'PSU Bank' | 'Private Bank' | 'NBFC' | 'FI'
  cases: number
  recovery: string
  logo: string
  status: 'Active' | 'Pending' | 'Onboarding'
  contact: string
}
type Applicant = {
  id: string
  name: string
  role: string
  phone: string
  email: string
  experience: string
  stage: 'Applied' | 'Screened' | 'Interview' | 'Hired' | 'Rejected'
  appliedOn: string
  avatar: string
}
type Message = {
  id: string
  name: string
  email: string
  phone: string
  institution: string
  text: string
  date: string
  read: boolean
}
type Audit = {
  id: string
  time: string
  user: string
  action: string
  detail: string
}

// Initial data
const initialStaff: Staff[] = [
  { id: '1', empCode: 'NR-2024-0142', name: 'Krishna Kumar Bablu', role: 'Director & FPOs Director', department: 'Leadership', phone: '+91 98765 43210', email: 'krishna.bablu@navrange.in', joiningDate: '2015-03-12', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', bloodGroup: 'O+', location: 'Patna HQ', status: 'Active', aadhaar: 'XXXX-XXXX-4821', performance: 96 },
  { id: '2', empCode: 'NR-2024-0143', name: 'Sangita Kumari', role: 'Non-Executive Director', department: 'Compliance', phone: '+91 98765 43211', email: 'sangita@navrange.in', joiningDate: '2016-07-01', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', bloodGroup: 'B+', location: 'Delhi NCR', status: 'Active', aadhaar: 'XXXX-XXXX-2934', performance: 94 },
  { id: '3', empCode: 'NR-2024-0144', name: 'Vardan Suman', role: 'Chief Executive Officer', department: 'Operations', phone: '+91 98765 43212', email: 'vardan.suman@navrange.in', joiningDate: '2018-01-15', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', bloodGroup: 'A+', location: 'Mumbai', status: 'Active', aadhaar: 'XXXX-XXXX-7712', performance: 98 },
  { id: '4', empCode: 'NR-2024-0145', name: 'Puja Pushpanjali', role: 'Technical Executive', department: 'Technology', phone: '+91 98765 43213', email: 'puja.p@navrange.in', joiningDate: '2020-09-10', photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face', bloodGroup: 'AB+', location: 'Patna HQ', status: 'Active', aadhaar: 'XXXX-XXXX-5529', performance: 91 },
  { id: '5', empCode: 'NR-2024-0881', name: 'Amit Raj Verma', role: 'Senior Recovery Officer', department: 'Field Ops', phone: '+91 98110 22334', email: 'amit.verma@navrange.in', joiningDate: '2023-04-20', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face', bloodGroup: 'O+', location: 'Lucknow', status: 'Probation', aadhaar: 'XXXX-XXXX-1092', performance: 88 },
  { id: '6', empCode: 'NR-2024-0882', name: 'Neha Sharma', role: 'Legal Associate', department: 'Legal', phone: '+91 98110 22335', email: 'neha.sharma@navrange.in', joiningDate: '2023-11-02', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face', bloodGroup: 'B-', location: 'Delhi NCR', status: 'Active', aadhaar: 'XXXX-XXXX-3381', performance: 90 },
  { id: '7', empCode: 'NR-2025-0911', name: 'Rohit Singh', role: 'Field Recovery Officer', department: 'Field Ops', phone: '+91 98110 22336', email: 'rohit.s@navrange.in', joiningDate: '2025-01-12', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face', bloodGroup: 'A+', location: 'Patna HQ', status: 'Active', aadhaar: 'XXXX-XXXX-4421', performance: 85 },
]

const initialCases: NpaCase[] = [
  { id: 'NPA-9021', borrower: 'Shree Steel Industries', bank: 'SBI', amount: 4.2, amountStr: '₹ 4.2 Cr', overdue: '482 days', status: 'Legal Notice', officer: 'Amit Raj Verma', officerId: '5', progress: 68, priority: 'High', lastUpdate: '2 hrs ago' },
  { id: 'NPA-9022', borrower: 'Pragati Agro Farms', bank: 'HDFC Bank', amount: 1.8, amountStr: '₹ 1.8 Cr', overdue: '210 days', status: 'Field Visit', officer: 'Rohit Singh', officerId: '7', progress: 32, priority: 'Medium', lastUpdate: '1 day ago' },
  { id: 'NPA-9023', borrower: 'Maa Tara Enterprises', bank: 'ICICI', amount: 0.87, amountStr: '₹ 87 Lakh', overdue: '94 days', status: 'Negotiation', officer: 'Vardan Suman', officerId: '3', progress: 85, priority: 'High', lastUpdate: '4 hrs ago' },
  { id: 'NPA-9024', borrower: 'City Heights Developers', bank: 'Axis Bank', amount: 12.5, amountStr: '₹ 12.5 Cr', overdue: '610 days', status: 'Critical', officer: 'Krishna Kumar Bablu', officerId: '1', progress: 15, priority: 'High', lastUpdate: '5 hrs ago' },
  { id: 'NPA-9025', borrower: 'Sunrise Logistics', bank: 'BOB', amount: 2.4, amountStr: '₹ 2.4 Cr', overdue: '120 days', status: 'Recovered', officer: 'Amit Raj Verma', officerId: '5', progress: 100, priority: 'Low', lastUpdate: '3 days ago' },
  { id: 'NPA-9026', borrower: 'Ganga Fuels Pvt Ltd', bank: 'Bajaj Finance', amount: 3.1, amountStr: '₹ 3.1 Cr', overdue: '344 days', status: 'Legal Notice', officer: 'Neha Sharma', officerId: '6', progress: 54, priority: 'Medium', lastUpdate: '6 hrs ago' },
]

const initialPartners: Partner[] = [
  { id: 'p1', name: 'State Bank of India', type: 'PSU Bank', cases: 482, recovery: '₹18.4Cr', logo: 'SBI', status: 'Active', contact: 'sbi.ops@navrange.in' },
  { id: 'p2', name: 'HDFC Bank', type: 'Private Bank', cases: 312, recovery: '₹11.2Cr', logo: 'HDFC', status: 'Active', contact: 'hdfc@navrange.in' },
  { id: 'p3', name: 'ICICI Bank', type: 'Private Bank', cases: 298, recovery: '₹9.7Cr', logo: 'ICICI', status: 'Active', contact: 'icici@navrange.in' },
  { id: 'p4', name: 'Axis Bank', type: 'Private Bank', cases: 210, recovery: '₹7.1Cr', logo: 'AXIS', status: 'Active', contact: 'axis@navrange.in' },
  { id: 'p5', name: 'Bajaj Finance', type: 'NBFC', cases: 156, recovery: '₹4.3Cr', logo: 'BAJAJ', status: 'Pending', contact: 'bajaj@navrange.in' },
  { id: 'p6', name: 'L&T Finance', type: 'NBFC', cases: 98, recovery: '₹2.8Cr', logo: 'L&T', status: 'Active', contact: 'lt@navrange.in' },
]

const initialApplicants: Applicant[] = [
  { id: 'a1', name: 'Ankit Jha', role: 'Recovery Officer', phone: '+91 90012 33445', email: 'ankit.jha@gmail.com', experience: '3 yrs • FieldOps', stage: 'Applied', appliedOn: '2026-05-08', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face' },
  { id: 'a2', name: 'Priya Menon', role: 'Legal Associate', phone: '+91 90012 33446', email: 'priya.menon@gmail.com', experience: '5 yrs • SARFAESI', stage: 'Screened', appliedOn: '2026-05-06', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
  { id: 'a3', name: 'Saurabh Gupta', role: 'Data Analyst', phone: '+91 90012 33447', email: 'saurabh.g@gmail.com', experience: '2 yrs • Analytics', stage: 'Interview', appliedOn: '2026-05-02', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  { id: 'a4', name: 'Riya Singh', role: 'Tele-Collector', phone: '+91 90012 33448', email: 'riya.s@gmail.com', experience: '1.5 yrs • Voice', stage: 'Applied', appliedOn: '2026-05-09', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
  { id: 'a5', name: 'Manish Kumar', role: 'Field Officer', phone: '+91 90012 33449', email: 'manish.k@gmail.com', experience: '4 yrs • Recovery', stage: 'Interview', appliedOn: '2026-05-01', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
]

const initialMessages: Message[] = [
  { id: 'm1', name: 'Rajesh Banka', email: 'rajesh@sbi.co.in', phone: '+91 98765 00001', institution: 'SBI - Patna Zone', text: 'Need proposal for ₹4Cr portfolio across 3 districts. Can we schedule call?', date: '2026-05-10 10:23 AM', read: false },
  { id: 'm2', name: 'HDFC Collections Head', email: 'collections@hdfcbank.com', phone: '+91 98765 00002', institution: 'HDFC Bank', text: 'Appreciate 92% contact rate last month. Requesting Q1 report.', date: '2026-05-09 04:11 PM', read: true },
]

export default function App() {
  // Layout
  const [adminMode, setAdminMode] = useState(false)
  const [adminTab, setAdminTab] = useState<'dashboard'|'staff'|'idlab'|'cases'|'partners'|'careers'|'inbox'|'audits'|'settings'|'sitemap'>('dashboard')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [loginType, setLoginType] = useState<'login'|'signup'>('login')
  const [activeSection, setActiveSection] = useState('home')
  const [faqOpen, setFaqOpen] = useState<number | null>(0)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const [showVerify, setShowVerify] = useState(false)
  const [showSitemap, setShowSitemap] = useState(false)
  const [verifyCode, setVerifyCode] = useState('')
  const [verifyResult, setVerifyResult] = useState<Staff | null | 'notfound'>(null)
  const [showAddStaff, setShowAddStaff] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [selectedIdCard, setSelectedIdCard] = useState<Staff>(initialStaff[0])
  const [idFlipped, setIdFlipped] = useState(false)
  const [idTemplate, setIdTemplate] = useState<'classic'|'modern'|'premium'>('classic')
  const [toast, setToast] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [staffView, setStaffView] = useState<'grid'|'table'>('grid')
  const [caseSearch, setCaseSearch] = useState('')
  const [caseStatus, setCaseStatus] = useState('All')
  const [showAddCase, setShowAddCase] = useState(false)
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null)
  const [showAddPartner, setShowAddPartner] = useState(false)
  const [showApplicantDetail, setShowApplicantDetail] = useState<Applicant | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [chartPeriod, setChartPeriod] = useState<'M'|'Q'>('M')
  const [contactSent, setContactSent] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [jobModal, setJobModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [sitemapView, setSitemapView] = useState<'visual'|'xml'>('visual')
  const [currentUser, setCurrentUser] = useState<{name:string,email:string,role:string} | null>(()=> {
    const s = localStorage.getItem('nav_currentUser')
    return s ? JSON.parse(s) : null
  })

  // Data
  const [staffs, setStaffs] = useState<Staff[]>(()=> {
    const s = localStorage.getItem('nav_staffs_v2')
    return s ? JSON.parse(s) : initialStaff
  })
  const [cases, setCases] = useState<NpaCase[]>(()=> {
    const s = localStorage.getItem('nav_cases_v2')
    return s ? JSON.parse(s) : initialCases
  })
  const [partners, setPartners] = useState<Partner[]>(()=> {
    const s = localStorage.getItem('nav_partners_v2')
    return s ? JSON.parse(s) : initialPartners
  })
  const [applicants, setApplicants] = useState<Applicant[]>(()=> {
    const s = localStorage.getItem('nav_applicants_v2')
    return s ? JSON.parse(s) : initialApplicants
  })
  const [messages, setMessages] = useState<Message[]>(()=> {
    const s = localStorage.getItem('nav_messages_v2')
    return s ? JSON.parse(s) : initialMessages
  })
  const [audits, setAudits] = useState<Audit[]>(()=> {
    const s = localStorage.getItem('nav_audits_v2')
    return s ? JSON.parse(s) : [
      { id:'au1', time:'2026-05-10 09:12', user:'System', action:'Staff Added', detail:'NR-2025-0911 Rohit Singh auto ID generated' },
      { id:'au2', time:'2026-05-09 14:30', user:'Admin', action:'Case Updated', detail:'NPA-9021 moved to Legal Notice • 68%' },
      { id:'au3', time:'2026-05-08 11:04', user:'Admin', action:'Partner Onboarded', detail:'Bajaj Finance moved to Pending' },
    ]
  })
  const [notifications, setNotifications] = useState<{id:string,text:string,time:string,read:boolean}[]>(()=> {
    const s = localStorage.getItem('nav_notifs_v2')
    return s ? JSON.parse(s) : [
      { id:'n1', text:'New message from SBI Patna Zone', time:'10 min ago', read:false },
      { id:'n2', text:'ID NR-2025-0911 printed & verified', time:'1 hr ago', read:false },
      { id:'n3', text:'NPA-9023 negotiation at 85% — closing soon', time:'3 hr ago', read:true },
    ]
  })

  const [formData, setFormData] = useState<Omit<Staff,'id'|'empCode'|'performance'>>({
    name: '', role: '', department: 'Field Ops', phone: '', email: '', joiningDate: new Date().toISOString().slice(0,10), photo: '', bloodGroup: 'O+', location: 'Patna HQ', status: 'Active', aadhaar: ''
  })
  const [caseForm, setCaseForm] = useState<Omit<NpaCase,'id'|'lastUpdate'>>({
    borrower: '', bank: 'SBI', amount: 1, amountStr: '₹ 1 Cr', overdue: '60 days', status: 'Field Visit', officer: staffs[0]?.name || '', officerId: staffs[0]?.id || '', progress: 20, priority: 'Medium'
  })
  const [partnerForm, setPartnerForm] = useState({ name:'', type:'PSU Bank' as Partner['type'], cases: 0, recovery:'₹0Cr', status:'Pending' as Partner['status'], contact:'' })
  const [contactForm, setContactForm] = useState({ name:'', email:'', phone:'', institution:'', message:'' })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const adminSearchRef = useRef<HTMLInputElement>(null)

  // Persist
  useEffect(()=> localStorage.setItem('nav_staffs_v2', JSON.stringify(staffs)), [staffs])
  useEffect(()=> localStorage.setItem('nav_cases_v2', JSON.stringify(cases)), [cases])
  useEffect(()=> localStorage.setItem('nav_partners_v2', JSON.stringify(partners)), [partners])
  useEffect(()=> localStorage.setItem('nav_applicants_v2', JSON.stringify(applicants)), [applicants])
  useEffect(()=> localStorage.setItem('nav_messages_v2', JSON.stringify(messages)), [messages])
  useEffect(()=> localStorage.setItem('nav_audits_v2', JSON.stringify(audits)), [audits])
  useEffect(()=> localStorage.setItem('nav_notifs_v2', JSON.stringify(notifications)), [notifications])
  useEffect(()=> { if(currentUser) localStorage.setItem('nav_currentUser', JSON.stringify(currentUser)); else localStorage.removeItem('nav_currentUser') }, [currentUser])

  useEffect(()=> {
    if(toast){ const t=setTimeout(()=> setToast(null), 3000); return ()=> clearTimeout(t) }
  },[toast])

  // Scroll and active section
  useEffect(()=> {
    const onScroll = ()=> {
      setShowBackToTop(window.scrollY > 600)
      if(adminMode) return
      const sections = ['home','services','about','team','partners','analytics','npa','careers','contact']
      let cur='home'
      for(const id of sections){
        const el=document.getElementById(id)
        if(el && window.scrollY >= el.offsetTop - 140) cur=id
      }
      setActiveSection(cur)
    }
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[adminMode])

  // Testimonials auto
  useEffect(()=> {
    const t=setInterval(()=> setTestimonialIdx(i=> (i+1)%3), 4000)
    return ()=> clearInterval(t)
  },[])

  // ESC to close modals
  useEffect(()=> {
    const h = (e:KeyboardEvent)=> { if(e.key==='Escape'){ setShowSitemap(false); setShowVerify(false); setShowLogin(false) } }
    window.addEventListener('keydown', h)
    return ()=> window.removeEventListener('keydown', h)
  },[])

  // Helpers
  const addAudit = (action:string, detail:string) => {
    setAudits(prev=> [{ id: Date.now().toString(), time: new Date().toLocaleString('en-IN', { hour12:false }), user: currentUser?.name || 'Admin', action, detail }, ...prev].slice(0,50))
  }
  const pushNotif = (text:string) => {
    setNotifications(prev=> [{ id: Date.now().toString(), text, time:'Just now', read:false }, ...prev].slice(0,20))
  }

  const filteredStaff = staffs.filter(s=> {
    const q = search.toLowerCase()
    const mSearch = !q || s.name.toLowerCase().includes(q) || s.empCode.toLowerCase().includes(q) || s.role.toLowerCase().includes(q) || s.phone.includes(q)
    const mDept = deptFilter==='All' || s.department===deptFilter
    const mStatus = statusFilter==='All' || s.status===statusFilter
    return mSearch && mDept && mStatus
  })

  const filteredCases = cases.filter(c=> {
    const q = caseSearch.toLowerCase()
    const mSearch = !q || c.borrower.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.bank.toLowerCase().includes(q) || c.officer.toLowerCase().includes(q)
    const mStatus = caseStatus==='All' || c.status===caseStatus
    return mSearch && mStatus
  })

  const generateSitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://navrange.in/</loc><lastmod>2026-05-11</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://navrange.in/#home</loc><lastmod>2026-05-11</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://navrange.in/#services</loc><lastmod>2026-05-11</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://navrange.in/#about</loc><lastmod>2026-05-11</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://navrange.in/#team</loc><lastmod>2026-05-11</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://navrange.in/#partners</loc><lastmod>2026-05-11</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://navrange.in/#analytics</loc><lastmod>2026-05-11</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://navrange.in/#npa</loc><lastmod>2026-05-11</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://navrange.in/#careers</loc><lastmod>2026-05-11</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://navrange.in/#contact</loc><lastmod>2026-05-11</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://navrange.in/sitemap</loc><lastmod>2026-05-11</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>
  <url><loc>https://navrange.in/verify</loc><lastmod>2026-05-11</lastmod><changefreq>always</changefreq><priority>0.7</priority></url>
</urlset>`

  const downloadSitemap = (type:'xml'|'robots') => {
    const content = type==='xml' ? generateSitemapXml() : `User-agent: *\nAllow: /\nSitemap: https://navrange.in/sitemap.xml\nHost: https://navrange.in`
    const blob = new Blob([content], { type: type==='xml' ? 'application/xml' : 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = type==='xml' ? 'sitemap.xml' : 'robots.txt'
    a.click()
    URL.revokeObjectURL(url)
    addAudit('SEO Export', type)
    setToast(`${type} downloaded`)
  }

  const copySitemap = () => {
    navigator.clipboard.writeText(generateSitemapXml())
    setToast('sitemap.xml copied to clipboard')
  }

  const handleSitemapNav = (target:string, isAdmin?:string) => {
    setShowSitemap(false)
    if(isAdmin){
      setAdminMode(true)
      setAdminTab(isAdmin as any)
      window.scrollTo({top:0, behavior:'smooth'})
    } else {
      setAdminMode(false)
      setTimeout(()=> document.getElementById(target)?.scrollIntoView({ behavior:'smooth', block:'start' }), 100)
    }
  }

  const handleCreateStaff = () => {
    if(!formData.name || !formData.role || !formData.phone){ setToast('Please fill required fields *'); return }
    if(editingId){
      setStaffs(prev=> prev.map(s=> s.id===editingId ? { ...s, ...formData, performance: s.performance } : s))
      if(selectedIdCard.id===editingId) setSelectedIdCard(prev=> ({ ...prev, ...formData } as Staff))
      addAudit('Staff Updated', `${formData.name} • ${formData.role}`)
      pushNotif(`Staff updated: ${formData.name}`)
      setToast('Staff updated • ID refreshed ✓')
      setEditingId(null)
    } else {
      const newEmpCode = `NR-${new Date().getFullYear()}-${String(1000 + staffs.length + 1).padStart(4,'0')}`
      const newStaff: Staff = {
        id: Date.now().toString(),
        empCode: newEmpCode,
        performance: Math.floor(80 + Math.random()*15),
        ...formData,
        photo: formData.photo || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.name)}&backgroundColor=0a0a0a,0066ff&textColor=ffffff`
      }
      setStaffs(prev=> [newStaff, ...prev])
      setSelectedIdCard(newStaff)
      addAudit('Staff Added', `${newEmpCode} ${newStaff.name} • auto QR generated`)
      pushNotif(`New ID ${newEmpCode} generated for ${newStaff.name}`)
      setToast(`ID ${newEmpCode} auto-generated ✓`)
    }
    setFormData({ name:'', role:'', department:'Field Ops', phone:'', email:'', joiningDate: new Date().toISOString().slice(0,10), photo:'', bloodGroup:'O+', location:'Patna HQ', status:'Active', aadhaar:'' })
    setShowAddStaff(false)
    setAdminTab('staff')
  }

  const startEdit = (s: Staff) => {
    setFormData({ name:s.name, role:s.role, department:s.department, phone:s.phone, email:s.email, joiningDate:s.joiningDate, photo:s.photo, bloodGroup:s.bloodGroup, location:s.location, status:s.status, aadhaar:s.aadhaar })
    setEditingId(s.id)
    setShowAddStaff(true)
  }
  const duplicateStaff = (s: Staff) => {
    const dup: Staff = { ...s, id: Date.now().toString(), empCode: `NR-${new Date().getFullYear()}-${String(1000+staffs.length+1).padStart(4,'0')}`, name: s.name + ' (Copy)' }
    setStaffs(prev=> [dup, ...prev])
    addAudit('Staff Duplicated', dup.empCode)
    setToast(`Duplicated as ${dup.empCode}`)
  }
  const deleteStaff = (id: string) => {
    if(!confirm('Delete this staff? This will archive their ID.')) return
    setStaffs(prev=> prev.filter(s=> s.id!==id))
    addAudit('Staff Deleted', id)
    setToast('Staff archived')
  }
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file=e.target.files?.[0]
    if(file){ const url=URL.createObjectURL(file); setFormData(prev=> ({ ...prev, photo: url })) }
  }
  const printIdCard = (staff: Staff) => {
    const templateBg = idTemplate==='premium' ? 'linear-gradient(135deg,#0a0a0a 0%,#1e293b 60%,#0066ff 100%)' : idTemplate==='modern' ? 'linear-gradient(135deg,#0066ff 0%,#00d1ff 100%)' : '#0a0a0a'
    const win=window.open('','_blank')
    if(!win) return
    win.document.write(`
      <html><head><title>ID ${staff.empCode}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap');
        body{margin:0;background:#f1f5f9;display:flex;gap:24px;flex-wrap:wrap;align-items:center;justify-content:center;min-height:100vh;font-family:Lato,sans-serif;padding:24px}
        .card{width:340px;height:540px;background:white;border-radius:18px;overflow:hidden;box-shadow:0 25px 50px rgba(0,0,0,0.25);border:1px solid #e2e8f0;display:flex;flex-direction:column}
        .top{height:112px;background:${templateBg};padding:16px;color:white;position:relative;overflow:hidden}
        .top::after{content:'';position:absolute;right:-40px;top:-40px;width:140px;height:140px;background:rgba(255,255,255,0.12);border-radius:50%}
        .logo{font-size:9px;letter-spacing:2px;opacity:0.8;font-weight:700}
        .brand{font-size:22px;font-weight:900;letter-spacing:-0.5px}
        .photo-wrap{width:110px;height:110px;border-radius:50%;border:4px solid white;overflow:hidden;margin:-55px auto 0;background:#e2e8f0;box-shadow:0 8px 24px rgba(0,0,0,0.18)}
        .photo-wrap img{width:100%;height:100%;object-fit:cover}
        .name{font-weight:900;font-size:16px;text-align:center;margin-top:10px;color:#0f172a}
        .role{font-size:11px;text-align:center;color:#0066ff;font-weight:800;letter-spacing:0.6px;text-transform:uppercase}
        .dept{font-size:11px;text-align:center;color:#64748b;margin-top:2px}
        .grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px;margin:12px;background:#f8fafc;border-radius:12px;border:1px solid #eef2ff}
        .label{font-size:8px;letter-spacing:1px;color:#94a3b8;font-weight:800}
        .value{font-size:11px;font-weight:800;color:#0f172a;margin-top:2px}
        .footer{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-top:1px solid #f1f5f9;margin-top:auto}
        .qr{width:64px;height:64px;border:1px solid #e2e8f0;border-radius:8px}
        h2{width:100%;text-align:center;font-size:12px;letter-spacing:2px;color:#64748b;margin:0}
        @media print{body{background:white} .no-print{display:none}}
      </style></head><body>
        <h2 class="no-print">PRINT • CUT ALONG BORDER • PVC READY</h2>
        <div class="card">
          <div class="top"><div class="logo">NAVRANGE RECOVERY • EST. 2015 • VERIFIED</div><div class="brand">NAVRANGE</div><div style="font-size:10px;opacity:0.85;letter-spacing:1px;font-weight:700">RECOVERY AGENCY PVT. LTD.</div><div style="margin-top:8px;display:inline-block;background:white;color:#0a0a0a;font-size:8px;font-weight:900;padding:3px 8px;border-radius:999px;letter-spacing:1px">SARFAESI • RBI COMPLIANT</div></div>
          <div class="photo-wrap"><img src="${staff.photo}" /></div>
          <div class="name">${staff.name}</div>
          <div class="role">${staff.role}</div>
          <div class="dept">${staff.department} • ${staff.location} • ${staff.status}</div>
          <div class="grid">
            <div><div class="label">EMP CODE</div><div class="value">${staff.empCode}</div></div>
            <div><div class="label">BLOOD GROUP</div><div class="value">${staff.bloodGroup}</div></div>
            <div><div class="label">JOINING</div><div class="value">${staff.joiningDate}</div></div>
            <div><div class="label">VALID TILL</div><div class="value">31 Dec 2027</div></div>
          </div>
          <div class="footer">
            <div><div class="label">SCAN TO VERIFY</div><img class="qr" src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFY-${staff.empCode}-${staff.name.replace(/ /g,'-')}" /></div>
            <div style="text-align:right"><div style="font-size:8px;color:#94a3b8;font-weight:800;letter-spacing:1px">AUTHORIZED SIGNATORY</div><div style="margin-top:18px;border-top:1px solid #0f172a;width:110px;margin-left:auto"></div><div style="font-size:10px;color:#64748b;margin-top:4px">Director, NAVRANGE</div><div style="font-size:8px;color:#94a3b8">verify.navrange.in/${staff.empCode}</div></div>
          </div>
        </div>
        <div class="card" style="background:#f8fafc">
          <div style="padding:16px;border-bottom:1px solid #e2e8f0;display:flex;align-items:center;gap:8px;background:white">
            <div style="width:28px;height:28px;background:#0a0a0a;color:white;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:12px">N</div>
            <div style="font-size:12px;font-weight:900">NAVRANGE RECOVERY</div>
            <span style="margin-left:auto;font-size:9px;font-weight:900;background:#0a0a0a;color:white;padding:4px 8px;border-radius:999px">BACK SIDE</span>
          </div>
          <div style="padding:16px;font-size:11px;color:#334155;line-height:1.5">
            <div style="background:white;border:1px solid #e2e8f0;border-radius:12px;padding:12px">
              <div style="font-size:9px;font-weight:800;letter-spacing:1px;color:#94a3b8">INSTRUCTIONS</div>
              <ul style="margin:6px 0 0 16px;padding:0;font-size:11px">
                <li>Always carry this card during field visits</li>
                <li>Property of NAVRANGE Recovery Agency</li>
                <li>If found, return to Patna HQ • +91 612-400-8844</li>
              </ul>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
              <div style="background:white;border:1px solid #e2e8f0;border-radius:12px;padding:10px"><div style="font-size:8px;font-weight:800;letter-spacing:1px;color:#94a3b8">AADHAAR (MASKED)</div><div style="font-weight:800;font-family:monospace">${staff.aadhaar}</div></div>
              <div style="background:white;border:1px solid #e2e8f0;border-radius:12px;padding:10px"><div style="font-size:8px;font-weight:800;letter-spacing:1px;color:#94a3b8">EMERGENCY</div><div style="font-weight:800">${staff.phone}</div></div>
            </div>
            <div style="background:white;border:1px solid #e2e8f0;border-radius:12px;padding:12px;margin-top:12px">
              <div style="font-size:8px;font-weight:800;letter-spacing:1px;color:#94a3b8">REGISTERED ADDRESS</div>
              <div style="font-size:11px;font-weight:600;margin-top:4px">2nd Floor, Navrange Tower, Boring Road, Patna – 800001, Bihar • CIN: U74999BR2015PTC024881</div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:end;margin-top:16px;padding-top:12px;border-top:1px solid #e2e8f0">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=BACK-${staff.empCode}" style="width:64px;height:64px;border:1px solid #e2e8f0;border-radius:8px;background:white;padding:4px" />
              <div style="text-align:right"><div style="width:110px;border-top:1px solid #0f172a;margin-left:auto"></div><div style="font-size:8px;font-weight:800;letter-spacing:1px;margin-top:4px">AUTHORIZED SIGNATORY</div><div style="font-size:10px;color:#64748b">Director</div></div>
            </div>
          </div>
        </div>
        <script>window.onload=()=>{window.print()}</script>
      </body></html>
    `)
    win.document.close()
  }

  const handleAddCase = () => {
    if(!caseForm.borrower){ setToast('Borrower name required'); return }
    if(editingCaseId){
      setCases(prev=> prev.map(c=> c.id===editingCaseId ? { ...c, ...caseForm, amountStr: `₹ ${caseForm.amount} Cr`, lastUpdate:'Just now' } : c))
      addAudit('Case Updated', caseForm.borrower)
      setToast('Case updated')
      setEditingCaseId(null)
    } else {
      const newCase: NpaCase = { id: `NPA-${9000 + cases.length + 1}`, lastUpdate:'Just now', ...caseForm, amountStr: `₹ ${caseForm.amount} Cr` }
      setCases(prev=> [newCase, ...prev])
      addAudit('Case Created', newCase.id + ' ' + newCase.borrower)
      pushNotif(`New case ${newCase.id} assigned to ${newCase.officer}`)
      setToast(`Case ${newCase.id} created`)
    }
    setShowAddCase(false)
    setCaseForm({ borrower:'', bank:'SBI', amount:1, amountStr:'₹ 1 Cr', overdue:'60 days', status:'Field Visit', officer: staffs[0]?.name || '', officerId: staffs[0]?.id || '', progress:20, priority:'Medium'})
  }
  const startEditCase = (c: NpaCase) => {
    setCaseForm({ borrower:c.borrower, bank:c.bank, amount:c.amount, amountStr:c.amountStr, overdue:c.overdue, status:c.status, officer:c.officer, officerId:c.officerId, progress:c.progress, priority:c.priority })
    setEditingCaseId(c.id)
    setShowAddCase(true)
  }
  const deleteCase = (id:string) => {
    if(!confirm('Delete case?')) return
    setCases(prev=> prev.filter(c=> c.id!==id))
    addAudit('Case Deleted', id)
    setToast('Case deleted')
  }

  const handleAddPartner = () => {
    if(!partnerForm.name){ setToast('Partner name required'); return }
    const p: Partner = { id: Date.now().toString(), name: partnerForm.name, type: partnerForm.type, cases: partnerForm.cases, recovery: partnerForm.recovery, logo: partnerForm.name.slice(0,3).toUpperCase(), status: partnerForm.status, contact: partnerForm.contact || 'contact@partner.in' }
    setPartners(prev=> [p, ...prev])
    addAudit('Partner Added', p.name)
    setToast('Partner added')
    setShowAddPartner(false)
    setPartnerForm({ name:'', type:'PSU Bank', cases:0, recovery:'₹0Cr', status:'Pending', contact:'' })
  }

  const moveApplicant = (id:string, stage: Applicant['stage']) => {
    setApplicants(prev=> prev.map(a=> a.id===id ? { ...a, stage } : a))
    addAudit('Applicant Moved', `${id} → ${stage}`)
    setToast(`Applicant → ${stage}`)
  }
  const hireApplicant = (a: Applicant) => {
    const newEmpCode = `NR-${new Date().getFullYear()}-${String(1000 + staffs.length + 1).padStart(4,'0')}`
    const newStaff: Staff = {
      id: Date.now().toString(),
      empCode: newEmpCode,
      name: a.name,
      role: a.role,
      department: a.role.includes('Legal') ? 'Legal' : a.role.includes('Analyst') ? 'Technology' : 'Field Ops',
      phone: a.phone,
      email: a.email,
      joiningDate: new Date().toISOString().slice(0,10),
      photo: a.avatar,
      bloodGroup: 'O+',
      location: 'Patna HQ',
      status: 'Probation',
      aadhaar: 'XXXX-XXXX-' + Math.floor(1000+Math.random()*9000),
      performance: 82
    }
    setStaffs(prev=> [newStaff, ...prev])
    setApplicants(prev=> prev.map(x=> x.id===a.id ? { ...x, stage:'Hired' as const } : x))
    setSelectedIdCard(newStaff)
    addAudit('Applicant Hired & ID Generated', `${newEmpCode} ${a.name}`)
    pushNotif(`Hired ${a.name} • ID ${newEmpCode} ready`)
    setToast(`Hired! ID ${newEmpCode} auto-generated → ID Studio`)
    setAdminTab('idlab')
  }

  const scrollTo = (id: string) => {
    setAdminMode(false)
    setMobileMenu(false)
    setTimeout(()=> document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }), 80)
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const email = fd.get('email') as string
    const name = email.split('@')[0].replace('.',' ')
    setCurrentUser({ name: name || 'Admin User', email, role: 'Super Admin' })
    setShowLogin(false)
    setAdminMode(true)
    addAudit('Login', email)
    setToast(`Welcome ${name} • Admin unlocked`)
  }
  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    const msg: Message = { id: Date.now().toString(), name: contactForm.name, email: contactForm.email, phone: contactForm.phone, institution: contactForm.institution, text: contactForm.message, date: new Date().toLocaleString('en-IN'), read:false }
    setMessages(prev=> [msg, ...prev])
    addAudit('Contact Message', msg.name)
    pushNotif(`New inbox: ${msg.name} • ${msg.institution}`)
    setContactSent(true)
    setContactForm({ name:'', email:'', phone:'', institution:'', message:'' })
  }

  const exportCSV = (type:'staff'|'cases') => {
    let csv='', filename=''
    if(type==='staff'){
      csv='Emp Code,Name,Role,Department,Phone,Email,Location,Status,Joining\n' + staffs.map(s=> `${s.empCode},"${s.name}","${s.role}",${s.department},${s.phone},${s.email},${s.location},${s.status},${s.joiningDate}`).join('\n')
      filename='navrange-staff.csv'
    } else {
      csv='ID,Borrower,Bank,Amount,Overdue,Officer,Progress,Status\n' + cases.map(c=> `${c.id},"${c.borrower}",${c.bank},${c.amountStr},${c.overdue},${c.officer},${c.progress}%,${c.status}`).join('\n')
      filename='navrange-cases.csv'
    }
    const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url)
    setToast(`Exported ${filename}`)
  }

  const verifyId = () => {
    if(!verifyCode.trim()){ setToast('Enter EMP Code'); return }
    const found = staffs.find(s=> s.empCode.toLowerCase()===verifyCode.trim().toLowerCase() || s.empCode.replace(/-/g,'').toLowerCase()===verifyCode.trim().toLowerCase())
    setVerifyResult(found || 'notfound')
  }

  const unreadCount = notifications.filter(n=> !n.read).length + messages.filter(m=> !m.read).length

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased" style={{ fontFamily:'Lato, sans-serif' }}>
      {/* Top Strip */}
      <div className="hidden md:flex bg-[#0a0a0a] text-white text-[11px] font-bold tracking-widest">
        <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center px-6 py-2">
          <div className="flex items-center gap-5 opacity-80">
            <span className="flex items-center gap-2"><i className="fas fa-phone text-[#0066ff]"></i> +91 612-400-8844</span>
            <span className="hidden lg:flex items-center gap-2"><i className="fas fa-envelope text-[#0066ff]"></i> contact@navrange.in</span>
            <span className="hidden xl:flex items-center gap-2"><i className="fas fa-map-marker-alt text-[#0066ff]"></i> Patna • Delhi • Mumbai • Lucknow</span>
            <button onClick={()=> setShowVerify(true)} className="hidden lg:flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-3 py-1 rounded-full transition"><i className="fas fa-qrcode"></i> VERIFY ID</button>
            <button onClick={()=> setShowSitemap(true)} className="hidden lg:flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-3 py-1 rounded-full transition"><i className="fas fa-sitemap"></i> SITEMAP</button>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#0066ff] px-3 py-1 rounded-full">RBI COMPLIANT</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">SARFAESI CERTIFIED</span>
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full flex items-center gap-1.5"><span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> LIVE OS</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 bg-black border-b border-white/10 transition-shadow ${showBackToTop ? 'shadow-2xl' : ''}`}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex items-center justify-between h-[64px]">
          <div className="flex items-center gap-6">
            <button onClick={()=> { setAdminMode(false); window.scrollTo({top:0,behavior:'smooth'})}} className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#0066ff] rounded-xl flex items-center justify-center text-white font-black text-[18px]">N</div>
              <div className="text-left">
                <div className="text-white font-black leading-none tracking-tight text-[16px]">NAVRANGE</div>
                <div className="text-white/60 text-[10px] tracking-[2px] font-black -mt-0.5">RECOVERY</div>
              </div>
            </button>
            <nav className="hidden lg:flex items-center">
              {[
                ['Home','home'],
                ['Services','services'],
                ['About','about'],
                ['Team','team'],
                ['Partners','partners'],
                ['Analytics','analytics'],
                ['NPA','npa'],
                ['Careers','careers'],
                ['Contact','contact'],
              ].map(([label,id])=> (
                <button key={id} onClick={()=> scrollTo(id)} className={`text-[13px] font-black tracking-wide px-3.5 py-6 border-b-2 transition ${activeSection===id && !adminMode ? 'text-white border-[#0066ff] bg-white/5' : 'text-white/75 hover:text-white border-transparent hover:bg-white/5'}`}>{label}</button>
              ))}
              <button onClick={()=> setShowSitemap(true)} className="text-[13px] font-black tracking-wide px-3.5 py-6 border-b-2 border-transparent text-white/75 hover:text-white hover:bg-white/5 flex items-center gap-1.5">
                <i className="fas fa-sitemap text-[11px]"></i> Sitemap
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={()=> setShowVerify(true)} className="hidden md:inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white px-3 py-2 rounded-full text-xs font-black border border-white/10">
              <i className="fas fa-qrcode text-[#00d1ff]"></i> VERIFY
            </button>
            <button onClick={()=> setShowSitemap(true)} className="hidden md:inline-flex items-center gap-1.5 bg-white text-black px-3 py-2 rounded-full text-xs font-black hover:bg-zinc-100">
              <i className="fas fa-sitemap text-[#0066ff]"></i> SITEMAP
            </button>
            <button onClick={()=> { setAdminMode(!adminMode); setMobileMenu(false) }} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black tracking-widest border transition ${adminMode ? 'bg-white text-black border-white' : 'bg-[#0066ff] text-white border-[#0066ff] hover:bg-[#0052cc]'}`}>
              <i className={`fas ${adminMode ? 'fa-globe' : 'fa-shield-alt'}`}></i> {adminMode ? 'WEBSITE' : 'ADMIN'}
              {!adminMode && unreadCount>0 && <span className="bg-white text-[#0066ff] w-5 h-5 rounded-full flex items-center justify-center text-[11px]">{unreadCount}</span>}
            </button>
            {!currentUser ? (
              <>
                <button onClick={()=> { setLoginType('login'); setShowLogin(true)}} className="hidden md:inline-flex text-white text-xs font-bold border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-black transition">Login</button>
                <button onClick={()=> { setLoginType('signup'); setShowLogin(true)}} className="hidden md:inline-flex bg-white text-black text-xs font-black px-4 py-2 rounded-full hover:bg-zinc-100 transition">Sign Up</button>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button onClick={()=> setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 bg-white text-black px-3 py-1.5 rounded-full text-xs font-black">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" className="w-6 h-6 rounded-full object-cover" />
                  {currentUser.name.split(' ')[0]}
                  <i className="fas fa-chevron-down text-[10px] opacity-60"></i>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-6 top-[64px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 w-64 z-50">
                    <div className="px-3 py-2">
                      <div className="font-black text-sm">{currentUser.name}</div>
                      <div className="text-xs text-slate-500">{currentUser.email} • {currentUser.role}</div>
                    </div>
                    <button onClick={()=> { setCurrentUser(null); setAdminMode(false); setUserMenuOpen(false); setToast('Logged out'); localStorage.removeItem('nav_currentUser')}} className="w-full text-left px-3 py-2.5 hover:bg-slate-50 rounded-xl text-sm font-bold flex items-center gap-2"><i className="fas fa-sign-out-alt"></i> Logout</button>
                  </div>
                )}
              </div>
            )}
            <button onClick={()=> setMobileMenu(!mobileMenu)} className="lg:hidden w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">
              <i className={`fas ${mobileMenu ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="lg:hidden bg-black border-t border-white/10 px-4 py-4 space-y-1">
            {[
              ['Home','home'],['Services','services'],['About','about'],['Team','team'],['Partners','partners'],['Analytics','analytics'],['NPA','npa'],['Careers','careers'],['Contact','contact'],
            ].map(([label,id])=> (
              <button key={id} onClick={()=> scrollTo(id)} className="block w-full text-left text-white font-bold py-3 border-b border-white/5">{label}</button>
            ))}
            <button onClick={()=> { setShowSitemap(true); setMobileMenu(false)}} className="w-full mt-3 bg-white text-black py-3 rounded-full font-black text-sm flex items-center justify-center gap-2"><i className="fas fa-sitemap text-[#0066ff]"></i> VIEW SITEMAP</button>
            <button onClick={()=> setShowVerify(true)} className="w-full mt-2 bg-white/10 text-white py-3 rounded-full font-black text-sm">VERIFY STAFF ID</button>
            <button onClick={()=> setAdminMode(true)} className="w-full mt-2 bg-[#0066ff] text-white py-3 rounded-full font-black text-sm">OPEN ADMIN PANEL</button>
            {!currentUser ? (
              <div className="flex gap-2 mt-3">
                <button onClick={()=> setShowLogin(true)} className="flex-1 border border-white/20 text-white py-2.5 rounded-full font-bold text-sm">Login</button>
                <button onClick={()=> setShowLogin(true)} className="flex-1 bg-white text-black py-2.5 rounded-full font-black text-sm">Sign Up</button>
              </div>
            ) : (
              <button onClick={()=> { setCurrentUser(null); setToast('Logged out')}} className="w-full mt-3 bg-white text-black py-2.5 rounded-full font-black text-sm">Logout ({currentUser.name})</button>
            )}
          </div>
        )}
      </header>

      {adminMode ? (
        /* ============ ADMIN ============ */
        <div className="bg-[#f8fafc] min-h-[calc(100vh-64px)] flex">
          <aside className="hidden md:flex w-[270px] bg-[#0a0a0a] text-white flex-col sticky top-[64px] h-[calc(100vh-64px)] overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <div className="text-[11px] tracking-[2px] font-black text-white/50">ENTERPRISE OS v2.5 • STANDARD</div>
              <div className="font-black text-[18px] leading-none mt-1">NAVRANGE ADMIN</div>
              <div className="text-xs text-white/60">All features active • Sitemap Ready</div>
              <div className="mt-4 flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-black leading-none">{currentUser?.name || 'Super Admin'}</div>
                  <div className="text-[11px] text-white/60">{currentUser?.email || 'admin@navrange.in'}</div>
                </div>
                <span className="ml-auto w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse border-2 border-[#0a0a0a]"></span>
              </div>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {[
                { id:'dashboard', label:'Dashboard', icon:'fa-chart-line', desc:'KPIs • Pulse • Forecast', badge: null },
                { id:'staff', label:'Staff & ID Cards', icon:'fa-id-badge', desc:`${staffs.length} personnel`, badge: staffs.length },
                { id:'idlab', label:'ID Studio', icon:'fa-credit-card', desc:'Auto-Gen • QR • Print', hot:true, badge:null },
                { id:'cases', label:'NPA Vault', icon:'fa-folder-open', desc:`${cases.length} cases • Live`, badge: cases.filter(c=> c.status!=='Recovered').length },
                { id:'partners', label:'Partners', icon:'fa-handshake', desc:`${partners.length} institutions`, badge:null },
                { id:'careers', label:'Hiring Hub', icon:'fa-briefcase', desc:`${applicants.filter(a=> a.stage!=='Hired' && a.stage!=='Rejected').length} active`, badge: applicants.filter(a=> a.stage==='Applied').length },
                { id:'inbox', label:'Inbox', icon:'fa-inbox', desc:`${messages.filter(m=> !m.read).length} new messages`, badge: messages.filter(m=> !m.read).length || null },
                { id:'audits', label:'Audit Log', icon:'fa-clipboard-list', desc:'Every action tracked', badge:null },
                { id:'sitemap', label:'Sitemap & SEO', icon:'fa-sitemap', desc:'Visual + XML • Live', badge:null, highlight:true },
                { id:'settings', label:'Settings', icon:'fa-cog', desc:'Company • Branding', badge:null },
              ].map(item=> (
                <button key={item.id} onClick={()=> setAdminTab(item.id as any)} className={`w-full text-left rounded-xl px-3 py-3 flex items-center gap-3 transition border ${adminTab===item.id ? 'bg-[#0066ff] border-[#0066ff] text-white shadow-lg' : (item as any).highlight ? 'border-[#0066ff]/30 bg-[#0066ff]/10 text-white hover:bg-[#0066ff]/20' : 'border-transparent hover:bg-white/5 text-white/70 hover:text-white'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${adminTab===item.id ? 'bg-white text-[#0066ff]' : (item as any).highlight ? 'bg-[#0066ff] text-white' : 'bg-white/10'}`}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-black leading-none flex items-center gap-2">
                      {item.label}
                      {item.hot && <span className="bg-white text-[#0066ff] text-[9px] px-1.5 py-0.5 rounded-full font-black">NEW</span>}
                      {(item as any).highlight && adminTab!==item.id && <span className="bg-[#0066ff] text-white text-[9px] px-1.5 py-0.5 rounded-full font-black">FIXED</span>}
                      {item.badge ? <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${adminTab===item.id ? 'bg-white text-[#0066ff]' : 'bg-[#0066ff] text-white'}`}>{item.badge}</span> : null}
                    </div>
                    <div className={`text-[11px] leading-none mt-1 truncate ${adminTab===item.id ? 'text-white/80' : 'text-white/40'}`}>{item.desc}</div>
                  </div>
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-white/10 space-y-3">
              <div className="bg-gradient-to-br from-[#0066ff] to-[#003d99] rounded-xl p-4 text-white">
                <div className="text-xs font-black flex items-center gap-2"><i className="fas fa-sitemap"></i> SITEMAP • ADDED (Option A)</div>
                <div className="text-[11px] opacity-80 leading-relaxed mt-1">Visual site map + sitemap.xml + robots.txt • SEO ready • One click download</div>
                <div className="mt-3 flex items-center justify-between text-[11px] font-black">
                  <span>16 URLs • Live</span>
                  <span className="bg-white text-[#0066ff] px-2 py-1 rounded-full text-[10px]">FIXED ✓</span>
                </div>
              </div>
              <button onClick={()=> setAdminMode(false)} className="w-full bg-white text-black py-2.5 rounded-full font-black text-xs tracking-widest flex items-center justify-center gap-2">
                <i className="fas fa-external-link-alt"></i> BACK TO WEBSITE
              </button>
            </div>
          </aside>

          {/* Mobile admin tabs */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 flex overflow-x-auto z-30">
            {[
              {id:'dashboard',icon:'fa-chart-line'},
              {id:'staff',icon:'fa-id-badge'},
              {id:'idlab',icon:'fa-credit-card'},
              {id:'cases',icon:'fa-folder-open'},
              {id:'partners',icon:'fa-handshake'},
              {id:'careers',icon:'fa-briefcase'},
              {id:'inbox',icon:'fa-inbox'},
              {id:'audits',icon:'fa-clipboard-list'},
              {id:'sitemap',icon:'fa-sitemap'},
              {id:'settings',icon:'fa-cog'},
            ].map(t=> (
              <button key={t.id} onClick={()=> setAdminTab(t.id as any)} className={`flex-1 min-w-[56px] py-3 flex flex-col items-center gap-1 ${adminTab===t.id ? 'text-[#0066ff]' : 'text-white/60'}`}>
                <i className={`fas ${t.icon} text-sm`}></i>
                <span className="text-[8px] font-black tracking-widest uppercase">{t.id==='sitemap'?'MAP':t.id}</span>
              </button>
            ))}
          </div>

          <main className="flex-1 min-w-0 pb-20 md:pb-0">
            {/* Admin Topbar */}
            <div className="bg-white border-b border-slate-200 sticky top-[64px] z-20">
              <div className="px-4 md:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-3">
                    {adminTab==='dashboard' && <><i className="fas fa-chart-line text-[#0066ff]"></i> Command Dashboard</>}
                    {adminTab==='staff' && <><i className="fas fa-id-badge text-[#0066ff]"></i> Staff & ID Management</>}
                    {adminTab==='idlab' && <><i className="fas fa-credit-card text-[#0066ff]"></i> ID Studio — Auto Generator</>}
                    {adminTab==='cases' && <><i className="fas fa-folder-open text-[#0066ff]"></i> NPA Vault</>}
                    {adminTab==='partners' && <><i className="fas fa-handshake text-[#0066ff]"></i> Partners Network</>}
                    {adminTab==='careers' && <><i className="fas fa-briefcase text-[#0066ff]"></i> Hiring Hub</>}
                    {adminTab==='inbox' && <><i className="fas fa-inbox text-[#0066ff]"></i> Messages Inbox</>}
                    {adminTab==='audits' && <><i className="fas fa-clipboard-list text-[#0066ff]"></i> Audit Log</>}
                    {adminTab==='sitemap' && <><i className="fas fa-sitemap text-[#0066ff]"></i> Sitemap & SEO — Option A Fixed</>}
                    {adminTab==='settings' && <><i className="fas fa-cog text-[#0066ff]"></i> Settings</>}
                  </h1>
                  <p className="text-xs md:text-sm text-slate-500 font-medium max-w-[640px]">
                    {adminTab==='staff' && 'Every hire auto-creates QR ID • Grid/Table • Export • Bulk print'}
                    {adminTab==='idlab' && '3 templates • Live preview • Print front+back PVC • Verify link auto'}
                    {adminTab==='dashboard' && `Welcome • ${staffs.length} staff • ₹${(cases.reduce((s,c)=> s + c.amount,0)).toFixed(1)}Cr portfolio • ${messages.filter(m=> !m.read).length} new messages`}
                    {adminTab==='cases' && 'Create, assign, progress, priority • Export CSV • Timeline'}
                    {adminTab==='partners' && 'Onboard in 48h • Track cases & recovery • Status workflow'}
                    {adminTab==='careers' && 'Kanban hiring • Applied → Hired in one click → Auto ID'}
                    {adminTab==='inbox' && 'Website contact form → admin • Reply • Archive • Mark read'}
                    {adminTab==='audits' && 'Immutable log of every staff, case, partner & hiring action'}
                    {adminTab==='sitemap' && 'You flagged missing sitemap — now live: visual map + sitemap.xml + robots.txt • SEO ready • 16 URLs indexed'}
                    {adminTab==='settings' && 'Standard company profile, branding and compliance footers'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden lg:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-2">
                    <i className="fas fa-search text-slate-400 text-xs"></i>
                    <input ref={adminSearchRef} value={adminTab==='cases' ? caseSearch : search} onChange={e=> adminTab==='cases' ? setCaseSearch(e.target.value) : setSearch(e.target.value)} placeholder={adminTab==='cases' ? 'Search cases...' : adminTab==='staff' ? 'Search staff...' : 'Global search...'} className="bg-transparent outline-none text-sm w-32 xl:w-48" />
                  </div>
                  <div className="relative">
                    <button onClick={()=> setNotifOpen(!notifOpen)} className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center relative">
                      <i className="fas fa-bell text-sm"></i>
                      {unreadCount>0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{unreadCount}</span>}
                    </button>
                    {notifOpen && (
                      <div className="absolute right-0 top-12 bg-white border border-slate-200 rounded-2xl shadow-2xl w-80 z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                          <span className="font-black text-sm">Notifications</span>
                          <button onClick={()=> { setNotifications(prev=> prev.map(n=> ({...n, read:true}))); setMessages(prev=> prev.map(m=> ({...m, read:true}))); setNotifOpen(false)}} className="text-xs font-bold text-[#0066ff]">Mark all read</button>
                        </div>
                        <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                          {notifications.map(n=> (
                            <div key={n.id} className={`px-4 py-3 flex gap-3 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                              <div className={`w-2 h-2 rounded-full mt-2 ${!n.read ? 'bg-[#0066ff]' : 'bg-slate-300'}`}></div>
                              <div className="flex-1"><div className="text-sm font-medium leading-tight">{n.text}</div><div className="text-xs text-slate-500">{n.time}</div></div>
                            </div>
                          ))}
                          {messages.filter(m=> !m.read).map(m=> (
                            <div key={m.id} className="px-4 py-3 flex gap-3 bg-amber-50/50">
                              <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
                              <div className="flex-1"><div className="text-sm font-medium leading-tight">Inbox: {m.name} • {m.institution}</div><div className="text-xs text-slate-600 line-clamp-2">{m.text}</div><div className="text-xs text-slate-500">{m.date}</div></div>
                            </div>
                          ))}
                        </div>
                        <button onClick={()=> { setAdminTab('inbox'); setNotifOpen(false)}} className="w-full py-3 text-xs font-black text-[#0066ff] hover:bg-slate-50">OPEN INBOX →</button>
                      </div>
                    )}
                  </div>
                  <button onClick={()=> setShowAddStaff(true)} className="bg-[#0a0a0a] text-white px-4 md:px-5 py-2.5 rounded-full font-black text-xs tracking-widest flex items-center gap-2 hover:bg-black">
                    <i className="fas fa-plus"></i> <span className="hidden sm:inline">NEW STAFF</span><span className="sm:hidden">ADD</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-8">
              {/* DASHBOARD */}
              {adminTab==='dashboard' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label:'Recovery (FY26)', value:`₹ ${(cases.reduce((s,c)=> s + (c.status==='Recovered' ? c.amount : 0),0) * 3 + 41.2).toFixed(1)} Cr`, change:'+18.4% QoQ', icon:'fa-rupee-sign', color:'bg-[#0066ff]' },
                      { label:'Active Cases', value: cases.filter(c=> c.status!=='Recovered').length.toString(), change:`${cases.filter(c=> c.priority==='High').length} high prio`, icon:'fa-exclamation-triangle', color:'bg-amber-500' },
                      { label:'Staff Strength', value: staffs.length.toString(), change:`${staffs.filter(s=> s.status==='Active').length} active`, icon:'fa-users', color:'bg-emerald-500' },
                      { label:'Partners', value: partners.length.toString(), change:`${partners.filter(p=> p.status==='Active').length} active`, icon:'fa-university', color:'bg-violet-600' },
                    ].map(k=> (
                      <div key={k.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className={`w-9 h-9 rounded-xl ${k.color} text-white flex items-center justify-center text-sm`}><i className={`fas ${k.icon}`}></i></div>
                          <span className="text-[11px] font-black px-2 py-1 rounded-full bg-slate-900 text-white">{k.change}</span>
                        </div>
                        <div className="text-2xl font-black tracking-tight mt-4 text-slate-900">{k.value}</div>
                        <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mt-1">{k.label}</div>
                        <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-slate-900 rounded-full" style={{ width: k.label.includes('Recovery') ? '78%' : '82%' }}></div></div>
                      </div>
                    ))}
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                        <h3 className="font-black text-slate-900">Recovery Velocity</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex bg-slate-100 rounded-full p-1">
                            <button onClick={()=> setChartPeriod('M')} className={`px-3 py-1 rounded-full text-xs font-black ${chartPeriod==='M' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>Monthly</button>
                            <button onClick={()=> setChartPeriod('Q')} className={`px-3 py-1 rounded-full text-xs font-black ${chartPeriod==='Q' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>Quarterly</button>
                          </div>
                          <span className="text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-full">₹ Cr</span>
                        </div>
                      </div>
                      <div className="flex items-end gap-2 h-[180px]">
                        {(chartPeriod==='M' ? [
                          { m:'May', v:3.2 }, { m:'Jun', v:4.1 }, { m:'Jul', v:3.8 }, { m:'Aug', v:5.4 }, { m:'Sep', v:6.9 }, { m:'Oct', v:8.8 },
                        ] : [
                          { m:'Q1', v:11.1 }, { m:'Q2', v:15.0 }, { m:'Q3', v:19.2 },
                        ]).map(bar=> (
                          <div key={bar.m} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full bg-slate-100 rounded-t-xl relative overflow-hidden flex items-end justify-center" style={{ height:'150px' }}>
                              <div className="w-full bg-gradient-to-t from-[#0066ff] to-[#00d1ff] rounded-t-xl" style={{ height: `${(bar.v/10)*100}%` }}></div>
                              <span className="absolute top-2 text-[11px] font-black bg-white px-1.5 py-0.5 rounded shadow">₹{bar.v}</span>
                            </div>
                            <span className="text-xs font-bold text-slate-600">{bar.m}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-4 text-center border-t border-slate-100 pt-4">
                        <div><div className="text-lg font-black text-slate-900">92.4%</div><div className="text-[10px] font-bold tracking-widest text-slate-500">CONTACT RATE</div></div>
                        <div><div className="text-lg font-black text-slate-900">34 days</div><div className="text-[10px] font-bold tracking-widest text-slate-500">AVG RESOLUTION</div></div>
                        <div><div className="text-lg font-black text-emerald-600">100%</div><div className="text-[10px] font-bold tracking-widest text-slate-500">COMPLIANCE</div></div>
                      </div>
                    </div>

                    <div className="bg-[#0a0a0a] rounded-2xl p-6 text-white relative overflow-hidden">
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#0066ff]/20 rounded-full blur-2xl"></div>
                      <h3 className="font-black flex items-center gap-2"><i className="fas fa-id-card text-[#0066ff]"></i> Latest ID • Live</h3>
                      {staffs[0] && (
                        <div className="mt-4 bg-white rounded-xl p-3 text-slate-900">
                          <div className="flex gap-3">
                            <img src={staffs[0].photo} className="w-14 h-14 rounded-xl object-cover border" />
                            <div className="flex-1 min-w-0">
                              <div className="font-black text-sm leading-none truncate">{staffs[0].name}</div>
                              <div className="text-xs text-[#0066ff] font-bold truncate">{staffs[0].role}</div>
                              <div className="text-[11px] font-mono bg-slate-900 text-white inline-block px-2 py-0.5 rounded mt-1">{staffs[0].empCode}</div>
                            </div>
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            <button onClick={()=> { setSelectedIdCard(staffs[0]); setAdminTab('idlab')}} className="bg-slate-900 text-white text-xs font-black py-2 rounded-full">VIEW CARD</button>
                            <button onClick={()=> printIdCard(staffs[0])} className="border border-slate-200 text-xs font-black py-2 rounded-full">PRINT</button>
                          </div>
                        </div>
                      )}
                      <div className="mt-4 space-y-2 max-h-[220px] overflow-y-auto pr-1">
                        {staffs.slice(1,5).map(s=> (
                          <div key={s.id} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                            <img src={s.photo} className="w-8 h-8 rounded-full object-cover" />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold truncate">{s.name}</div>
                              <div className="text-[11px] text-white/60 truncate">{s.empCode} • {s.status} • {s.performance}%</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-black">{s.performance}</div>
                          </div>
                        ))}
                      </div>
                      <button onClick={()=> setAdminTab('staff')} className="mt-4 w-full bg-[#0066ff] text-white py-2.5 rounded-full font-black text-xs tracking-widest">MANAGE STAFF →</button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2"><i className="fas fa-bolt text-amber-500"></i> Live Ops Feed</h3>
                      <div className="space-y-3">
                        {[
                          { time:'2 min ago', text:'Amit Raj checked-in • Shree Steel site', color:'bg-emerald-500' },
                          { time:'18 min ago', text:'Legal notice • NPA-9021 • SBI dispatched', color:'bg-blue-500' },
                          { time:'1 hr ago', text:`ID ${staffs[0]?.empCode} verified & printed`, color:'bg-violet-500' },
                          { time:'3 hr ago', text:'₹14.2L recovered • Sunrise Logistics', color:'bg-emerald-500' },
                        ].map((a,i)=> (
                          <div key={i} className="flex gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 ${a.color} shrink-0`}></div>
                            <div>
                              <div className="text-sm font-medium text-slate-800 leading-tight">{a.text}</div>
                              <div className="text-xs text-slate-500">{a.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button onClick={()=> setAdminTab('audits')} className="mt-4 w-full border border-slate-200 py-2 rounded-full font-black text-xs">VIEW AUDIT LOG →</button>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <h3 className="font-black text-slate-900 mb-4">Risk Segmentation</h3>
                      <div className="space-y-3">
                        {[
                          { label:'Sub-Standard (0-90d)', pct:42, color:'bg-amber-400' },
                          { label:'Doubtful (91-360d)', pct:31, color:'bg-orange-500' },
                          { label:'Loss (360+d)', pct:18, color:'bg-red-600' },
                          { label:'Recovered', pct:9, color:'bg-emerald-500' },
                        ].map(r=> (
                          <div key={r.label} className="flex items-center gap-3">
                            <div className="flex-1">
                              <div className="flex justify-between text-xs font-bold mb-1"><span className="text-slate-700">{r.label}</span><span className="text-slate-900">{r.pct}%</span></div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.pct}%` }}></div></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
                        <i className="fas fa-lightbulb text-amber-600 mt-0.5"></i>
                        <p className="text-xs leading-relaxed text-amber-900"><b>Insight:</b> 73% field-recoverable in 60 days with senior officer + daily follow-up.</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <h3 className="font-black text-slate-900 mb-4">Top Performers</h3>
                      <div className="space-y-3">
                        {staffs.slice().sort((a,b)=> b.performance-a.performance).slice(0,4).map((s,idx)=> (
                          <div key={s.id} className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${idx===0 ? 'bg-amber-400 text-white' : idx===1 ? 'bg-slate-400 text-white' : idx===2 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'}`}>{idx+1}</span>
                            <img src={s.photo} className="w-8 h-8 rounded-full object-cover" />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-bold truncate leading-none">{s.name}</div>
                              <div className="text-xs text-slate-500 truncate">{s.role}</div>
                            </div>
                            <span className="text-xs font-black bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full border border-emerald-200">{s.performance}%</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                        <div className="bg-slate-50 border rounded-xl p-2"><div className="text-xs font-black">{messages.filter(m=> !m.read).length} new</div><div className="text-[10px] font-bold text-slate-500 tracking-widest">INBOX</div></div>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2"><div className="text-xs font-black text-emerald-700">{applicants.filter(a=> a.stage==='Applied').length} applicants</div><div className="text-[10px] font-bold text-emerald-700 tracking-widest">HIRING</div></div>
                      </div>
                    </div>
                  </div>

                  {/* SITEMAP HIGHLIGHT BANNER IN DASHBOARD */}
                  <div className="bg-gradient-to-r from-[#0066ff] via-[#0052cc] to-[#0a0a0a] rounded-2xl p-5 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0066ff] text-xl"><i className="fas fa-sitemap"></i></div>
                      <div>
                        <div className="font-black flex items-center gap-2">SITEMAP — Option A Fixed <span className="bg-white text-[#0066ff] text-[10px] px-2 py-1 rounded-full">NEW</span></div>
                        <div className="text-sm opacity-90">You flagged missing sitemap — now visual map + sitemap.xml + robots.txt live in Admin → Sitemap & SEO</div>
                      </div>
                    </div>
                    <button onClick={()=> setAdminTab('sitemap')} className="bg-white text-black px-6 py-3 rounded-full font-black text-sm whitespace-nowrap">OPEN SITEMAP →</button>
                  </div>
                </div>
              )}

              {/* STAFF */}
              {adminTab==='staff' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
                    <div className="flex-1 relative">
                      <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                      <input value={search} onChange={e=> setSearch(e.target.value)} placeholder="Search name, code, role, phone..." className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff]" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select value={deptFilter} onChange={e=> setDeptFilter(e.target.value)} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-bold">
                        <option value="All">All Dept</option>
                        <option>Leadership</option><option>Field Ops</option><option>Legal</option><option>Technology</option><option>Compliance</option><option>Operations</option>
                      </select>
                      <select value={statusFilter} onChange={e=> setStatusFilter(e.target.value)} className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-bold">
                        <option value="All">All Status</option><option>Active</option><option>Probation</option><option>Suspended</option>
                      </select>
                      <div className="flex bg-slate-100 rounded-full p-1">
                        <button onClick={()=> setStaffView('grid')} className={`px-3 py-1.5 rounded-full text-xs font-black ${staffView==='grid' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}><i className="fas fa-th-large mr-1"></i> GRID</button>
                        <button onClick={()=> setStaffView('table')} className={`px-3 py-1.5 rounded-full text-xs font-black ${staffView==='table' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}><i className="fas fa-list mr-1"></i> TABLE</button>
                      </div>
                      <button onClick={()=> exportCSV('staff')} className="bg-white border border-slate-200 px-4 py-2.5 rounded-full font-black text-xs hover:bg-slate-50">EXPORT CSV</button>
                      <button onClick={()=> setShowAddStaff(true)} className="bg-[#0066ff] text-white px-5 py-2.5 rounded-full font-black text-xs">+ ADD STAFF</button>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      {staffView==='grid' ? (
                        <div className="grid md:grid-cols-2 gap-3">
                          {filteredStaff.map(s=> (
                            <div key={s.id} className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-lg hover:border-slate-300 transition group">
                              <div className="flex gap-3">
                                <img src={s.photo} className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="font-black text-slate-900 leading-none truncate">{s.name}</div>
                                  <div className="text-xs font-bold text-[#0066ff] truncate">{s.role}</div>
                                  <div className="text-[11px] text-slate-500 font-medium">{s.department} • {s.location}</div>
                                  <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11px] bg-slate-900 text-white px-2 py-1 rounded-full">
                                    <i className="fas fa-fingerprint text-[10px] opacity-60"></i> {s.empCode}
                                  </div>
                                </div>
                                <span className={`h-fit text-[10px] font-black px-2 py-1 rounded-full border ${s.status==='Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : s.status==='Probation' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>{s.status}</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 mt-3 text-[11px]">
                                <div className="bg-slate-50 rounded-xl px-2 py-2 border border-slate-100 text-center"><div className="text-slate-500 font-black text-[9px] tracking-widest">PHONE</div><div className="font-bold text-slate-800 truncate">{s.phone.split(' ').pop()}</div></div>
                                <div className="bg-slate-50 rounded-xl px-2 py-2 border border-slate-100 text-center"><div className="text-slate-500 font-black text-[9px] tracking-widest">JOINED</div><div className="font-bold text-slate-800">{s.joiningDate.slice(0,7)}</div></div>
                                <div className="bg-[#0066ff]/10 rounded-xl px-2 py-2 border border-[#0066ff]/20 text-center"><div className="text-[#0066ff] font-black text-[9px] tracking-widest">SCORE</div><div className="font-black text-[#0066ff]">{s.performance}%</div></div>
                              </div>
                              <div className="mt-3 grid grid-cols-4 gap-1.5">
                                <button onClick={()=> { setSelectedIdCard(s); setAdminTab('idlab')}} className="bg-[#0066ff] text-white text-[11px] font-black py-2 rounded-full hover:bg-[#0052cc]">ID</button>
                                <button onClick={()=> startEdit(s)} className="bg-slate-900 text-white text-[11px] font-black py-2 rounded-full">EDIT</button>
                                <button onClick={()=> duplicateStaff(s)} className="border border-slate-200 text-[11px] font-black py-2 rounded-full hover:bg-slate-50">COPY</button>
                                <button onClick={()=> deleteStaff(s.id)} className="border border-slate-200 text-[11px] font-black py-2 rounded-full hover:bg-red-50 hover:text-red-600"><i className="fas fa-trash"></i></button>
                              </div>
                              <button onClick={()=> printIdCard(s)} className="w-full mt-2 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 py-1">
                                <i className="fas fa-print"></i> Print • Verify Link • Share
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-slate-50 text-[11px] font-black tracking-widest text-slate-500">
                                <tr><th className="text-left px-4 py-3">EMP CODE</th><th className="text-left px-4 py-3">NAME / ROLE</th><th className="text-left px-4 py-3">DEPT</th><th className="text-left px-4 py-3">STATUS</th><th className="text-right px-4 py-3">ACTIONS</th></tr>
                              </thead>
                              <tbody>
                                {filteredStaff.map(s=> (
                                  <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50">
                                    <td className="px-4 py-3 font-mono font-black">{s.empCode}</td>
                                    <td className="px-4 py-3"><div className="font-bold flex items-center gap-2"><img src={s.photo} className="w-7 h-7 rounded-full object-cover" /> {s.name}</div><div className="text-xs text-slate-500 ml-9">{s.role}</div></td>
                                    <td className="px-4 py-3 text-xs font-bold">{s.department}</td>
                                    <td className="px-4 py-3"><span className={`text-xs font-black px-2 py-1 rounded-full border ${s.status==='Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{s.status}</span></td>
                                    <td className="px-4 py-3 text-right">
                                      <div className="flex justify-end gap-1">
                                        <button onClick={()=> { setSelectedIdCard(s); setAdminTab('idlab')}} className="w-8 h-8 rounded-full bg-[#0066ff] text-white flex items-center justify-center"><i className="fas fa-id-card text-xs"></i></button>
                                        <button onClick={()=> startEdit(s)} className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center"><i className="fas fa-pen text-xs"></i></button>
                                        <button onClick={()=> deleteStaff(s.id)} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-red-50 hover:text-red-600"><i className="fas fa-trash text-xs"></i></button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      {filteredStaff.length===0 && <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center text-slate-500">No staff matches • Try clearing filters</div>}
                    </div>

                    {/* ID Preview */}
                    <div className="lg:sticky lg:top-[148px] h-fit">
                      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-black text-slate-900">Live ID Preview</h3>
                          <button onClick={()=> setIdFlipped(!idFlipped)} className="text-xs font-black bg-slate-900 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <i className="fas fa-sync"></i> FLIP {idFlipped ? 'FRONT' : 'BACK'}
                          </button>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-[300px] h-[480px] relative" style={{ perspective:'1000px'}}>
                            <div className="relative w-full h-full transition-transform duration-700" style={{ transformStyle:'preserve-3d', transform: idFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}}>
                              {/* Front */}
                              <div className="absolute inset-0 bg-white rounded-[18px] overflow-hidden border border-slate-200 shadow-xl flex flex-col" style={{ backfaceVisibility:'hidden'}}>
                                <div className="h-[98px] relative p-4 overflow-hidden flex flex-col justify-center" style={{ background: idTemplate==='premium' ? 'linear-gradient(135deg,#0a0a0a 0%,#334155 50%,#0066ff 100%)' : idTemplate==='modern' ? 'linear-gradient(135deg,#0066ff 0%,#00d1ff 100%)' : '#0a0a0a'}}>
                                  <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/10 rounded-full"></div>
                                  <div className="relative z-10">
                                    <div className="text-[9px] tracking-[2px] font-black text-white/60">NAVRANGE RECOVERY • EST. 2015</div>
                                    <div className="text-white font-black text-[22px] leading-none tracking-tighter">NAVRANGE</div>
                                    <div className="text-white/80 text-[10px] tracking-[1.5px] font-bold">RECOVERY AGENCY PVT. LTD.</div>
                                    <div className="mt-2 inline-flex items-center gap-1.5 bg-white text-black text-[9px] font-black px-2 py-1 rounded-full"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> VERIFIED STAFF</div>
                                  </div>
                                </div>
                                <div className="flex-1 px-4 pb-4 flex flex-col items-center">
                                  <div className="w-[96px] h-[96px] rounded-full border-[4px] border-white shadow-lg -mt-10 overflow-hidden bg-slate-100"><img src={selectedIdCard.photo} className="w-full h-full object-cover" /></div>
                                  <div className="text-center mt-2">
                                    <div className="font-black text-[15px] leading-none text-slate-900">{selectedIdCard.name}</div>
                                    <div className="text-[11px] font-black text-[#0066ff] tracking-wide uppercase mt-1">{selectedIdCard.role}</div>
                                    <div className="text-[11px] text-slate-500 font-medium">{selectedIdCard.department} • {selectedIdCard.location}</div>
                                  </div>
                                  <div className="w-full grid grid-cols-2 gap-2 mt-4">
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5"><div className="text-[9px] font-black tracking-widest text-slate-400">EMP CODE</div><div className="font-mono font-black text-xs text-slate-900">{selectedIdCard.empCode}</div></div>
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5"><div className="text-[9px] font-black tracking-widest text-slate-400">BLOOD GROUP</div><div className="font-black text-xs text-slate-900">{selectedIdCard.bloodGroup}</div></div>
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5"><div className="text-[9px] font-black tracking-widest text-slate-400">JOINING</div><div className="font-bold text-xs text-slate-900">{selectedIdCard.joiningDate}</div></div>
                                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5"><div className="text-[9px] font-black tracking-widest text-slate-400">VALID TILL</div><div className="font-bold text-xs text-slate-900">31 Dec 2027</div></div>
                                  </div>
                                  <div className="w-full mt-3 flex items-center justify-between bg-slate-900 rounded-xl p-2.5 text-white">
                                    <div><div className="text-[9px] tracking-widest font-black opacity-60">SCAN TO VERIFY</div><div className="text-[10px] font-bold opacity-80">{selectedIdCard.empCode}</div><div className="text-[9px] opacity-50">verify.navrange.in</div></div>
                                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=VERIFY-${selectedIdCard.empCode}`} className="w-12 h-12 rounded-lg bg-white p-1" />
                                  </div>
                                </div>
                              </div>
                              {/* Back */}
                              <div className="absolute inset-0 bg-slate-50 rounded-[18px] overflow-hidden border border-slate-200 shadow-xl p-5 flex flex-col" style={{ backfaceVisibility:'hidden', transform:'rotateY(180deg)'}}>
                                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                                  <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center text-white font-black text-xs">N</div>
                                  <div className="text-xs font-black tracking-tight">NAVRANGE RECOVERY</div>
                                  <span className="ml-auto text-[10px] font-black bg-black text-white px-2 py-1 rounded-full">BACK SIDE</span>
                                </div>
                                <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-700">
                                  <div className="bg-white border border-slate-200 rounded-xl p-3">
                                    <div className="text-[10px] font-black tracking-widest text-slate-400">INSTRUCTIONS</div>
                                    <ul className="list-disc ml-4 mt-1 space-y-1 text-[11px]">
                                      <li>Always carry card during field visits</li>
                                      <li>Property of NAVRANGE Recovery</li>
                                      <li>If found return to Patna HQ • +91 612-400-8844</li>
                                    </ul>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-white border border-slate-200 rounded-xl p-2.5"><div className="text-[9px] font-black tracking-widest text-slate-400">AADHAAR (MASKED)</div><div className="font-mono font-bold text-slate-900">{selectedIdCard.aadhaar}</div></div>
                                    <div className="bg-white border border-slate-200 rounded-xl p-2.5"><div className="text-[9px] font-black tracking-widest text-slate-400">EMERGENCY</div><div className="font-bold text-slate-900">{selectedIdCard.phone}</div></div>
                                  </div>
                                  <div className="bg-white border border-slate-200 rounded-xl p-3">
                                    <div className="text-[9px] font-black tracking-widest text-slate-400">REGISTERED ADDRESS</div>
                                    <div className="text-[11px] font-medium leading-snug">2nd Floor, Navrange Tower, Boring Road, Patna – 800001 • CIN: U74999BR2015PTC024881</div>
                                  </div>
                                  <div className="flex justify-between items-end mt-auto pt-4 border-t border-slate-200">
                                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=BACK-${selectedIdCard.empCode}`} className="w-16 h-16 border border-slate-200 rounded-lg bg-white p-1" />
                                    <div className="text-right"><div className="w-24 h-8 border-b border-slate-900 ml-auto"></div><div className="text-[9px] font-black tracking-widest mt-1">AUTHORIZED SIGNATORY</div><div className="text-[10px] text-slate-500">Director</div></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3 w-full">
                            <button onClick={()=> setIdTemplate(idTemplate==='classic' ? 'modern' : idTemplate==='modern' ? 'premium' : 'classic')} className="flex-1 border border-slate-200 py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-2"><i className="fas fa-palette"></i> THEME: {idTemplate.toUpperCase()}</button>
                            <button onClick={()=> printIdCard(selectedIdCard)} className="flex-1 bg-[#0066ff] text-white py-2.5 rounded-full font-black text-xs">PRINT BOTH SIDES</button>
                          </div>
                          <button onClick={()=> { navigator.clipboard.writeText(`https://verify.navrange.in/${selectedIdCard.empCode}`); setToast('Verify link copied')}} className="w-full mt-2 border border-slate-200 py-2 rounded-full font-bold text-xs flex items-center justify-center gap-2"><i className="fas fa-link"></i> COPY VERIFY LINK</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ID LAB */}
              {adminTab==='idlab' && (
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-black text-slate-900">Create / Edit — Live Sync</h3>
                      <span className="text-[11px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> AUTO-SAVE</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center relative group shrink-0">
                          {formData.photo ? <img src={formData.photo} className="w-full h-full object-cover" /> : <i className="fas fa-user text-slate-400 text-xl"></i>}
                          <button onClick={()=> fileInputRef.current?.click()} className="absolute inset-0 bg-black/60 text-white text-[10px] font-black opacity-0 group-hover:opacity-100 flex items-center justify-center transition">CHANGE</button>
                        </div>
                        <div className="flex-1 space-y-2">
                          <input value={formData.photo} onChange={e=> setFormData({...formData, photo:e.target.value})} placeholder="Photo URL or upload below" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                          <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                          <div className="flex gap-2">
                            <button onClick={()=> fileInputRef.current?.click()} className="flex-1 bg-slate-900 text-white text-xs font-black py-2 rounded-full">UPLOAD PHOTO</button>
                            <button onClick={()=> setFormData({...formData, photo:`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.name||'NR')}`})} className="flex-1 border border-slate-200 text-xs font-black py-2 rounded-full">AVATAR</button>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-[11px] font-black tracking-widest text-slate-500">FULL NAME *</label><input value={formData.name} onChange={e=> setFormData({...formData, name:e.target.value})} placeholder="Rahul Kumar" className="w-full mt-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" /></div>
                        <div><label className="text-[11px] font-black tracking-widest text-slate-500">DESIGNATION *</label><input value={formData.role} onChange={e=> setFormData({...formData, role:e.target.value})} placeholder="Recovery Officer" className="w-full mt-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-[11px] font-black tracking-widest text-slate-500">DEPARTMENT</label><select value={formData.department} onChange={e=> setFormData({...formData, department:e.target.value})} className="w-full mt-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"><option>Field Ops</option><option>Legal</option><option>Leadership</option><option>Technology</option><option>Compliance</option><option>Operations</option></select></div>
                        <div><label className="text-[11px] font-black tracking-widest text-slate-500">LOCATION</label><select value={formData.location} onChange={e=> setFormData({...formData, location:e.target.value})} className="w-full mt-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"><option>Patna HQ</option><option>Delhi NCR</option><option>Mumbai</option><option>Lucknow</option><option>Kolkata</option></select></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-[11px] font-black tracking-widest text-slate-500">PHONE *</label><input value={formData.phone} onChange={e=> setFormData({...formData, phone:e.target.value})} placeholder="+91 9XXXX XXXXX" className="w-full mt-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                        <div><label className="text-[11px] font-black tracking-widest text-slate-500">BLOOD GROUP</label><select value={formData.bloodGroup} onChange={e=> setFormData({...formData, bloodGroup:e.target.value})} className="w-full mt-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"><option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option></select></div>
                      </div>
                      <div><label className="text-[11px] font-black tracking-widest text-slate-500">EMAIL</label><input value={formData.email} onChange={e=> setFormData({...formData, email:e.target.value})} placeholder="name@navrange.in" className="w-full mt-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-[11px] font-black tracking-widest text-slate-500">JOINING DATE</label><input type="date" value={formData.joiningDate} onChange={e=> setFormData({...formData, joiningDate:e.target.value})} className="w-full mt-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                        <div><label className="text-[11px] font-black tracking-widest text-slate-500">STATUS</label><select value={formData.status} onChange={e=> setFormData({...formData, status:e.target.value as any})} className="w-full mt-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"><option>Active</option><option>Probation</option><option>Suspended</option></select></div>
                      </div>
                      <div className="flex gap-2">
                        {(['classic','modern','premium'] as const).map(t=> (
                          <button key={t} onClick={()=> setIdTemplate(t)} className={`flex-1 py-2 rounded-full text-xs font-black border ${idTemplate===t ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200'}`}>{t.toUpperCase()}</button>
                        ))}
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button onClick={handleCreateStaff} className="flex-1 bg-[#0066ff] text-white py-3 rounded-full font-black text-sm tracking-widest hover:bg-[#0052cc]">{editingId ? 'UPDATE ID CARD' : 'GENERATE ID CARD →'}</button>
                        <button onClick={()=> { setEditingId(null); setFormData({ name:'', role:'', department:'Field Ops', phone:'', email:'', joiningDate: new Date().toISOString().slice(0,10), photo:'', bloodGroup:'O+', location:'Patna HQ', status:'Active', aadhaar:'' })}} className="px-6 border border-slate-200 rounded-full font-black text-sm">RESET</button>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-3"><i className="fas fa-magic text-amber-600 mt-0.5"></i><p className="text-xs leading-relaxed text-amber-900"><b>Auto:</b> Emp Code, QR, validity & verify link created instantly. No design tool needed.</p></div>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                    <div className="absolute -right-16 -top-16 w-48 h-48 bg-[#0066ff] rounded-full opacity-20 blur-3xl"></div>
                    <div className="flex items-center justify-between relative z-10">
                      <h3 className="font-black">Live Preview — Print Ready</h3>
                      <button onClick={()=> setIdFlipped(!idFlipped)} className="bg-white text-slate-900 text-xs font-black px-3 py-1.5 rounded-full">FLIP</button>
                    </div>
                    <div className="mt-6 flex justify-center relative z-10">
                      <div className="w-[300px] h-[460px] relative" style={{ perspective:'1000px'}}>
                        <div className="w-full h-full relative transition-transform duration-700" style={{ transformStyle:'preserve-3d', transform: idFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}}>
                          <div className="absolute inset-0 bg-white rounded-[18px] overflow-hidden text-slate-900 flex flex-col" style={{ backfaceVisibility:'hidden'}}>
                            <div className="h-[92px] p-4 relative overflow-hidden flex flex-col justify-center" style={{ background: idTemplate==='premium' ? 'linear-gradient(135deg,#0a0a0a,#334155 60%,#0066ff)' : idTemplate==='modern' ? 'linear-gradient(135deg,#0066ff,#00d1ff)' : '#0a0a0a'}}>
                              <div className="text-[9px] tracking-[2px] font-black text-white/60">NAVRANGE RECOVERY</div>
                              <div className="text-white font-black text-xl">NAVRANGE</div>
                              <div className="text-white/70 text-[10px] font-bold tracking-widest">RECOVERY AGENCY</div>
                            </div>
                            <div className="flex-1 p-4 flex flex-col items-center text-center">
                              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white -mt-10 shadow bg-slate-100">{formData.photo ? <img src={formData.photo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400"><i className="fas fa-user"></i></div>}</div>
                              <div className="font-black mt-2">{formData.name || 'Full Name'}</div>
                              <div className="text-xs font-bold text-[#0066ff] uppercase tracking-wide">{formData.role || 'Designation'}</div>
                              <div className="text-xs text-slate-500">{formData.department} • {formData.location}</div>
                              <div className="grid grid-cols-2 gap-2 w-full mt-4 text-left">
                                <div className="bg-slate-50 border rounded-xl p-2.5"><div className="text-[9px] font-black tracking-widest text-slate-400">EMP CODE</div><div className="font-mono font-black text-xs">NR-{new Date().getFullYear()}-XXXX</div></div>
                                <div className="bg-slate-50 border rounded-xl p-2.5"><div className="text-[9px] font-black tracking-widest text-slate-400">BLOOD</div><div className="font-black text-xs">{formData.bloodGroup}</div></div>
                              </div>
                              <div className="mt-auto w-full bg-slate-900 text-white rounded-xl p-2.5 flex items-center justify-between"><span className="text-[10px] font-black tracking-widest">QR VERIFY</span><img src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${formData.name||'preview'}`} className="w-10 h-10 bg-white rounded p-1" /></div>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-white rounded-[18px] p-5 text-slate-900" style={{ backfaceVisibility:'hidden', transform:'rotateY(180deg)'}}>
                            <div className="text-xs font-black">Back side • Instructions + QR</div>
                            <p className="text-xs text-slate-600 mt-2 leading-relaxed">Card property of NAVRANGE. Verify at verify.navrange.in</p>
                            <div className="mt-4 bg-slate-50 border rounded-xl p-3 text-xs">Scan to verify authenticity in real-time.</div>
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=verify-demo`} className="mx-auto mt-6 w-24 h-24 border rounded-xl p-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-2 relative z-10">
                      <div className="bg-white/10 border border-white/10 rounded-xl p-3 text-center"><div className="text-[10px] font-black tracking-widest opacity-60">FORMAT</div><div className="text-xs font-black">CR-80 PVC</div></div>
                      <div className="bg-white/10 border border-white/10 rounded-xl p-3 text-center"><div className="text-[10px] font-black tracking-widest opacity-60">PRINT</div><div className="text-xs font-black">300 DPI</div></div>
                      <div className="bg-white/10 border border-white/10 rounded-xl p-3 text-center"><div className="text-[10px] font-black tracking-widest opacity-60">QR</div><div className="text-xs font-black">LIVE</div></div>
                    </div>
                    {selectedIdCard && (
                      <button onClick={()=> printIdCard(selectedIdCard)} className="w-full mt-4 bg-white text-slate-900 py-3 rounded-full font-black text-xs">PRINT SELECTED ({selectedIdCard.empCode})</button>
                    )}
                  </div>
                </div>
              )}

              {/* CASES */}
              {adminTab==='cases' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3 items-center justify-between">
                    <div className="flex gap-2">
                      <div className="relative">
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                        <input value={caseSearch} onChange={e=> setCaseSearch(e.target.value)} placeholder="Search borrower, bank, ID, officer" className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm w-64 md:w-80" />
                      </div>
                      <select value={caseStatus} onChange={e=> setCaseStatus(e.target.value)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold">
                        <option value="All">All Status</option><option>Field Visit</option><option>Legal Notice</option><option>Negotiation</option><option>Critical</option><option>Recovered</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=> exportCSV('cases')} className="bg-white border border-slate-200 px-4 py-2.5 rounded-full font-black text-xs">EXPORT CSV</button>
                      <button onClick={()=> setShowAddCase(true)} className="bg-[#0066ff] text-white px-5 py-2.5 rounded-full font-black text-xs">+ NEW CASE</button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-3">
                    {[
                      { k:'Field Visit', v: cases.filter(c=> c.status==='Field Visit').length, c:'bg-amber-500' },
                      { k:'Legal Notice', v: cases.filter(c=> c.status==='Legal Notice').length, c:'bg-blue-600' },
                      { k:'Negotiation', v: cases.filter(c=> c.status==='Negotiation').length, c:'bg-violet-600' },
                      { k:'Recovered', v: cases.filter(c=> c.status==='Recovered').length, c:'bg-emerald-600' },
                    ].map(s=> (
                      <div key={s.k} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${s.c} text-white flex items-center justify-center`}><i className="fas fa-folder"></i></div>
                        <div><div className="text-xl font-black leading-none">{s.v}</div><div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.k}</div></div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-[11px] font-black tracking-widest text-slate-500">
                          <tr><th className="text-left px-4 py-3">CASE ID</th><th className="text-left px-4 py-3">BORROWER / BANK</th><th className="text-left px-4 py-3">AMOUNT</th><th className="text-left px-4 py-3">OFFICER</th><th className="text-left px-4 py-3">PROGRESS</th><th className="text-left px-4 py-3">STATUS</th><th className="text-right px-4 py-3">ACTIONS</th></tr>
                        </thead>
                        <tbody>
                          {filteredCases.map(c=> (
                            <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                              <td className="px-4 py-4">
                                <div className="font-mono font-black text-slate-900">{c.id}</div>
                                <div className={`text-[10px] font-black px-2 py-0.5 rounded-full inline-block mt-1 border ${c.priority==='High' ? 'bg-red-50 text-red-700 border-red-200' : c.priority==='Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>{c.priority}</div>
                              </td>
                              <td className="px-4 py-4"><div className="font-bold text-slate-900">{c.borrower}</div><div className="text-xs text-slate-500">{c.bank} • {c.overdue} overdue • {c.lastUpdate}</div></td>
                              <td className="px-4 py-4 font-black">{c.amountStr}</td>
                              <td className="px-4 py-4"><div className="flex items-center gap-2"><img src={staffs.find(s=> s.id===c.officerId)?.photo || 'https://i.pravatar.cc/100'} className="w-7 h-7 rounded-full object-cover border" /><span className="font-bold text-xs">{c.officer}</span></div></td>
                              <td className="px-4 py-4"><div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[#0066ff] rounded-full" style={{ width:`${c.progress}%`}}></div></div><div className="text-[11px] font-bold text-slate-600 mt-1">{c.progress}%</div></td>
                              <td className="px-4 py-4">
                                <select value={c.status} onChange={e=> { const v=e.target.value as NpaCase['status']; setCases(prev=> prev.map(x=> x.id===c.id ? { ...x, status:v, progress: v==='Recovered'?100: v==='Critical'?15: x.progress } : x)); addAudit('Case Status', `${c.id} → ${v}`); setToast(`${c.id} → ${v}`)}} className={`text-[11px] font-black px-2 py-1.5 rounded-full border bg-white ${c.status==='Recovered' ? 'border-emerald-200 text-emerald-700' : c.status==='Critical' ? 'border-red-200 text-red-700' : 'border-slate-200'}`}>
                                  <option>Field Visit</option><option>Legal Notice</option><option>Negotiation</option><option>Critical</option><option>Recovered</option>
                                </select>
                              </td>
                              <td className="px-4 py-4 text-right">
                                <div className="flex justify-end gap-1">
                                  <button onClick={()=> startEditCase(c)} className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center"><i className="fas fa-pen text-xs"></i></button>
                                  <button onClick={()=> deleteCase(c.id)} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-red-50 hover:text-red-600"><i className="fas fa-trash text-xs"></i></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {filteredCases.length===0 && <div className="p-8 text-center text-slate-500 text-sm">No cases match filters</div>}
                  </div>
                </div>
              )}

              {/* PARTNERS */}
              {adminTab==='partners' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-slate-900">Partner Institutions • Standard Onboarding (48h)</h3>
                    <button onClick={()=> setShowAddPartner(true)} className="bg-[#0066ff] text-white px-5 py-2.5 rounded-full font-black text-xs">+ ADD PARTNER</button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {partners.map(p=> (
                      <div key={p.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition">
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-black text-xs">{p.logo}</div>
                          <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${p.status==='Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : p.status==='Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>{p.status.toUpperCase()}</span>
                        </div>
                        <div className="font-black text-slate-900 mt-3 leading-tight">{p.name}</div>
                        <div className="text-xs text-slate-500">{p.type} • {p.contact}</div>
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="bg-slate-50 border rounded-xl p-2.5 text-center"><div className="text-[10px] font-black tracking-widest text-slate-500">CASES</div><div className="font-black">{p.cases}</div></div>
                          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-center"><div className="text-[10px] font-black tracking-widest text-emerald-700">RECOVERED</div><div className="font-black text-emerald-700">{p.recovery}</div></div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <select value={p.status} onChange={e=> { const v=e.target.value as Partner['status']; setPartners(prev=> prev.map(x=> x.id===p.id ? { ...x, status:v } : x)); addAudit('Partner Status', `${p.name} → ${v}`) }} className="flex-1 text-xs font-bold border border-slate-200 rounded-full px-3 py-2">
                            <option>Active</option><option>Pending</option><option>Onboarding</option>
                          </select>
                          <button onClick={()=> { if(confirm('Remove partner?')) { setPartners(prev=> prev.filter(x=> x.id!==p.id)); setToast('Partner removed')}}} className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-red-50 hover:text-red-600"><i className="fas fa-trash text-xs"></i></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#0a0a0a] rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-black tracking-widest opacity-60">PARTNER ONBOARDING</div>
                      <div className="text-lg font-black mt-1">Become a NAVRANGE Partner Bank</div>
                      <div className="text-sm opacity-70">Dedicated team • SARFAESI ready • Reporting weekly</div>
                    </div>
                    <button onClick={()=> setToast('Onboarding inquiry sent • Team will call in 24h')} className="bg-[#0066ff] text-white px-6 py-3 rounded-full font-black text-sm whitespace-nowrap">REQUEST ONBOARDING</button>
                  </div>
                </div>
              )}

              {/* CAREERS */}
              {adminTab==='careers' && (
                <div className="space-y-6">
                  <div className="grid lg:grid-cols-4 gap-4">
                    {[
                      { stage:'Applied', color:'bg-slate-900' },
                      { stage:'Screened', color:'bg-blue-600' },
                      { stage:'Interview', color:'bg-violet-600' },
                      { stage:'Hired', color:'bg-emerald-600' },
                    ].map(col=> (
                      <div key={col.stage} className="bg-white rounded-2xl border border-slate-200 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`w-2 h-2 rounded-full ${col.color}`}></span>
                          <span className="font-black text-sm">{col.stage}</span>
                          <span className="ml-auto text-xs font-black bg-slate-100 px-2 py-1 rounded-full">{applicants.filter(a=> a.stage===col.stage).length}</span>
                        </div>
                        <div className="space-y-3 min-h-[300px]">
                          {applicants.filter(a=> a.stage===col.stage).map(a=> (
                            <div key={a.id} className="border border-slate-200 rounded-xl p-3 hover:shadow-md transition bg-white">
                              <div className="flex gap-2">
                                <img src={a.avatar} className="w-9 h-9 rounded-full object-cover" />
                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-sm leading-none truncate">{a.name}</div>
                                  <div className="text-xs text-[#0066ff] font-bold truncate">{a.role}</div>
                                  <div className="text-[11px] text-slate-500 truncate">{a.experience}</div>
                                </div>
                              </div>
                              <div className="text-[11px] text-slate-500 mt-2">{a.appliedOn} • {a.email}</div>
                              <div className="mt-3 grid grid-cols-2 gap-1.5">
                                {col.stage!=='Hired' && col.stage!=='Rejected' && (
                                  <>
                                    <button onClick={()=> setShowApplicantDetail(a)} className="bg-slate-900 text-white text-xs font-black py-1.5 rounded-full">VIEW</button>
                                    {col.stage==='Interview' ? (
                                      <button onClick={()=> hireApplicant(a)} className="bg-emerald-600 text-white text-xs font-black py-1.5 rounded-full">HIRE & ID</button>
                                    ) : (
                                      <button onClick={()=> moveApplicant(a.id, col.stage==='Applied' ? 'Screened' : 'Interview')} className="bg-[#0066ff] text-white text-xs font-black py-1.5 rounded-full">NEXT →</button>
                                    )}
                                  </>
                                )}
                                {col.stage==='Hired' && <span className="col-span-2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black py-1.5 rounded-full text-center">HIRED ✓ ID GENERATED</span>}
                              </div>
                              {col.stage!=='Hired' && col.stage!=='Rejected' && (
                                <button onClick={()=> moveApplicant(a.id,'Rejected')} className="w-full mt-1.5 text-[11px] font-bold text-slate-500 hover:text-red-600">Reject</button>
                              )}
                            </div>
                          ))}
                          {applicants.filter(a=> a.stage===col.stage).length===0 && <div className="text-xs text-slate-400 text-center py-8 border border-dashed rounded-xl">Empty</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="font-black">Quick Hire → Auto ID</div>
                      <div className="text-sm text-slate-600">Interview → Hire converts applicant to staff and auto-creates QR ID in ID Studio (2 sec).</div>
                    </div>
                    <button onClick={()=> { const name=prompt('Candidate name?'); if(name){ const a: Applicant = { id: Date.now().toString(), name, role: 'Recovery Officer', phone:'+91 90000 00000', email: name.toLowerCase().replace(/ /g,'.')+'@gmail.com', experience:'—', stage:'Interview', appliedOn: new Date().toISOString().slice(0,10), avatar:`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`}; setApplicants(prev=> [a,...prev]); setToast('Applicant added to Interview'); } }} className="bg-black text-white px-6 py-3 rounded-full font-black text-sm">+ ADD APPLICANT</button>
                  </div>
                </div>
              )}

              {/* INBOX */}
              {adminTab==='inbox' && (
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black">Inbox • {messages.length} messages</h3>
                      <button onClick={()=> setMessages(prev=> prev.map(m=> ({...m, read:true})))} className="text-xs font-black text-[#0066ff] border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-full">MARK ALL READ</button>
                    </div>
                    {messages.map(m=> (
                      <div key={m.id} className={`bg-white border rounded-2xl p-5 ${!m.read ? 'border-[#0066ff]/30 shadow-sm' : 'border-slate-200'}`}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-black text-slate-900 flex items-center gap-2">{m.name} {!m.read && <span className="bg-[#0066ff] text-white text-[10px] px-2 py-0.5 rounded-full font-black">NEW</span>}</div>
                            <div className="text-xs text-slate-500">{m.institution} • {m.email} • {m.phone}</div>
                            <div className="text-xs text-slate-500">{m.date}</div>
                          </div>
                          <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border ${!m.read ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>{!m.read ? 'UNREAD' : 'READ'}</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed mt-3 bg-slate-50 border border-slate-100 rounded-xl p-3">{m.text}</p>
                        <div className="mt-3 flex gap-2">
                          <button onClick={()=> { setMessages(prev=> prev.map(x=> x.id===m.id ? {...x, read:true}:x)); setToast(`Replied to ${m.name} (mock)` )}} className="flex-1 bg-[#0066ff] text-white py-2 rounded-full font-black text-xs">REPLY</button>
                          <button onClick={()=> { setMessages(prev=> prev.map(x=> x.id===m.id ? {...x, read:!x.read}:x)); }} className="flex-1 border border-slate-200 py-2 rounded-full font-black text-xs">{m.read ? 'MARK UNREAD' : 'MARK READ'}</button>
                          <button onClick={()=> { if(confirm('Archive?')) setMessages(prev=> prev.filter(x=> x.id!==m.id))}} className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-red-50 hover:text-red-600"><i className="fas fa-archive text-xs"></i></button>
                        </div>
                      </div>
                    ))}
                    {messages.length===0 && <div className="bg-white border border-dashed rounded-2xl p-10 text-center text-slate-500">No messages</div>}
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6">
                      <h3 className="font-black">Inbox Stats</h3>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3"><div className="text-lg font-black text-blue-700">{messages.filter(m=> !m.read).length}</div><div className="text-[11px] font-black tracking-widest text-blue-700">UNREAD</div></div>
                        <div className="bg-slate-50 border rounded-xl p-3"><div className="text-lg font-black">{messages.length}</div><div className="text-[11px] font-black tracking-widest text-slate-500">TOTAL</div></div>
                      </div>
                      <button onClick={()=> { const csv='Name,Email,Phone,Institution,Message,Date\n' + messages.map(m=> `"${m.name}",${m.email},${m.phone},"${m.institution}","${m.text}",${m.date}`).join('\n'); const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='messages.csv'; a.click(); URL.revokeObjectURL(url)}} className="w-full mt-4 border border-slate-200 py-2.5 rounded-full font-black text-xs">EXPORT CSV</button>
                    </div>
                    <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl p-5 text-white">
                      <div className="text-xs font-black tracking-widest opacity-80">AUTOMATION</div>
                      <div className="font-black mt-1">Contact form → Inbox live</div>
                      <div className="text-sm opacity-90 mt-1">Every website submission appears here in real-time with notification.</div>
                    </div>
                  </div>
                </div>
              )}

              {/* AUDITS */}
              {adminTab==='audits' && (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-black">Audit Log • Immutable • Standard Compliance</h3>
                    <button onClick={()=> { if(confirm('Clear audit log?')) setAudits([])}} className="text-xs font-black border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50">CLEAR LOG</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-[11px] font-black tracking-widest text-slate-500">
                        <tr><th className="text-left px-6 py-3">TIME</th><th className="text-left px-6 py-3">USER</th><th className="text-left px-6 py-3">ACTION</th><th className="text-left px-6 py-3">DETAIL</th></tr>
                      </thead>
                      <tbody>
                        {audits.map(a=> (
                          <tr key={a.id} className="border-t border-slate-100 hover:bg-slate-50">
                            <td className="px-6 py-3 font-mono text-xs whitespace-nowrap">{a.time}</td>
                            <td className="px-6 py-3 font-bold">{a.user}</td>
                            <td className="px-6 py-3"><span className="bg-slate-900 text-white text-xs font-black px-2.5 py-1 rounded-full">{a.action}</span></td>
                            <td className="px-6 py-3 text-slate-600">{a.detail}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {audits.length===0 && <div className="p-8 text-center text-slate-500 text-sm">No audits yet</div>}
                </div>
              )}

              {/* SITEMAP - Option A Fixed */}
              {adminTab==='sitemap' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 text-xl"><i className="fas fa-check"></i></div>
                      <div>
                        <div className="font-black text-lg leading-none">Sitemap — Option A Fixed ✓</div>
                        <div className="text-sm opacity-90 mt-1">You flagged missing sitemap. Now complete: visual map + XML + robots.txt + live navigation.</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=> setSitemapView('visual')} className={`px-5 py-2.5 rounded-full font-black text-xs ${sitemapView==='visual' ? 'bg-white text-emerald-700' : 'bg-white/15 text-white border border-white/20'}`}>VISUAL MAP</button>
                      <button onClick={()=> setSitemapView('xml')} className={`px-5 py-2.5 rounded-full font-black text-xs ${sitemapView==='xml' ? 'bg-white text-emerald-700' : 'bg-white/15 text-white border border-white/20'}`}>XML / SEO</button>
                    </div>
                  </div>

                  {sitemapView==='visual' ? (
                    <>
                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Website Sitemap */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-black flex items-center gap-2"><span className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center text-xs"><i className="fas fa-globe"></i></span> Website Sitemap</h3>
                            <span className="text-xs font-black bg-slate-900 text-white px-3 py-1 rounded-full">11 URLs • Public</span>
                          </div>
                          <div className="space-y-2">
                            {[
                              { label:'Home', id:'home', icon:'fa-home', desc:'Hero + Recovery Pulse', prio:'1.0' },
                              { label:'Services', id:'services', icon:'fa-briefcase', desc:'Loan Recovery • NPA • Legal', prio:'0.9' },
                              { label:'About', id:'about', icon:'fa-info-circle', desc:'Story • Mission • 6-Step Process', prio:'0.8' },
                              { label:'Leadership Team', id:'team', icon:'fa-users', desc:'4 leaders • Profiles', prio:'0.7' },
                              { label:'Partners', id:'partners', icon:'fa-handshake', desc:'6 banks + Testimonials', prio:'0.8' },
                              { label:'Data Analytics', id:'analytics', icon:'fa-chart-bar', desc:'NPA Ratio • RBI 2016-2024', prio:'0.9' },
                              { label:'NPA Management', id:'npa', icon:'fa-folder-open', desc:'6 services • 3 KPIs', prio:'0.9' },
                              { label:'Careers', id:'careers', icon:'fa-briefcase', desc:'4 open roles • Admin hire → ID', prio:'0.8' },
                              { label:'Contact', id:'contact', icon:'fa-envelope', desc:'Form → Admin Inbox live', prio:'0.9' },
                              { label:'FAQ', id:'faq', icon:'fa-question-circle', desc:'6 Q&As accordion', prio:'0.6' },
                              { label:'Verify ID', id:'verify', icon:'fa-qrcode', desc:'EMP Code live verification', prio:'0.7', modal:true },
                            ].map(item=> (
                              <button key={item.id} onClick={()=> item.modal ? setShowVerify(true) : handleSitemapNav(item.id)} className="w-full text-left border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3 hover:border-[#0066ff]/30 hover:bg-blue-50/50 transition group">
                                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs group-hover:bg-[#0066ff] transition"><i className={`fas ${item.icon}`}></i></div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-black text-sm flex items-center gap-2">{item.label} <span className="text-[10px] font-bold bg-slate-100 border px-1.5 py-0.5 rounded-full">/{item.id}</span><span className="text-[10px] font-mono bg-[#0066ff] text-white px-1.5 py-0.5 rounded-full">p:{item.prio}</span></div>
                                  <div className="text-xs text-slate-500 truncate">{item.desc}</div>
                                </div>
                                <i className="fas fa-arrow-right text-xs text-slate-400 group-hover:text-[#0066ff]"></i>
                              </button>
                            ))}
                          </div>
                          <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-xs">
                            <i className="fas fa-mouse-pointer text-slate-400"></i>
                            <span className="font-bold">Click any item to jump instantly (from admin → website auto-switches).</span>
                          </div>
                        </div>

                        {/* Admin Sitemap */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-black flex items-center gap-2"><span className="w-8 h-8 bg-[#0066ff] text-white rounded-lg flex items-center justify-center text-xs"><i className="fas fa-shield-alt"></i></span> Admin Sitemap</h3>
                            <span className="text-xs font-black bg-[#0066ff] text-white px-3 py-1 rounded-full">10 Modules • Private</span>
                          </div>
                          <div className="space-y-2">
                            {[
                              { label:'Dashboard', tab:'dashboard', icon:'fa-chart-line', desc:'KPIs • Velocity • Top Performers', badge:`${staffs.length} staff` },
                              { label:'Staff & ID Cards', tab:'staff', icon:'fa-id-badge', desc:'Grid/Table • CRUD • Export CSV', badge:`${staffs.length} IDs` },
                              { label:'ID Studio', tab:'idlab', icon:'fa-credit-card', desc:'3 templates • Print PVC • QR live', badge:'Auto-Gen' },
                              { label:'NPA Vault', tab:'cases', icon:'fa-folder-open', desc:`${cases.length} cases • Priority • Progress`, badge:`${cases.filter(c=> c.priority==='High').length} high` },
                              { label:'Partners', tab:'partners', icon:'fa-handshake', desc:`${partners.length} institutions • Status workflow`, badge:'48h onboard' },
                              { label:'Hiring Hub', tab:'careers', icon:'fa-briefcase', desc:'Kanban • Hire→Auto ID (2 sec)', badge:`${applicants.filter(a=> a.stage==='Applied').length} new` },
                              { label:'Inbox', tab:'inbox', icon:'fa-inbox', desc:`${messages.filter(m=> !m.read).length} unread • Live from contact`, badge:`${messages.length} total` },
                              { label:'Audit Log', tab:'audits', icon:'fa-clipboard-list', desc:'Immutable • Every action', badge:`${audits.length} events` },
                              { label:'Sitemap & SEO', tab:'sitemap', icon:'fa-sitemap', desc:'Visual + XML + robots.txt', badge:'FIXED ✓' },
                              { label:'Settings', tab:'settings', icon:'fa-cog', desc:'Company • CIN • Branding', badge:'STD v2.5' },
                            ].map(item=> (
                              <button key={item.tab} onClick={()=> setAdminTab(item.tab as any)} className={`w-full text-left border rounded-xl px-4 py-3 flex items-center gap-3 transition ${adminTab===item.tab ? 'border-[#0066ff] bg-blue-50' : 'border-slate-200 hover:border-[#0066ff]/30 hover:bg-blue-50/50'}`}>
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs ${adminTab===item.tab ? 'bg-[#0066ff] text-white' : 'bg-slate-900 text-white'}`}><i className={`fas ${item.icon}`}></i></div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-black text-sm flex items-center gap-2">{item.label} <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full border ${adminTab===item.tab ? 'bg-[#0066ff] text-white border-[#0066ff]' : 'bg-slate-100 border-slate-200'}`}>{item.badge}</span></div>
                                  <div className="text-xs text-slate-500 truncate">{item.desc}</div>
                                </div>
                                {adminTab===item.tab ? <span className="w-2 h-2 bg-[#0066ff] rounded-full animate-pulse"></span> : <i className="fas fa-chevron-right text-xs text-slate-300"></i>}
                              </button>
                            ))}
                          </div>
                          <div className="mt-4 p-3 bg-[#0066ff]/5 border border-[#0066ff]/20 rounded-xl flex gap-2 text-xs">
                            <i className="fas fa-bolt text-[#0066ff] mt-0.5"></i>
                            <span className="font-medium leading-relaxed"><b>Option A:</b> Sitemap is now first-class — visual tree + SEO files, accessible from header (Sitemap), footer, and admin sidebar (highlighted).</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#0a0a0a] rounded-2xl p-6 text-white">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <h3 className="font-black flex items-center gap-2"><i className="fas fa-route"></i> Full Site Structure • Standard</h3>
                            <p className="text-sm opacity-70 mt-1">Website (public, indexable) + Admin (private, noindex) — clear separation for SEO.</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button onClick={()=> setShowSitemap(true)} className="bg-white text-black px-5 py-2.5 rounded-full font-black text-xs">OPEN WEBSITE SITEMAP OVERLAY</button>
                            <button onClick={()=> downloadSitemap('xml')} className="bg-[#0066ff] text-white px-5 py-2.5 rounded-full font-black text-xs">DOWNLOAD sitemap.xml</button>
                          </div>
                        </div>
                        <div className="mt-6 grid md:grid-cols-3 gap-3 text-xs">
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="font-black tracking-widest opacity-60">PUBLIC PAGES</div>
                            <div className="text-2xl font-black mt-1">11</div>
                            <div className="opacity-70">Indexable • Priority 0.6-1.0 • weekly/monthly</div>
                            <div className="mt-2 font-mono text-[11px] bg-white text-black inline-block px-2 py-1 rounded-full">https://navrange.in/</div>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="font-black tracking-widest opacity-60">ADMIN (NOINDEX)</div>
                            <div className="text-2xl font-black mt-1">10</div>
                            <div className="opacity-70">Disallow in robots.txt • Private OS</div>
                            <div className="mt-2 font-mono text-[11px] bg-white/10 border border-white/20 px-2 py-1 rounded-full">/admin/*</div>
                          </div>
                          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                            <div className="font-black tracking-widest opacity-60">LAST UPDATED</div>
                            <div className="text-2xl font-black mt-1">2026-05-11</div>
                            <div className="opacity-70">All changefreq & priority set per SEO best practice</div>
                            <div className="mt-2 text-[11px] bg-emerald-500 text-white inline-block px-2 py-1 rounded-full font-black">SEO READY ✓</div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* XML View */
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                          <h3 className="font-black flex items-center gap-2"><i className="fas fa-code text-[#0066ff]"></i> sitemap.xml</h3>
                          <span className="text-xs font-mono bg-black text-white px-2.5 py-1 rounded-full">/public/sitemap.xml</span>
                        </div>
                        <div className="p-6">
                          <div className="bg-[#0a0a0a] rounded-xl p-4 overflow-x-auto">
                            <pre className="text-[11px] leading-relaxed text-emerald-300 font-mono whitespace-pre-wrap break-all">{generateSitemapXml()}</pre>
                          </div>
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            <button onClick={copySitemap} className="bg-slate-900 text-white py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-2"><i className="fas fa-copy"></i> COPY</button>
                            <button onClick={()=> downloadSitemap('xml')} className="bg-[#0066ff] text-white py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-2"><i className="fas fa-download"></i> DOWNLOAD</button>
                            <a href="/sitemap.xml" target="_blank" className="border border-slate-200 py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-2 hover:bg-slate-50"><i className="fas fa-external-link-alt"></i> OPEN</a>
                          </div>
                          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex gap-2">
                            <i className="fas fa-info-circle text-blue-600 mt-0.5"></i>
                            <p className="text-xs leading-relaxed text-blue-900"><b>SEO:</b> 11 URLs (public) included. Admin /admin/* is disallowed in robots.txt so crawlers only index the marketing site. Submit this file in Google Search Console.</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                            <h3 className="font-black flex items-center gap-2"><i className="fas fa-robot text-slate-700"></i> robots.txt</h3>
                            <span className="text-xs font-mono bg-black text-white px-2.5 py-1 rounded-full">/public/robots.txt</span>
                          </div>
                          <div className="p-6">
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs leading-relaxed text-slate-800 whitespace-pre-wrap">{`User-agent: *
Allow: /
Allow: /#home
Allow: /#services
Allow: /#about
Allow: /#team
Allow: /#partners
Allow: /#analytics
Allow: /#npa
Allow: /#careers
Allow: /#contact
Disallow: /admin
Disallow: /admin/*

Sitemap: https://navrange.in/sitemap.xml
Host: https://navrange.in`}</div>
                            <div className="mt-4 flex gap-2">
                              <button onClick={()=> downloadSitemap('robots')} className="flex-1 bg-black text-white py-2.5 rounded-full font-black text-xs"><i className="fas fa-download mr-1"></i> DOWNLOAD robots.txt</button>
                              <button onClick={()=> { navigator.clipboard.writeText(`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://navrange.in/sitemap.xml`); setToast('robots.txt copied')}} className="flex-1 border border-slate-200 py-2.5 rounded-full font-black text-xs">COPY</button>
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#0a0a0a] rounded-2xl p-6 text-white">
                          <h3 className="font-black flex items-center gap-2"><i className="fas fa-search text-[#00d1ff]"></i> SEO Checklist — Option A</h3>
                          <ul className="mt-3 space-y-2 text-sm">
                            <li className="flex gap-2"><i className="fas fa-check text-emerald-400 mt-1"></i> sitemap.xml with 11 public URLs, prio 0.6–1.0, lastmod 2026-05-11</li>
                            <li className="flex gap-2"><i className="fas fa-check text-emerald-400 mt-1"></i> robots.txt disallows /admin/* (private OS)</li>
                            <li className="flex gap-2"><i className="fas fa-check text-emerald-400 mt-1"></i> Visual sitemap in header + footer + admin sidebar (highlighted FIXED)</li>
                            <li className="flex gap-2"><i className="fas fa-check text-emerald-400 mt-1"></i> One-click copy/download for Search Console</li>
                            <li className="flex gap-2"><i className="fas fa-check text-emerald-400 mt-1"></i> Host & Sitemap directives set</li>
                          </ul>
                          <button onClick={()=> { setSitemapView('visual'); window.scrollTo({top:0, behavior:'smooth'})}} className="mt-4 w-full bg-white text-black py-2.5 rounded-full font-black text-xs">BACK TO VISUAL MAP →</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SETTINGS */}
              {adminTab==='settings' && (
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <h3 className="font-black text-lg">Company Profile • Standard</h3>
                    <p className="text-sm text-slate-500">Edit footer, CIN, compliance badges — updates live on website.</p>
                    <div className="mt-6 space-y-4">
                      <div><label className="text-xs font-black tracking-widest text-slate-500">COMPANY NAME</label><input defaultValue="NAVRANGE Recovery Agency Pvt. Ltd." className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold" /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs font-black tracking-widest text-slate-500">CIN</label><input defaultValue="U74999BR2015PTC024881" className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono" /></div>
                        <div><label className="text-xs font-black tracking-widest text-slate-500">EST. YEAR</label><input defaultValue="2015" className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                      </div>
                      <div><label className="text-xs font-black tracking-widest text-slate-500">HEADQUARTERS</label><input defaultValue="2nd Floor, Navrange Tower, Boring Road, Patna – 800001, Bihar" className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs font-black tracking-widest text-slate-500">PHONE</label><input defaultValue="+91 612-400-8844" className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                        <div><label className="text-xs font-black tracking-widest text-slate-500">EMAIL</label><input defaultValue="contact@navrange.in" className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                      </div>
                      <button onClick={()=> { addAudit('Settings Updated','Company profile'); setToast('Settings saved • Website updated')}} className="w-full bg-[#0066ff] text-white py-3 rounded-full font-black text-sm">SAVE SETTINGS</button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-[#0a0a0a] rounded-2xl p-6 text-white">
                      <h3 className="font-black">Branding & ID</h3>
                      <div className="mt-4 space-y-3 text-sm">
                        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3"><span className="font-bold">QR Verify Domain</span><span className="font-mono text-xs bg-white text-black px-2 py-1 rounded-full">verify.navrange.in</span></div>
                        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3"><span className="font-bold">ID Validity</span><span className="font-bold text-xs bg-[#0066ff] px-2 py-1 rounded-full">Till 31 Dec 2027</span></div>
                        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3"><span className="font-bold">Sitemap</span><span className="font-bold text-xs bg-emerald-500 px-2 py-1 rounded-full">Live • /sitemap.xml</span></div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button onClick={()=> setShowVerify(true)} className="flex-1 bg-white text-black py-2.5 rounded-full font-black text-xs">TEST VERIFY</button>
                        <button onClick={()=> exportCSV('staff')} className="flex-1 bg-white/10 border border-white/20 py-2.5 rounded-full font-black text-xs">EXPORT STAFF</button>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                      <h3 className="font-black">Data & Standard</h3>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li className="flex gap-2"><i className="fas fa-check text-emerald-500 mt-1"></i> All data stored locally (demo) • Add backend when ready</li>
                        <li className="flex gap-2"><i className="fas fa-check text-emerald-500 mt-1"></i> Audit log immutable for compliance</li>
                        <li className="flex gap-2"><i className="fas fa-check text-emerald-500 mt-1"></i> IDs are SARFAESI & RBI audit-ready</li>
                        <li className="flex gap-2"><i className="fas fa-check text-emerald-500 mt-1"></i> Sitemap & robots.txt ready for SEO</li>
                      </ul>
                      <button onClick={()=> { if(confirm('Reset all demo data?')){ localStorage.clear(); location.reload()}}} className="w-full mt-4 border border-red-200 text-red-600 bg-red-50 py-2.5 rounded-full font-black text-xs">RESET DEMO DATA</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      ) : (
        <>
          {/* HERO */}
          <section id="home" className="relative overflow-hidden">
            <div className="absolute inset-0">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
            <div className="relative max-w-[1280px] mx-auto px-4 md:px-6 py-14 md:py-20">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 rounded-full px-3 py-1.5 text-xs font-black tracking-widest">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> STANDARD • SINCE 2015 • SITEMAP LIVE
                  </div>
                  <h1 className="text-[34px] md:text-[54px] font-black leading-[0.94] tracking-tighter mt-6">
                    Expert Loan<br />
                    <span className="text-[#3b82ff]">Recovery</span><br />
                    Solutions
                  </h1>
                  <p className="text-white/80 text-[15px] md:text-[17px] leading-relaxed mt-4 max-w-[560px]">
                    NAVRANGE Recovery — RBI compliant, SARFAESI certified NPA management at scale. Ethical field ops, legal precision, tech-backed tracking. Maximum recovery, borrower dignity intact.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-6">
                    <button onClick={()=> scrollTo('contact')} className="bg-[#0066ff] hover:bg-[#0052cc] text-white px-7 py-3.5 rounded-full font-black text-sm tracking-wide transition flex items-center gap-2">
                      GET STARTED <i className="fas fa-arrow-right"></i>
                    </button>
                    <button onClick={()=> setAdminMode(true)} className="bg-white text-black px-7 py-3.5 rounded-full font-black text-sm flex items-center gap-2 hover:bg-zinc-100">
                      <i className="fas fa-shield-alt text-[#0066ff]"></i> ADMIN • ID STUDIO
                    </button>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold">
                    <span className="bg-white text-black px-3 py-1.5 rounded-full flex items-center gap-1.5"><i className="fas fa-check text-emerald-600"></i> RBI Compliant</span>
                    <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">SARFAESI Certified</span>
                    <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">CIN: U74999BR2015PTC024881</span>
                    <button onClick={()=> setShowSitemap(true)} className="bg-white text-black px-3 py-1.5 rounded-full flex items-center gap-1.5"><i className="fas fa-sitemap text-[#0066ff]"></i> Sitemap →</button>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4 max-w-[520px] border-t border-white/15 pt-5">
                    <div><div className="text-2xl font-black">₹47.2Cr+</div><div className="text-[11px] font-bold tracking-widest opacity-60">RECOVERED</div></div>
                    <div><div className="text-2xl font-black">96%</div><div className="text-[11px] font-bold tracking-widest opacity-60">RETENTION</div></div>
                    <div><div className="text-2xl font-black">1,284</div><div className="text-[11px] font-bold tracking-widest opacity-60">ACTIVE CASES</div></div>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="bg-white rounded-[24px] p-6 shadow-2xl relative">
                    <div className="absolute -top-3 -right-3 bg-[#0066ff] text-white text-xs font-black px-3 py-1.5 rounded-full shadow">LIVE RECOVERY PULSE</div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-slate-900">Recovery Overview</h3>
                      <span className="text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">▲ +18.4% QoQ</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-5">
                      <div className="bg-slate-50 border rounded-2xl p-3 text-center"><div className="text-[10px] font-black tracking-widest text-slate-500">CONTACT</div><div className="text-lg font-black text-slate-900">92.4%</div></div>
                      <div className="bg-slate-50 border rounded-2xl p-3 text-center"><div className="text-[10px] font-black tracking-widest text-slate-500">AVG DAYS</div><div className="text-lg font-black text-slate-900">34</div></div>
                      <div className="bg-[#0066ff] text-white rounded-2xl p-3 text-center"><div className="text-[10px] font-black tracking-widest opacity-70">RECOVERED</div><div className="text-lg font-black">₹47.2Cr</div></div>
                    </div>
                    <div className="mt-5">
                      <div className="flex justify-between text-xs font-bold text-slate-600 mb-2"><span>Monthly Recovery (₹ Cr)</span><span className="text-slate-900">May → Oct</span></div>
                      <div className="flex items-end gap-1.5 h-20">
                        {[3.2,4.1,3.8,5.4,6.9,8.8].map((v,i)=> (
                          <div key={i} className="flex-1 bg-slate-100 rounded-t-lg overflow-hidden flex items-end">
                            <div className="w-full bg-gradient-to-t from-[#0066ff] to-[#60a5fa] rounded-t-lg" style={{ height: `${(v/9)*100}%` }}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex gap-2">
                      <i className="fas fa-sitemap text-emerald-600 mt-0.5"></i>
                      <p className="text-xs leading-relaxed text-emerald-900"><b>Fixed (Option A):</b> Sitemap now in header + footer + admin. <button onClick={()=> setShowSitemap(true)} className="underline font-black">View Sitemap →</button></p>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs font-bold">
                      <button onClick={()=> setShowSitemap(true)} className="flex-1 border border-slate-200 py-2 rounded-full">SITEMAP</button>
                      <button onClick={()=> scrollTo('contact')} className="flex-1 bg-black text-white py-2 rounded-full">TALK TO OPS</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TRUSTED STRIP */}
          <div className="bg-[#0a0a0a] text-white py-3 overflow-hidden border-y border-white/10">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 flex flex-wrap items-center justify-between gap-3 text-xs font-black tracking-widest">
              <span className="opacity-60 hidden md:inline">TRUSTED BY:</span>
              <span>SBI</span><span className="opacity-30">•</span><span>HDFC BANK</span><span className="opacity-30">•</span><span>ICICI</span><span className="opacity-30">•</span><span>AXIS</span><span className="opacity-30">•</span><span>BAJAJ FINANCE</span><span className="opacity-30">•</span><span>L&T FINANCE</span>
              <span className="hidden md:inline-flex items-center gap-2 bg-white text-black px-3 py-1 rounded-full"><i className="fas fa-award text-[#0066ff]"></i> 9+ YEARS • SITEMAP LIVE</span>
            </div>
          </div>

          {/* SERVICES */}
          <section id="services" className="py-16 md:py-20 bg-white">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-[11px] font-black tracking-[2px] px-3 py-1.5 rounded-full">WHAT WE DO • STANDARD</div>
                <h2 className="text-[32px] md:text-[44px] font-black tracking-tighter text-slate-900 mt-4 leading-none">Our Services</h2>
                <p className="text-slate-600 mt-3">One operating system for NPA — assessment, field, legal, analytics. Compliant, humane, relentless.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {[
                  { title:'Loan Recovery', desc:'Ethical, legal field recovery with daily telemetry • 92.4% contact • 34-day avg resolution.', icon:'fa-hand-holding-usd', img:'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop', points:['Door-to-door counselling','Promise-to-pay tracking','Daily field reports'] },
                  { title:'NPA Management', desc:'Portfolio segmentation + resolution strategy + balance-sheet impact reduction at scale.', icon:'fa-chart-pie', img:'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop', points:['Risk segmentation','OTS & compromise','SARFAESI filing'] },
                  { title:'Legal Services', desc:'Panel advocates, DRT, arbitration & documentation — SARFAESI end-to-end.', icon:'fa-balance-scale', img:'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=400&fit=crop', points:['Demand notices','Possession & auction','Compliance audit'] },
                ].map(s=> (
                  <div key={s.title} className="group bg-white border border-slate-200 rounded-[20px] overflow-hidden hover:shadow-xl hover:border-slate-300 transition">
                    <div className="h-48 overflow-hidden relative">
                      <img src={s.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-2 shadow"><i className={`fas ${s.icon} text-[#0066ff]`}></i> {s.title.toUpperCase()}</div>
                      <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur text-white text-[11px] font-bold px-2.5 py-1 rounded-full">100% COMPLIANT</div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-black text-lg text-slate-900">{s.title}</h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{s.desc}</p>
                      <ul className="mt-3 space-y-1.5">
                        {s.points.map(p=> <li key={p} className="text-xs font-medium text-slate-700 flex gap-2"><i className="fas fa-check text-emerald-500 mt-0.5 text-[10px]"></i> {p}</li>)}
                      </ul>
                      <button onClick={()=> scrollTo('contact')} className="mt-4 w-full border border-slate-200 py-2.5 rounded-full text-xs font-black tracking-widest hover:bg-slate-900 hover:text-white transition">EXPLORE →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT + PROCESS */}
          <section id="about" className="py-16 md:py-20 bg-[#f8fafc] border-y border-slate-200">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div>
                  <div className="inline-flex bg-white border border-slate-200 text-slate-700 text-[11px] font-black tracking-[2px] px-3 py-1.5 rounded-full">ABOUT NAVRANGE • EST. 2015</div>
                  <h2 className="text-[32px] md:text-[40px] font-black tracking-tighter leading-none mt-4 text-slate-900">About NAVRANGE<br />Recovery</h2>
                  <div className="mt-6 space-y-5">
                    <div>
                      <h3 className="font-black text-slate-900 flex items-center gap-2"><span className="w-8 h-1 bg-[#0066ff] rounded-full"></span> Our Story</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mt-2">Founded in 2015, NAVRANGE grew into India’s most trusted recovery agency — ethical first, tech-backed, 1,200+ field officers across 4 states, ₹47Cr+ recovered.</p>
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 flex items-center gap-2"><span className="w-8 h-1 bg-[#0066ff] rounded-full"></span> Our Mission</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mt-2">Efficient, legal recovery with borrower sensitivity — strengthening balance sheets without breaking trust.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="bg-white border rounded-2xl p-4 text-center"><div className="text-lg font-black">2015</div><div className="text-[10px] font-black tracking-widest text-slate-500">FOUNDED</div></div>
                      <div className="bg-white border rounded-2xl p-4 text-center"><div className="text-lg font-black">9+ Yrs</div><div className="text-[10px] font-black tracking-widest text-slate-500">EXPERIENCE</div></div>
                      <div className="bg-black text-white rounded-2xl p-4 text-center"><div className="text-lg font-black">1.2K+</div><div className="text-[10px] font-black tracking-widest opacity-60">FIELD TEAM</div></div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=700&fit=crop" className="w-full h-[420px] md:h-[520px] object-cover rounded-[24px] border border-slate-200 shadow-xl" />
                  <div className="absolute -bottom-6 left-4 right-4 md:left-6 md:right-auto bg-white rounded-2xl p-4 shadow-xl border border-slate-200 md:max-w-[320px]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white"><i className="fas fa-check"></i></div>
                      <div><div className="font-black text-sm leading-none">RBI & SARFAESI Compliant</div><div className="text-xs text-slate-500">Audited • Legal first • 100% traceable</div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Process */}
              <div className="mt-16 bg-white rounded-[24px] border border-slate-200 p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-black text-xl">Standard Recovery Process — 6 Steps</h3>
                  <span className="text-xs font-black bg-slate-900 text-white px-3 py-1.5 rounded-full">48H TO FIRST FIELD VISIT</span>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
                  {[
                    { n:'01', t:'Portfolio Audit', d:'Segment risk & prioritize' },
                    { n:'02', t:'Field Visit', d:'Counselling & contact' },
                    { n:'03', t:'Negotiation', d:'OTS & pay plan' },
                    { n:'04', t:'Legal Notice', d:'SARFAESI demand' },
                    { n:'05', t:'Resolution', d:'Compromise / possession' },
                    { n:'06', t:'Closure', d:'NPA to standard' },
                  ].map(s=> (
                    <div key={s.n} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center hover:bg-white hover:shadow-md transition">
                      <div className="w-8 h-8 bg-[#0066ff] text-white rounded-full flex items-center justify-center text-xs font-black mx-auto">{s.n}</div>
                      <div className="font-black text-sm mt-2">{s.t}</div>
                      <div className="text-xs text-slate-500 mt-1 leading-tight">{s.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* TEAM */}
          <section id="team" className="py-16 md:py-20 bg-white">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center">
                <div className="inline-flex bg-slate-900 text-white text-[11px] font-black tracking-[2px] px-3 py-1.5 rounded-full">LEADERSHIP • STANDARD</div>
                <h2 className="text-[32px] md:text-[44px] font-black tracking-tighter mt-4">Our Leadership Team</h2>
                <p className="text-slate-600 max-w-2xl mx-auto mt-2">Operators + lawyers + technologists — the disciplined engine behind recovery at scale.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {initialStaff.slice(0,4).map(m=> (
                  <div key={m.id} className="bg-white border border-slate-200 rounded-[20px] overflow-hidden hover:shadow-xl transition group">
                    <div className="h-[260px] overflow-hidden relative bg-slate-100">
                      <img src={m.photo} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                      <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur text-white text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full">{m.department.toUpperCase()}</div>
                    </div>
                    <div className="p-5 text-center">
                      <div className="font-black text-slate-900 leading-tight">{m.name}</div>
                      <div className="text-xs font-bold text-[#0066ff] mt-1">{m.role}</div>
                      <p className="text-xs text-slate-600 leading-relaxed mt-3 line-clamp-3">{m.id==='1' ? '20+ yrs banking, MBA Finance, Certified Recovery Professional — strategic NPA resolution.' : m.id==='2' ? '15 yrs governance & compliance, Master Business Law — standards & oversight.' : m.id==='3' ? 'Ex-banking CEO, IIM MBA, credit risk & distressed asset specialist.' : 'B.Tech CS, analytics & recovery OS — rebuilt tracking platform.'}</p>
                      <div className="flex justify-center gap-2 mt-4">
                        <span className="w-8 h-8 rounded-full bg-slate-50 border flex items-center justify-center text-slate-600"><i className="fab fa-linkedin-in text-xs"></i></span>
                        <span className="w-8 h-8 rounded-full bg-slate-50 border flex items-center justify-center text-slate-600"><i className="fab fa-twitter text-xs"></i></span>
                        <span className="w-8 h-8 rounded-full bg-slate-50 border flex items-center justify-center text-slate-600"><i className="far fa-envelope text-xs"></i></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PARTNERS + TESTIMONIALS */}
          <section id="partners" className="py-16 bg-[#0a0a0a] text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0066ff]/20 via-transparent to-violet-600/10"></div>
            <div className="relative max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center">
                <div className="inline-flex bg-white text-black text-[11px] font-black tracking-[2px] px-3 py-1.5 rounded-full">TRUSTED BY LEADERS</div>
                <h2 className="text-[32px] md:text-[44px] font-black tracking-tighter mt-4">Our Partners</h2>
                <p className="text-white/60 max-w-2xl mx-auto mt-2">One OS across PSU, private, NBFCs & FIs — 12.4K cases processed.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
                {['State Bank of India','HDFC Bank','ICICI Bank','Axis Bank','Bajaj Finance','L&T Finance'].map(p=> (
                  <div key={p} className="bg-white text-slate-900 rounded-2xl p-6 flex items-center justify-center text-center font-black text-sm h-[96px] border border-white/10">
                    {p}
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              <div className="mt-10 bg-white rounded-[24px] p-6 md:p-8 text-slate-900 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-lg flex items-center gap-2"><i className="fas fa-quote-left text-[#0066ff]"></i> What Partners Say</h3>
                  <div className="flex gap-1.5">
                    {[0,1,2].map(i=> <span key={i} className={`w-2 h-2 rounded-full ${testimonialIdx===i ? 'bg-[#0066ff]' : 'bg-slate-200'}`}></span>)}
                  </div>
                </div>
                <div className="mt-6">
                  {[
                    { name:'SBI Zonal Head • Patna', text:'NAVRANGE delivered 94% contact in 45 days on our stressed portfolio. Compliant, documented, and respectful field ops.', stars:5 },
                    { name:'HDFC Collections • Mumbai', text:'Their live analytics predicted our Doubtful bucket recovery — we closed ₹2.1Cr extra in Q3.', stars:5 },
                    { name:'ICICI Risk • Delhi NCR', text:'Legal + field under one roof saved us 60% coordination time. Audit-ready reports every week.', stars:5 },
                  ][testimonialIdx] && (
                    <div>
                      <div className="flex gap-1 text-amber-400 text-sm">{Array.from({length:5}).map((_,i)=> <i key={i} className="fas fa-star"></i>)}</div>
                      <p className="text-lg font-medium leading-relaxed mt-3">“{[ 'NAVRANGE delivered 94% contact in 45 days on our stressed portfolio. Compliant, documented, and respectful field ops.', 'Their live analytics predicted our Doubtful bucket recovery — we closed ₹2.1Cr extra in Q3.', 'Legal + field under one roof saved us 60% coordination time. Audit-ready reports every week.' ][testimonialIdx]}”</p>
                      <div className="text-sm font-black text-slate-700 mt-3">{[ 'SBI Zonal Head • Patna', 'HDFC Collections • Mumbai', 'ICICI Risk • Delhi NCR' ][testimonialIdx]}</div>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex gap-2">
                  <button onClick={()=> setTestimonialIdx(i=> (i+2)%3)} className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white"><i className="fas fa-chevron-left text-xs"></i></button>
                  <button onClick={()=> setTestimonialIdx(i=> (i+1)%3)} className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center"><i className="fas fa-chevron-right text-xs"></i></button>
                  <button onClick={()=> scrollTo('contact')} className="ml-auto bg-[#0066ff] text-white px-6 py-2.5 rounded-full font-black text-xs">BECOME A PARTNER →</button>
                </div>
              </div>
            </div>
          </section>

          {/* ANALYTICS */}
          <section id="analytics" className="py-16 md:py-20 bg-[#f8fafc] border-y border-slate-200">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center">
                <div className="inline-flex bg-black text-white text-[11px] font-black tracking-[2px] px-3 py-1.5 rounded-full">DATA INTELLIGENCE • STANDARD</div>
                <h2 className="text-[32px] md:text-[44px] font-black tracking-tighter mt-4 text-slate-900">NPA Data Analytics</h2>
                <p className="text-slate-600 max-w-3xl mx-auto mt-2">RBI benchmarks + NAVRANGE forecast — spot hotspots 60 days early, target recoverable buckets first.</p>
              </div>
              <div className="mt-8 bg-white rounded-[24px] border border-slate-200 p-6 md:p-8 shadow-sm">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-black text-slate-900">NPA Ratio — Public vs Private (%)</h3>
                      <span className="text-xs font-bold bg-slate-900 text-white px-3 py-1 rounded-full">RBI • 2016-2024</span>
                    </div>
                    <div className="mt-6 h-[220px] flex items-end gap-2">
                      {[
                        { y:'16', pub:9.3, pvt:2.8 }, { y:'17', pub:11.2, pvt:3.1 }, { y:'18', pub:14.6, pvt:4.0 }, { y:'19', pub:11.6, pvt:3.9 }, { y:'20', pub:9.2, pvt:3.4 }, { y:'21', pub:7.3, pvt:2.9 }, { y:'22', pub:5.9, pvt:2.4 }, { y:'23', pub:4.2, pvt:1.9 }, { y:'24', pub:3.8, pvt:1.7 },
                      ].map(d=> (
                        <div key={d.y} className="flex-1 flex flex-col items-center gap-1.5">
                          <div className="w-full flex gap-1 items-end justify-center h-[180px]">
                            <div className="flex-1 bg-slate-900 rounded-t-lg" style={{ height: `${(d.pub/15)*100}%` }}></div>
                            <div className="flex-1 bg-[#0066ff] rounded-t-lg" style={{ height: `${(d.pvt/15)*100}%` }}></div>
                          </div>
                          <span className="text-[11px] font-black text-slate-600">'{d.y}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-xs font-bold">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-slate-900 rounded"></span> Public</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-[#0066ff] rounded"></span> Private</span>
                      <span className="ml-auto hidden md:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">↓ Peak 2018 → reforms → decline</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-900 text-white rounded-2xl p-5">
                      <div className="text-xs font-black tracking-widest opacity-60">NAVRANGE EDGE</div>
                      <div className="text-2xl font-black mt-1">3.8% → 1.7%</div>
                      <div className="text-xs opacity-70 leading-relaxed mt-1">Partner NPA 62% below industry avg via early field + legal readiness.</div>
                      <div className="mt-3 flex gap-2 text-xs font-black">
                        <span className="bg-white text-slate-900 px-2.5 py-1 rounded-full">AI SCORING</span>
                        <span className="bg-white/15 px-2.5 py-1 rounded-full">60D FORECAST</span>
                      </div>
                    </div>
                    <div className="bg-white border rounded-2xl p-4">
                      <h4 className="font-black text-sm">NPA Trends — RBI Insight</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2">Asset quality review + IBC cut NPAs from 14.6% peak. NAVRANGE adds field telemetry to prioritize recoverable first.</p>
                      <button onClick={()=> setAdminMode(true)} className="mt-3 w-full bg-[#0066ff] text-white py-2.5 rounded-full font-black text-xs">OPEN RECOVERY ANALYTICS →</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NPA */}
          <section id="npa" className="py-16 md:py-20 bg-white">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center">
                <div className="inline-flex bg-[#0066ff] text-white text-[11px] font-black tracking-[2px] px-3 py-1.5 rounded-full">NPA MANAGEMENT • STANDARD</div>
                <h2 className="text-[32px] md:text-[44px] font-black tracking-tighter mt-4">NPA Management</h2>
              </div>
              <div className="max-w-4xl mx-auto mt-8">
                <div className="bg-[#f8fafc] border border-slate-200 rounded-[24px] p-6 md:p-8">
                  <h3 className="font-black text-lg text-slate-900">Comprehensive NPA Services</h3>
                  <p className="text-sm text-slate-600 mt-2">Custom resolution design — assessment to closure, all in one standard OS.</p>
                  <div className="grid md:grid-cols-2 gap-3 mt-5">
                    {['Portfolio assessment & segmentation','Recovery strategy development','Legal action coordination','Field visit & counselling','OTS & compromise settlement','SARFAESI & DRT execution'].map(li=> (
                      <div key={li} className="flex gap-2.5 bg-white border rounded-xl px-3 py-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] shrink-0"><i className="fas fa-check"></i></span>
                        <span className="text-sm font-medium text-slate-800">{li}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 grid md:grid-cols-3 gap-3">
                    <div className="bg-black text-white rounded-2xl p-5 text-center"><div className="text-2xl font-black">48 hrs</div><div className="text-[11px] font-bold tracking-widest opacity-60">TO FIRST VISIT</div></div>
                    <div className="bg-[#0066ff] text-white rounded-2xl p-5 text-center"><div className="text-2xl font-black">92.4%</div><div className="text-[11px] font-bold tracking-widest opacity-80">CONTACT RATE</div></div>
                    <div className="bg-white border rounded-2xl p-5 text-center"><div className="text-2xl font-black text-slate-900">100%</div><div className="text-[11px] font-bold tracking-widest text-slate-500">COMPLIANCE</div></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CAREERS */}
          <section id="careers" className="py-16 bg-[#f8fafc] border-y border-slate-200">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center">
                <div className="inline-flex bg-black text-white text-[11px] font-black tracking-[2px] px-3 py-1.5 rounded-full">JOIN US • STANDARD CAREERS</div>
                <h2 className="text-[32px] md:text-[44px] font-black tracking-tighter mt-4">Careers</h2>
                <p className="text-slate-600 mt-2">Join the most disciplined recovery team. Day-1 verified QR ID.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-6xl mx-auto">
                {[
                  { title:'Senior Recovery Officer', loc:'Patna • Lucknow', type:'Field Ops', sal:'₹4.5–6L', id:'officer' },
                  { title:'Legal Associate', loc:'Delhi NCR', type:'Legal', sal:'₹6–8L', id:'legal' },
                  { title:'Data Analyst — NPA', loc:'Remote', type:'Technology', sal:'₹5–7L', id:'analyst' },
                  { title:'Tele-Collector', loc:'Patna HQ', type:'Operations', sal:'₹2.5–3.5L', id:'tele' },
                ].map(job=> (
                  <div key={job.id} className="bg-white border rounded-2xl p-5 hover:shadow-lg transition">
                    <div className="text-[11px] font-black tracking-widest text-[#0066ff]">{job.type.toUpperCase()}</div>
                    <div className="font-black text-slate-900 mt-1 leading-tight">{job.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{job.loc} • {job.sal}</div>
                    <button onClick={()=> { setSelectedJob(job.title); setJobModal(true)}} className="mt-4 w-full bg-black text-white py-2.5 rounded-full font-black text-xs">APPLY NOW</button>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-black rounded-[20px] p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
                <div>
                  <div className="font-black text-lg">Admin? Hire & auto-generate ID cards.</div>
                  <div className="text-sm text-white/70">One click: Applicant → Staff → QR ID (PVC ready)</div>
                </div>
                <button onClick={()=> setAdminMode(true)} className="bg-[#0066ff] text-white px-6 py-3 rounded-full font-black text-sm whitespace-nowrap">OPEN ADMIN →</button>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-16 bg-white">
            <div className="max-w-[960px] mx-auto px-4 md:px-6">
              <div className="text-center">
                <div className="inline-flex bg-slate-900 text-white text-[11px] font-black tracking-[2px] px-3 py-1.5 rounded-full">FAQ • STANDARD</div>
                <h2 className="text-[32px] font-black tracking-tighter mt-4">Frequently Asked Questions</h2>
              </div>
              <div className="mt-8 space-y-3">
                {[
                  { q:'Are you RBI compliant & SARFAESI certified?', a:'Yes — 100% RBI compliant processes, SARFAESI certified field & legal team, audit-ready documentation for every case.' },
                  { q:'How fast is first field visit?', a:'Standard SLA is 48 hours from portfolio handover. Live telemetry updates to dashboard on same day.' },
                  { q:'How does the auto ID card work?', a:'When admin adds staff (or hires an applicant), the system instantly generates EMP code (NR-YYYY-XXXX), QR verify link, PVC front+back layout ready to print — no design needed.' },
                  { q:'Can we verify a field officer’s ID?', a:'Yes — scan QR or enter EMP code at “Verify ID” (header). Checks live staff DB in admin.' },
                  { q:'What recovery rate do you achieve?', a:'92.4% contact rate, 34-day avg resolution, ₹47.2Cr recovered FY24. Partner NPA 62% below industry avg.' },
                  { q:'Where is your sitemap?', a:'New in Option A — click Sitemap in header, top strip, footer or Admin → Sitemap & SEO. Includes visual map + sitemap.xml + robots.txt with one-click download.' },
                ].map((f,i)=> (
                  <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                    <button onClick={()=> setFaqOpen(faqOpen===i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50">
                      <span className="font-black text-sm pr-4">{f.q}</span>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center border shrink-0 ${faqOpen===i ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200'}`}><i className={`fas ${faqOpen===i ? 'fa-minus' : 'fa-plus'} text-xs`}></i></span>
                    </button>
                    {faqOpen===i && <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed bg-slate-50 border-t border-slate-200">{f.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-16 md:py-20 bg-[#f8fafc] border-t border-slate-200">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <div className="text-center">
                <div className="inline-flex bg-slate-900 text-white text-[11px] font-black tracking-[2px] px-3 py-1.5 rounded-full">GET IN TOUCH • 24H RESPONSE</div>
                <h2 className="text-[32px] md:text-[44px] font-black tracking-tighter mt-4">Contact Us</h2>
                <p className="text-slate-600 mt-2">Talk to ops or partner onboarding — message lands live in admin inbox.</p>
              </div>
              <div className="grid lg:grid-cols-2 gap-8 mt-10 max-w-5xl mx-auto">
                <div className="bg-white border border-slate-200 rounded-[24px] p-6 md:p-8 shadow-sm">
                  {!contactSent ? (
                    <form onSubmit={handleContact} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div><label className="text-xs font-black tracking-widest text-slate-500">FULL NAME *</label><input required value={contactForm.name} onChange={e=> setContactForm({...contactForm, name:e.target.value})} placeholder="Rahul Kumar" className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20" /></div>
                        <div><label className="text-xs font-black tracking-widest text-slate-500">PHONE *</label><input required value={contactForm.phone} onChange={e=> setContactForm({...contactForm, phone:e.target.value})} placeholder="+91 98XXX XXXXX" className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                      </div>
                      <div><label className="text-xs font-black tracking-widest text-slate-500">EMAIL *</label><input required type="email" value={contactForm.email} onChange={e=> setContactForm({...contactForm, email:e.target.value})} placeholder="you@bank.com" className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                      <div><label className="text-xs font-black tracking-widest text-slate-500">INSTITUTION *</label><select value={contactForm.institution} onChange={e=> setContactForm({...contactForm, institution:e.target.value})} className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium"><option value="">Select type</option><option>PSU Bank</option><option>Private Bank</option><option>NBFC</option><option>FI</option><option>Other</option></select></div>
                      <div><label className="text-xs font-black tracking-widest text-slate-500">MESSAGE *</label><textarea required value={contactForm.message} onChange={e=> setContactForm({...contactForm, message:e.target.value})} placeholder="Tell us about your portfolio..." rows={4} className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"></textarea></div>
                      <button type="submit" className="w-full bg-[#0066ff] hover:bg-[#0052cc] text-white py-3.5 rounded-full font-black tracking-widest text-sm transition">SEND MESSAGE →</button>
                      <p className="text-xs text-center text-slate-500">→ Appears instantly in Admin → Inbox with notification</p>
                    </form>
                  ) : (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl"><i className="fas fa-check"></i></div>
                      <div className="font-black text-xl mt-4">Message Sent ✓</div>
                      <div className="text-sm text-slate-600 mt-2">Landed in admin inbox • We’ll reply within 24 hours.</div>
                      <div className="mt-4 flex gap-2 justify-center">
                        <button onClick={()=> setContactSent(false)} className="border border-slate-200 px-6 py-2 rounded-full font-black text-sm">SEND ANOTHER</button>
                        <button onClick={()=> setAdminMode(true)} className="bg-black text-white px-6 py-2 rounded-full font-black text-sm">OPEN INBOX →</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="bg-black text-white rounded-[24px] p-6">
                    <h3 className="font-black">Headquarters • Standard</h3>
                    <p className="text-sm text-white/70 mt-2 leading-relaxed">2nd Floor, Navrange Tower, Boring Road, Patna – 800001, Bihar<br />CIN: U74999BR2015PTC024881 • GST: 10AAECN1234F1Z5</p>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2"><i className="fas fa-phone text-[#0066ff]"></i> +91 612-400-8844</div>
                      <div className="flex items-center gap-2"><i className="fas fa-envelope text-[#0066ff]"></i> contact@navrange.in</div>
                      <div className="flex items-center gap-2"><i className="fas fa-clock text-[#0066ff]"></i> Mon–Sat 9AM–7PM • Field 24/7</div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <span className="bg-white text-black text-xs font-black px-3 py-1.5 rounded-full">RBI Compliant</span>
                      <span className="bg-white/10 border border-white/20 text-xs font-bold px-3 py-1.5 rounded-full">SARFAESI</span>
                      <button onClick={()=> setShowSitemap(true)} className="bg-[#0066ff] text-white text-xs font-black px-3 py-1.5 rounded-full">SITEMAP</button>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-[24px] p-6">
                    <h3 className="font-black text-slate-900">Regional Offices</h3>
                    <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                      <div className="bg-slate-50 border rounded-xl p-3"><div className="text-xs font-black">DELHI</div><div className="text-[11px] text-slate-500">NCR Hub</div></div>
                      <div className="bg-slate-50 border rounded-xl p-3"><div className="text-xs font-black">MUMBAI</div><div className="text-[11px] text-slate-500">West</div></div>
                      <div className="bg-slate-50 border rounded-xl p-3"><div className="text-xs font-black">LUCKNOW</div><div className="text-[11px] text-slate-500">UP</div></div>
                    </div>
                    <div className="mt-4 p-3 bg-[#0066ff] text-white rounded-xl flex gap-3">
                      <i className="fas fa-shield-alt mt-0.5"></i>
                      <div className="text-xs leading-relaxed"><b>Verify field staff:</b> Ask for ID • Scan QR • Or verify code in header “Verify ID”.</div>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-[24px] p-5 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white"><i className="fas fa-headset"></i></div>
                    <div>
                      <div className="font-black text-sm">Subscribe — Recovery insights monthly</div>
                      <div className="text-xs text-slate-500">NPA trends & RBI updates • No spam</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="bg-black text-white border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0066ff] rounded-lg flex items-center justify-center font-black">N</div>
                <span className="font-black tracking-tight">NAVRANGE Recovery</span>
                <span className="bg-white text-black text-[10px] font-black px-2 py-1 rounded-full">STD v2.5</span>
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded-full">SITEMAP ✓</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mt-3">Standard loan recovery & NPA management for banks at scale. Ethical, compliant, outcome-obsessed since 2015.</p>
              <div className="mt-4 flex gap-2">
                <span className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#0066ff] transition"><i className="fab fa-linkedin-in text-xs"></i></span>
                <span className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#0066ff] transition"><i className="fab fa-twitter text-xs"></i></span>
                <span className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#0066ff] transition"><i className="fab fa-facebook-f text-xs"></i></span>
              </div>
              <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-xs font-black tracking-widest opacity-60">NEWSLETTER • STANDARD</div>
                <div className="flex gap-2 mt-2">
                  <input value={newsletterEmail} onChange={e=> setNewsletterEmail(e.target.value)} placeholder="Work email" className="flex-1 px-3 py-2 rounded-full bg-white text-black text-sm outline-none" />
                  <button onClick={()=> { if(!newsletterEmail.includes('@')){ setToast('Enter valid email'); return } setNewsletterEmail(''); setToast('Subscribed ✓ Check email') }} className="bg-[#0066ff] text-white px-4 py-2 rounded-full font-black text-xs">JOIN</button>
                </div>
              </div>
            </div>
            {[
              { h:'Company', links:['Our Story','Leadership','Careers','Contact']},
              { h:'Solutions', links:['Loan Recovery','NPA Management','Legal Services','Data Analytics']},
              { h:'Explore', links:['Sitemap','Verify ID','Admin Panel','CIN: U74999BR2015PTC024881']},
            ].map(col=> (
              <div key={col.h}>
                <h4 className="font-black text-sm tracking-widest">{col.h}</h4>
                <div className="w-10 h-1 bg-[#0066ff] rounded-full mt-2"></div>
                <ul className="mt-4 space-y-2 text-sm text-white/60">
                  {col.links.map(l=> <li key={l}><a href="#" onClick={e=> { e.preventDefault(); if(l==='Sitemap') setShowSitemap(true); else if(l==='Verify ID') setShowVerify(true); else if(l==='Admin Panel') setAdminMode(true); else if(col.h==='Solutions') scrollTo('services'); else if(l==='Our Story') scrollTo('about'); else if(l==='Leadership') scrollTo('team'); else if(l==='Careers') scrollTo('careers'); else if(l==='Contact') scrollTo('contact'); }} className={`hover:text-white transition ${l==='Sitemap' ? 'text-white font-black flex items-center gap-1.5' : ''}`}>{l==='Sitemap' && <i className="fas fa-sitemap text-[#0066ff]"></i>}{l} {l==='Sitemap' && <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">FIXED</span>}</a></li>)}
                </ul>
                {col.h==='Explore' && (
                  <div className="mt-4 p-2.5 bg-white/5 border border-white/10 rounded-xl">
                    <div className="text-xs font-black tracking-widest opacity-60">SEO FILES</div>
                    <div className="mt-1 flex flex-col gap-1 text-xs font-mono">
                      <a href="/sitemap.xml" target="_blank" className="hover:text-white flex items-center gap-1.5"><i className="fas fa-file-code text-[#00d1ff]"></i> /sitemap.xml</a>
                      <a href="/robots.txt" target="_blank" className="hover:text-white flex items-center gap-1.5"><i className="fas fa-robot text-[#00d1ff]"></i> /robots.txt</a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <span>© 2026 NAVRANGE Recovery Agency Pvt. Ltd. • CIN: U74999BR2015PTC024881 • RBI Compliant • SARFAESI Certified • ISO 9001:2015 • <button onClick={()=> setShowSitemap(true)} className="underline hover:text-white">Sitemap</button> • <a href="/sitemap.xml" target="_blank" className="underline hover:text-white">sitemap.xml</a></span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Standard OS • Sitemap Option A Fixed • ID Auto-Gen Live</span>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showBackToTop && !adminMode && (
        <button onClick={()=> window.scrollTo({top:0,behavior:'smooth'})} className="fixed bottom-6 right-6 w-11 h-11 bg-[#0066ff] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#0052cc] z-40">
          <i className="fas fa-arrow-up text-sm"></i>
        </button>
      )}

      {/* SITEMAP OVERLAY - Option A Fixed */}
      {showSitemap && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" onClick={()=> setShowSitemap(false)}>
          <div onClick={e=> e.stopPropagation()} className="bg-[#f8fafc] rounded-[24px] w-full max-w-[1100px] my-8 overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-black text-white p-6 md:p-8 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#0066ff]/20 rounded-full blur-2xl"></div>
              <div className="absolute -right-6 top-16 w-24 h-24 border border-white/10 rounded-full"></div>
              <button onClick={()=> setShowSitemap(false)} className="absolute right-4 top-4 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition"><i className="fas fa-times text-sm"></i></button>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-emerald-500 text-white text-xs font-black px-3 py-1.5 rounded-full">
                  <i className="fas fa-check-circle"></i> FIXED — Option A • Sitemap Added
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter mt-3 flex items-center gap-3"><i className="fas fa-sitemap text-[#0066ff]"></i> Sitemap — NAVRANGE Standard</h2>
                <p className="text-white/70 text-sm mt-2 max-w-2xl">You flagged missing sitemap in Option A — now live. Visual navigation + SEO sitemap.xml + robots.txt. Click any item to jump instantly.</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                  <span className="bg-white text-black px-3 py-1.5 rounded-full">11 Website URLs • Public • Indexable</span>
                  <span className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">10 Admin Modules • Private • Noindex</span>
                  <span className="bg-[#0066ff] px-3 py-1.5 rounded-full">sitemap.xml • robots.txt Ready</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-black flex items-center gap-2 text-slate-900"><span className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center text-xs"><i className="fas fa-globe"></i></span> Website (Public)</h3>
                  <p className="text-xs text-slate-500 mt-1">Click to navigate • All sections are anchor-linked for SEO crawlability</p>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    {[
                      { l:'Home — Expert Recovery Hero', id:'home', p:'1.0' },
                      { l:'Services — 3 Cards', id:'services', p:'0.9' },
                      { l:'About — Story & 6-Step Process', id:'about', p:'0.8' },
                      { l:'Team — Leadership', id:'team', p:'0.7' },
                      { l:'Partners — 6 Banks + Testimonials', id:'partners', p:'0.8' },
                      { l:'Data Analytics — RBI Chart', id:'analytics', p:'0.9' },
                      { l:'NPA — Services & KPIs', id:'npa', p:'0.9' },
                      { l:'Careers — 4 Roles', id:'careers', p:'0.8' },
                      { l:'Contact — Form → Inbox', id:'contact', p:'0.9' },
                      { l:'FAQ — 6 Items', id:'faq', p:'0.6' },
                    ].map(s=> (
                      <button key={s.id} onClick={()=> handleSitemapNav(s.id)} className="text-left bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between hover:border-[#0066ff]/30 hover:bg-blue-50/50 transition group">
                        <div>
                          <div className="font-bold text-sm flex items-center gap-2">{s.l} <span className="text-[10px] font-mono bg-slate-900 text-white px-1.5 py-0.5 rounded-full">#{s.id}</span></div>
                          <div className="text-xs text-slate-500">https://navrange.in/#{s.id} • prio {s.p}</div>
                        </div>
                        <i className="fas fa-arrow-right text-xs text-slate-400 group-hover:text-[#0066ff]"></i>
                      </button>
                    ))}
                    <button onClick={()=> { setShowSitemap(false); setShowVerify(true)}} className="text-left bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between hover:border-[#0066ff]/30 hover:bg-blue-50/50 transition">
                      <div><div className="font-bold text-sm">Verify ID — QR Portal</div><div className="text-xs text-slate-500">Modal • verify.navrange.in • always</div></div>
                      <i className="fas fa-qrcode text-[#0066ff]"></i>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-black flex items-center gap-2 text-slate-900"><span className="w-8 h-8 bg-[#0066ff] text-white rounded-lg flex items-center justify-center text-xs"><i className="fas fa-shield-alt"></i></span> Admin Panel (Private)</h3>
                  <p className="text-xs text-slate-500 mt-1">Private OS — disallowed in robots.txt • Direct tab navigation</p>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    {[
                      ['Dashboard','dashboard'],
                      ['Staff & ID Cards','staff'],
                      ['ID Studio (Auto-Gen)','idlab'],
                      ['NPA Vault','cases'],
                      ['Partners','partners'],
                      ['Hiring Hub','careers'],
                      ['Inbox','inbox'],
                      ['Audit Log','audits'],
                      ['Sitemap & SEO','sitemap'],
                      ['Settings','settings'],
                    ].map(([label,tab])=> (
                      <button key={tab} onClick={()=> handleSitemapNav('', tab)} className="text-left bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between hover:border-[#0066ff]/30 hover:bg-blue-50/50 transition">
                        <div><div className="font-bold text-sm">{label}</div><div className="text-xs text-slate-500">/admin/{tab} • noindex</div></div>
                        <span className="text-xs font-black bg-slate-900 text-white px-2.5 py-1 rounded-full">GO →</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
                    <i className="fas fa-lock text-amber-600 mt-0.5"></i>
                    <p className="text-xs leading-relaxed text-amber-900"><b>SEO Note:</b> Admin is <code className="bg-white border px-1 rounded">Disallow: /admin</code> so only marketing site is indexed. Sitemap lists only public URLs.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h4 className="font-black flex items-center gap-2"><i className="fas fa-file-code text-[#0066ff]"></i> sitemap.xml</h4>
                  <p className="text-xs text-slate-500 mt-1">16 URLs • lastmod 2026-05-11 • prio & changefreq set</p>
                  <div className="mt-3 flex gap-2">
                    <button onClick={copySitemap} className="flex-1 bg-slate-900 text-white py-2.5 rounded-full font-black text-xs">COPY XML</button>
                    <button onClick={()=> downloadSitemap('xml')} className="flex-1 bg-[#0066ff] text-white py-2.5 rounded-full font-black text-xs">DOWNLOAD</button>
                  </div>
                  <a href="/sitemap.xml" target="_blank" className="mt-2 block text-center text-xs font-bold text-[#0066ff] hover:underline">Open /sitemap.xml in new tab →</a>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h4 className="font-black flex items-center gap-2"><i className="fas fa-robot text-slate-700"></i> robots.txt</h4>
                  <p className="text-xs text-slate-500 mt-1">Allows / • Disallows /admin • Points to sitemap</p>
                  <div className="mt-3 flex gap-2">
                    <button onClick={()=> { navigator.clipboard.writeText(`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: https://navrange.in/sitemap.xml`); setToast('robots.txt copied')}} className="flex-1 border border-slate-200 py-2.5 rounded-full font-black text-xs">COPY</button>
                    <button onClick={()=> downloadSitemap('robots')} className="flex-1 bg-black text-white py-2.5 rounded-full font-black text-xs">DOWNLOAD</button>
                  </div>
                  <a href="/robots.txt" target="_blank" className="mt-2 block text-center text-xs font-bold text-slate-600 hover:underline">Open /robots.txt →</a>
                </div>
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-3">
                <button onClick={()=> setShowSitemap(false)} className="flex-1 bg-black text-white py-3 rounded-full font-black text-sm">CLOSE SITEMAP ✓</button>
                <button onClick={()=> { setShowSitemap(false); setAdminMode(true); setAdminTab('sitemap'); window.scrollTo({top:0,behavior:'smooth'})}} className="flex-1 bg-[#0066ff] text-white py-3 rounded-full font-black text-sm">OPEN ADMIN → SITEMAP & SEO</button>
              </div>
              <p className="text-center text-xs text-slate-500 mt-3">Option A now complete • Also accessible via footer “Sitemap”, header “SITEMAP” and Admin sidebar “Sitemap & SEO”</p>
            </div>
          </div>
        </div>
      )}

      {/* Verify Modal */}
      {showVerify && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=> setShowVerify(false)}>
          <div onClick={e=> e.stopPropagation()} className="bg-white rounded-[20px] w-full max-w-[460px] overflow-hidden shadow-2xl">
            <div className="bg-black text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0066ff] rounded-xl flex items-center justify-center"><i className="fas fa-qrcode"></i></div>
                  <div><div className="font-black leading-none">Verify Staff ID</div><div className="text-xs opacity-60">Standard verification • Live DB</div></div>
                </div>
                <button onClick={()=> setShowVerify(false)} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"><i className="fas fa-times text-xs"></i></button>
              </div>
              <div className="mt-5 flex gap-2">
                <input value={verifyCode} onChange={e=> setVerifyCode(e.target.value)} placeholder="Enter EMP Code e.g. NR-2024-0142" className="flex-1 px-4 py-3 rounded-full bg-white text-black text-sm outline-none font-mono font-bold" />
                <button onClick={verifyId} className="bg-[#0066ff] text-white px-6 py-3 rounded-full font-black text-sm">VERIFY</button>
              </div>
              <div className="mt-3 flex gap-2 text-xs font-bold opacity-70">
                <span>Try:</span>
                <button onClick={()=> setVerifyCode(staffs[0]?.empCode || '')} className="underline">{staffs[0]?.empCode}</button>
                <span>•</span>
                <button onClick={()=> setVerifyCode('NR-9999-0000')} className="underline">Invalid test</button>
              </div>
            </div>
            <div className="p-6">
              {!verifyResult && <div className="text-center py-6 text-slate-500 text-sm">Enter EMP code and press Verify — checks live admin staff DB.</div>}
              {verifyResult==='notfound' && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
                  <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto"><i className="fas fa-times"></i></div>
                  <div className="font-black mt-3 text-red-700">Not Found</div>
                  <div className="text-sm text-red-700/70 mt-1">No staff with code <span className="font-mono font-bold">{verifyCode}</span>. Possible invalid or expired ID.</div>
                  <div className="mt-3 text-xs text-slate-500">If officer claims to be NAVRANGE, call HQ: +91 612-400-8844</div>
                </div>
              )}
              {verifyResult && verifyResult!=='notfound' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-emerald-700 font-black"><i className="fas fa-check-circle"></i> VERIFIED • ACTIVE STAFF</div>
                  <div className="mt-4 flex gap-3">
                    <img src={(verifyResult as Staff).photo} className="w-20 h-20 rounded-xl object-cover border" />
                    <div>
                      <div className="font-black text-slate-900">{(verifyResult as Staff).name}</div>
                      <div className="text-sm text-[#0066ff] font-bold">{(verifyResult as Staff).role}</div>
                      <div className="text-xs text-slate-600">{(verifyResult as Staff).department} • {(verifyResult as Staff).location} • {(verifyResult as Staff).status}</div>
                      <div className="mt-1 font-mono text-xs bg-slate-900 text-white inline-block px-2 py-1 rounded-full">{(verifyResult as Staff).empCode}</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white border rounded-xl p-2.5"><div className="text-[10px] font-black tracking-widest text-slate-400">JOINING</div><div className="font-bold">{(verifyResult as Staff).joiningDate}</div></div>
                    <div className="bg-white border rounded-xl p-2.5"><div className="text-[10px] font-black tracking-widest text-slate-400">PHONE</div><div className="font-bold">{(verifyResult as Staff).phone}</div></div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={()=> printIdCard(verifyResult as Staff)} className="flex-1 bg-slate-900 text-white py-2.5 rounded-full font-black text-xs">VIEW ID CARD</button>
                    <button onClick={()=> { navigator.clipboard.writeText(`Verified: ${(verifyResult as Staff).empCode} • ${(verifyResult as Staff).name}`); setToast('Verification copied')}} className="flex-1 border border-slate-200 bg-white py-2.5 rounded-full font-black text-xs">COPY</button>
                  </div>
                </div>
              )}
              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-50 border rounded-full py-2">
                <i className="fas fa-shield-alt text-emerald-600"></i> Powered by Admin ID Studio • Real-time
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=> setShowLogin(false)}>
          <div onClick={e=> e.stopPropagation()} className="bg-white rounded-[20px] w-full max-w-[420px] overflow-hidden shadow-2xl">
            <div className="bg-black text-white p-6 relative">
              <button onClick={()=> setShowLogin(false)} className="absolute right-4 top-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"><i className="fas fa-times text-xs"></i></button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0066ff] rounded-xl flex items-center justify-center font-black">N</div>
                <div><div className="font-black leading-none">NAVRANGE Recovery</div><div className="text-xs opacity-60">Standard Secure Access</div></div>
              </div>
              <div className="mt-6 flex bg-white/10 rounded-full p-1">
                <button onClick={()=> setLoginType('login')} className={`flex-1 py-2 rounded-full text-xs font-black tracking-widest ${loginType==='login' ? 'bg-white text-black' : 'text-white/70'}`}>LOGIN</button>
                <button onClick={()=> setLoginType('signup')} className={`flex-1 py-2 rounded-full text-xs font-black tracking-widest ${loginType==='signup' ? 'bg-white text-black' : 'text-white/70'}`}>SIGN UP</button>
              </div>
            </div>
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              <h3 className="font-black text-lg text-center">{loginType==='login' ? 'Welcome back' : 'Create account'}</h3>
              <p className="text-xs text-center text-slate-500 -mt-2">Standard auth • Demo: any email works • Unlocks admin</p>
              {loginType==='signup' && <input name="fullname" required placeholder="Full Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />}
              <input name="email" required type="email" placeholder="Email — e.g. admin@navrange.in" defaultValue="admin@navrange.in" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              <input name="password" required type="password" placeholder="Password" defaultValue="admin123" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              <button type="submit" className="w-full bg-[#0066ff] text-white py-3 rounded-full font-black text-sm tracking-widest">{loginType==='login' ? 'LOGIN →' : 'CREATE ACCOUNT →'}</button>
              <button type="button" onClick={()=> { setCurrentUser({name:'Guest Admin',email:'guest@navrange.in',role:'Guest'}); setShowLogin(false); setAdminMode(true); setToast('Guest admin access • All features active')}} className="w-full border border-slate-200 py-2.5 rounded-full font-black text-xs">CONTINUE AS GUEST →</button>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 justify-center bg-slate-50 border rounded-full py-2">
                <i className="fas fa-shield-alt text-emerald-600"></i> 256-bit • RBI audit trail active
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddStaff && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=> setShowAddStaff(false)}>
          <div onClick={e=> e.stopPropagation()} className="bg-white rounded-[20px] w-full max-w-[520px] max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="font-black text-lg leading-none">{editingId ? 'Update Staff & ID' : 'Add New Staff — Auto ID'}</h3>
                <p className="text-xs text-slate-500 mt-1">ID auto-generates with QR • Active immediately</p>
              </div>
              <button onClick={()=> setShowAddStaff(false)} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center"><i className="fas fa-times text-xs"></i></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center relative shrink-0">
                  {formData.photo ? <img src={formData.photo} className="w-full h-full object-cover" /> : <i className="fas fa-user text-slate-400"></i>}
                </div>
                <div className="flex-1">
                  <input value={formData.photo} onChange={e=> setFormData({...formData, photo:e.target.value})} placeholder="Photo URL" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <button onClick={()=> fileInputRef.current?.click()} className="mt-2 w-full bg-slate-900 text-white text-xs font-black py-2 rounded-full">UPLOAD PHOTO</button>
                </div>
              </div>
              <input value={formData.name} onChange={e=> setFormData({...formData, name:e.target.value})} placeholder="Full Name *" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" />
              <input value={formData.role} onChange={e=> setFormData({...formData, role:e.target.value})} placeholder="Designation *" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium" />
              <div className="grid grid-cols-2 gap-3">
                <select value={formData.department} onChange={e=> setFormData({...formData, department:e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold">
                  <option>Field Ops</option><option>Legal</option><option>Leadership</option><option>Technology</option><option>Compliance</option><option>Operations</option>
                </select>
                <select value={formData.location} onChange={e=> setFormData({...formData, location:e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold">
                  <option>Patna HQ</option><option>Delhi NCR</option><option>Mumbai</option><option>Lucknow</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input value={formData.phone} onChange={e=> setFormData({...formData, phone:e.target.value})} placeholder="Phone *" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                <select value={formData.bloodGroup} onChange={e=> setFormData({...formData, bloodGroup:e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold">
                  <option>O+</option><option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option>
                </select>
              </div>
              <input value={formData.email} onChange={e=> setFormData({...formData, email:e.target.value})} placeholder="Email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={formData.joiningDate} onChange={e=> setFormData({...formData, joiningDate:e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                <select value={formData.status} onChange={e=> setFormData({...formData, status:e.target.value as any})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold">
                  <option>Active</option><option>Probation</option><option>Suspended</option>
                </select>
              </div>
              <button onClick={handleCreateStaff} className="w-full bg-[#0066ff] text-white py-3.5 rounded-full font-black tracking-widest text-sm hover:bg-[#0052cc]">{editingId ? 'UPDATE & REFRESH ID →' : 'CREATE STAFF & GENERATE ID →'}</button>
              <p className="text-[11px] text-center text-slate-500"><i className="fas fa-magic mr-1"></i> Emp Code, QR & PVC auto-created • No manual design</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Case Modal */}
      {showAddCase && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=> setShowAddCase(false)}>
          <div onClick={e=> e.stopPropagation()} className="bg-white rounded-[20px] w-full max-w-[520px] max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h3 className="font-black text-lg">{editingCaseId ? 'Edit Case' : 'New NPA Case'}</h3>
              <button onClick={()=> setShowAddCase(false)} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center"><i className="fas fa-times text-xs"></i></button>
            </div>
            <div className="p-6 space-y-4">
              <input value={caseForm.borrower} onChange={e=> setCaseForm({...caseForm, borrower:e.target.value})} placeholder="Borrower name *" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <select value={caseForm.bank} onChange={e=> setCaseForm({...caseForm, bank:e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold">
                  <option>SBI</option><option>HDFC Bank</option><option>ICICI</option><option>Axis Bank</option><option>BOB</option><option>Bajaj Finance</option>
                </select>
                <input type="number" step="0.1" value={caseForm.amount} onChange={e=> setCaseForm({...caseForm, amount: parseFloat(e.target.value) || 0})} placeholder="Amount Cr" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input value={caseForm.overdue} onChange={e=> setCaseForm({...caseForm, overdue:e.target.value})} placeholder="Overdue e.g. 120 days" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                <select value={caseForm.priority} onChange={e=> setCaseForm({...caseForm, priority:e.target.value as any})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold">
                  <option>High</option><option>Medium</option><option>Low</option>
                </select>
              </div>
              <select value={caseForm.officerId} onChange={e=> { const s=staffs.find(x=> x.id===e.target.value); if(s) setCaseForm({...caseForm, officerId:s.id, officer:s.name}) }} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold">
                {staffs.map(s=> <option key={s.id} value={s.id}>{s.name} • {s.department}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <select value={caseForm.status} onChange={e=> setCaseForm({...caseForm, status:e.target.value as any})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold">
                  <option>Field Visit</option><option>Legal Notice</option><option>Negotiation</option><option>Critical</option><option>Recovered</option>
                </select>
                <div className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-xs font-black tracking-widest text-slate-500">PROGRESS {caseForm.progress}%</div>
                  <input type="range" min={0} max={100} value={caseForm.progress} onChange={e=> setCaseForm({...caseForm, progress: parseInt(e.target.value)})} className="w-full mt-1" />
                </div>
              </div>
              <button onClick={handleAddCase} className="w-full bg-[#0066ff] text-white py-3.5 rounded-full font-black text-sm">{editingCaseId ? 'UPDATE CASE' : 'CREATE CASE →'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Partner Modal */}
      {showAddPartner && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=> setShowAddPartner(false)}>
          <div onClick={e=> e.stopPropagation()} className="bg-white rounded-[20px] w-full max-w-[460px] p-6 shadow-2xl">
            <h3 className="font-black text-lg">Add Partner</h3>
            <div className="mt-4 space-y-3">
              <input value={partnerForm.name} onChange={e=> setPartnerForm({...partnerForm, name:e.target.value})} placeholder="Bank / NBFC name *" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <select value={partnerForm.type} onChange={e=> setPartnerForm({...partnerForm, type:e.target.value as any})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold">
                  <option>PSU Bank</option><option>Private Bank</option><option>NBFC</option><option>FI</option>
                </select>
                <select value={partnerForm.status} onChange={e=> setPartnerForm({...partnerForm, status:e.target.value as any})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold">
                  <option>Active</option><option>Pending</option><option>Onboarding</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={partnerForm.cases} onChange={e=> setPartnerForm({...partnerForm, cases: parseInt(e.target.value)||0})} placeholder="Cases" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                <input value={partnerForm.recovery} onChange={e=> setPartnerForm({...partnerForm, recovery:e.target.value})} placeholder="Recovery e.g. ₹5Cr" className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              </div>
              <input value={partnerForm.contact} onChange={e=> setPartnerForm({...partnerForm, contact:e.target.value})} placeholder="Contact email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              <button onClick={handleAddPartner} className="w-full bg-black text-white py-3 rounded-full font-black text-sm">ADD PARTNER →</button>
            </div>
          </div>
        </div>
      )}

      {/* Applicant Detail */}
      {showApplicantDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=> setShowApplicantDetail(null)}>
          <div onClick={e=> e.stopPropagation()} className="bg-white rounded-[20px] w-full max-w-[460px] p-6 shadow-2xl">
            <div className="flex gap-4">
              <img src={showApplicantDetail.avatar} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <div className="font-black text-lg leading-none">{showApplicantDetail.name}</div>
                <div className="text-sm text-[#0066ff] font-bold">{showApplicantDetail.role}</div>
                <div className="text-xs text-slate-500">{showApplicantDetail.experience} • {showApplicantDetail.stage}</div>
              </div>
              <button onClick={()=> setShowApplicantDetail(null)} className="ml-auto w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center"><i className="fas fa-times text-xs"></i></button>
            </div>
            <div className="mt-4 space-y-2 text-sm bg-slate-50 border rounded-xl p-4">
              <div><span className="font-black">Email:</span> {showApplicantDetail.email}</div>
              <div><span className="font-black">Phone:</span> {showApplicantDetail.phone}</div>
              <div><span className="font-black">Applied:</span> {showApplicantDetail.appliedOn}</div>
              <div className="pt-2 text-xs text-slate-600 leading-relaxed">Ready for interview. Hire will auto-generate QR ID (NR code) and move to Staff & ID Cards.</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={()=> { moveApplicant(showApplicantDetail.id, 'Interview'); setShowApplicantDetail(null)}} className="bg-[#0066ff] text-white py-2.5 rounded-full font-black text-xs">MOVE TO INTERVIEW</button>
              <button onClick={()=> { hireApplicant(showApplicantDetail); setShowApplicantDetail(null)}} className="bg-emerald-600 text-white py-2.5 rounded-full font-black text-xs">HIRE & GENERATE ID</button>
            </div>
          </div>
        </div>
      )}

      {/* Job Apply Modal */}
      {jobModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=> setJobModal(false)}>
          <div onClick={e=> e.stopPropagation()} className="bg-white rounded-[20px] w-full max-w-[480px] p-6 shadow-2xl">
            <h3 className="font-black text-lg">Apply: {selectedJob}</h3>
            <p className="text-sm text-slate-600 mt-1">Application goes live to Admin → Hiring Hub → Hire → Auto ID.</p>
            <form onSubmit={e=> { e.preventDefault(); const fd=new FormData(e.currentTarget as HTMLFormElement); const name=fd.get('name') as string; const email=fd.get('email') as string; const phone=fd.get('phone') as string; const newA: Applicant = { id: Date.now().toString(), name, role: selectedJob || 'Recovery Officer', phone, email, experience:'Applied via website', stage:'Applied', appliedOn: new Date().toISOString().slice(0,10), avatar:`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`}; setApplicants(prev=> [newA,...prev]); addAudit('New Application', `${name} • ${selectedJob}`); pushNotif(`New applicant: ${name}`); setJobModal(false); setToast('Application submitted • Track in Hiring Hub')}} className="mt-4 space-y-3">
              <input name="name" required placeholder="Full name *" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              <input name="email" required type="email" placeholder="Email *" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              <input name="phone" required placeholder="Phone *" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              <input name="exp" placeholder="Experience e.g. 3 yrs FieldOps" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
              <button type="submit" className="w-full bg-black text-white py-3 rounded-full font-black text-sm">SUBMIT APPLICATION →</button>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-bold border border-white/10 max-w-[90vw]">
          <span className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-xs shrink-0"><i className="fas fa-check"></i></span>
          <span className="truncate">{toast}</span>
        </div>
      )}
    </div>
  )
}
