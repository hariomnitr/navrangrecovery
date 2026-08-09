import React, { useState } from 'react';

// Types
interface StaffMember {
  id: string; employeeId: string; name: string; email: string; phone: string;
  department: string; designation: string; joinDate: string; photo: string;
  bloodGroup: string; address: string;
}
interface JobApplication {
  id: string; name: string; email: string; position: string;
  experience: string; status: string; appliedDate: string;
}
interface NPAData {
  year: string; publicSector: number; privateSector: number; recovered: number;
}
interface ContactMessage {
  id: string; name: string; email: string; phone: string; subject: string; message: string; date: string;
}
interface Testimonial {
  id: string; name: string; role: string; company: string; quote: string; rating: number;
}
interface Partner {
  id: string; name: string; type: string; since: string; contact: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin'>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState<'dashboard' | 'staff' | 'idcards' | 'npa' | 'applications' | 'messages' | 'testimonials' | 'partners'>('dashboard');

  // Core Data States
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    { id: '1', employeeId: 'NR-2024-001', name: 'Krishna Kumar Bablu', email: 'krishna@navrange.com', phone: '+91 98765 43210', department: 'Management', designation: 'Director & FPOs Director', joinDate: '2015-03-15', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Krishna', bloodGroup: 'O+', address: 'Mumbai, Maharashtra' },
    { id: '2', employeeId: 'NR-2024-002', name: 'Sangita Kumari', email: 'sangita@navrange.com', phone: '+91 98765 43211', department: 'Governance', designation: 'Non-Executive Director', joinDate: '2016-06-20', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sangita', bloodGroup: 'A+', address: 'Delhi, NCR' },
    { id: '3', employeeId: 'NR-2024-003', name: 'Vardan Suman', email: 'vardan@navrange.com', phone: '+91 98765 43212', department: 'Operations', designation: 'Chief Executive Officer', joinDate: '2017-01-10', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vardan', bloodGroup: 'B+', address: 'Bangalore, Karnataka' },
    { id: '4', employeeId: 'NR-2024-004', name: 'Puja Pushpanjali', email: 'puja@navrange.com', phone: '+91 98765 43213', department: 'Technology', designation: 'Technical Executive', joinDate: '2019-08-05', photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Puja', bloodGroup: 'AB+', address: 'Hyderabad, Telangana' },
  ]);

  const [npaData, setNpaData] = useState<NPAData[]>([
    { year: '2018', publicSector: 11.2, privateSector: 3.8, recovered: 2.1 },
    { year: '2019', publicSector: 9.8, privateSector: 3.2, recovered: 2.8 },
    { year: '2020', publicSector: 8.5, privateSector: 2.9, recovered: 3.5 },
    { year: '2021', publicSector: 7.3, privateSector: 2.5, recovered: 4.2 },
    { year: '2022', publicSector: 6.1, privateSector: 2.1, recovered: 4.9 },
    { year: '2023', publicSector: 5.2, privateSector: 1.8, recovered: 5.7 },
    { year: '2024', publicSector: 4.5, privateSector: 1.5, recovered: 6.3 },
  ]);

  const [applications, setApplications] = useState<JobApplication[]>([
    { id: 'a1', name: 'Rahul Sharma', email: 'rahul@email.com', position: 'Recovery Officer', experience: '5 years', status: 'Pending', appliedDate: '2024-12-15' },
    { id: 'a2', name: 'Priya Patel', email: 'priya@email.com', position: 'Legal Associate', experience: '3 years', status: 'Interviewed', appliedDate: '2024-12-18' },
    { id: 'a3', name: 'Amit Kumar', email: 'amit@email.com', position: 'Field Executive', experience: '2 years', status: 'Pending', appliedDate: '2024-12-20' },
  ]);

  const [messages, setMessages] = useState<ContactMessage[]>([
    { id: 'm1', name: 'SBI Recovery Head', email: 'recovery@sbi.co.in', phone: '+91 22 2274 0840', subject: 'Q4 NPA Portfolio', message: 'Need support for 1200 Cr portfolio recovery', date: '2024-12-22' },
  ]);

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { id: 't1', name: 'Rajesh Mehta', role: 'CFO', company: 'HDFC Bank', quote: 'NAVRANGE recovered 340 Cr within 8 months. Exceptional team.', rating: 5 },
    { id: 't2', name: 'Anita Rao', role: 'Head - Risk', company: 'ICICI Bank', quote: 'Professional, ethical and results-oriented. Highly recommended.', rating: 5 },
  ]);

  const [partners, setPartners] = useState<Partner[]>([
    { id: 'p1', name: 'State Bank of India', type: 'Banking', since: '2016', contact: 'recovery@sbi.co.in' },
    { id: 'p2', name: 'HDFC Bank', type: 'Banking', since: '2017', contact: 'npa@hdfcbank.com' },
    { id: 'p3', name: 'Bajaj Finance', type: 'NBFC', since: '2019', contact: 'partners@bajaj.in' },
  ]);

  // UI States
  const [showNewStaffForm, setShowNewStaffForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [selectedCard, setSelectedCard] = useState<StaffMember | null>(null);
  const [staffSearch, setStaffSearch] = useState('');
  const [showContactSuccess, setShowContactSuccess] = useState(false);

  // Contact Form
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  // New Staff Form
  const [newStaff, setNewStaff] = useState({ name: '', email: '', phone: '', department: '', designation: '', bloodGroup: '', address: '' });

  // New Testimonial Form
  const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', company: '', quote: '', rating: 5 });

  // New Partner Form
  const [newPartner, setNewPartner] = useState({ name: '', type: '', since: '', contact: '' });

  // Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'admin@navrange.com' && loginPassword === 'admin123') {
      setIsLoggedIn(true); setShowLoginModal(false); setCurrentPage('admin');
      setLoginEmail(''); setLoginPassword('');
    } else alert('Use: admin@navrange.com / admin123');
  };

  // Generate Employee ID
  const generateEmployeeId = () => `NR-${new Date().getFullYear()}-${String(staffMembers.length + 1).padStart(3, '0')}`;

  // Add Staff
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const employeeId = generateEmployeeId();
    const staff: StaffMember = {
      id: Date.now().toString(), employeeId, ...newStaff,
      joinDate: new Date().toISOString().split('T')[0],
      photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newStaff.name.split(' ').join('')}`
    };
    setStaffMembers([...staffMembers, staff]);
    setNewStaff({ name: '', email: '', phone: '', department: '', designation: '', bloodGroup: '', address: '' });
    setShowNewStaffForm(false); setActiveAdminTab('idcards');
    alert(`Employee created! ID: ${employeeId}`);
  };

  // Edit Staff
  const handleEditStaff = (staff: StaffMember) => { setEditingStaff(staff); };
  const saveEditedStaff = () => {
    if (!editingStaff) return;
    setStaffMembers(staffMembers.map(s => s.id === editingStaff.id ? editingStaff : s));
    setEditingStaff(null);
  };

  const handleDeleteStaff = (id: string) => {
    if (confirm('Remove this employee?')) setStaffMembers(staffMembers.filter(s => s.id !== id));
  };

  // NPA Update
  const updateNpa = (idx: number, field: keyof NPAData, val: number) => {
    const copy = [...npaData]; copy[idx] = { ...copy[idx], [field]: val }; setNpaData(copy);
  };

  // Application Status
  const updateAppStatus = (id: string, status: string) => {
    setApplications(applications.map(a => a.id === id ? { ...a, status } : a));
  };

  // Contact Form Submit
  const submitContact = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg: ContactMessage = {
      id: Date.now().toString(), ...contactForm, date: new Date().toISOString().split('T')[0]
    };
    setMessages([newMsg, ...messages]);
    setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setShowContactSuccess(true); setTimeout(() => setShowContactSuccess(false), 2800);
  };

  // Add Testimonial
  const addTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    setTestimonials([...testimonials, { id: Date.now().toString(), ...newTestimonial }]);
    setNewTestimonial({ name: '', role: '', company: '', quote: '', rating: 5 });
  };

  // Add Partner
  const addPartner = (e: React.FormEvent) => {
    e.preventDefault();
    setPartners([...partners, { id: Date.now().toString(), ...newPartner }]);
    setNewPartner({ name: '', type: '', since: '', contact: '' });
  };

  // Print ID Card
  const printIdCard = (staff: StaffMember) => {
    const w = window.open('', '', 'width=420,height=520');
    if (!w) return;
    w.document.write(`
      <html><head><title>${staff.employeeId}</title>
      <style>@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
      body{font-family:Lato,sans-serif;margin:0;padding:30px;background:#f8f8f8}
      .card{width:350px;background:#fff;border:3px solid #000;border-radius:10px;padding:24px;margin:auto;box-shadow:0 10px 30px rgba(0,0,0,.15)}
      .hdr{background:#000;color:#fff;text-align:center;padding:12px;margin:-24px -24px 20px}
      .photo{width:110px;height:110px;border-radius:9999px;border:5px solid #0076eb;margin:0 auto 14px;display:block}
      .eid{font-family:monospace;font-size:15px;color:#0076eb;font-weight:700;margin-bottom:4px}
      .nm{font-size:21px;font-weight:700}.des{color:#0076eb;font-weight:600}
      .dt{font-size:13px;line-height:1.75;margin-top:16px}
      .dt div{display:flex;justify-content:space-between;margin:5px 0}
      .ftr{text-align:center;margin-top:18px;font-size:11px;color:#666;border-top:1px solid #ddd;padding-top:10px}</style></head>
      <body><div class="card">
        <div class="hdr"><div style="font-size:19px;font-weight:700">NAVRANGE RECOVERY</div><div style="font-size:10px;letter-spacing:1px">OFFICIAL EMPLOYEE ID</div></div>
        <img src="${staff.photo}" class="photo"/>
        <div style="text-align:center"><div class="eid">${staff.employeeId}</div><div class="nm">${staff.name}</div><div class="des">${staff.designation}</div></div>
        <div class="dt"><div><span>Department</span><b>${staff.department}</b></div><div><span>Blood Group</span><b>${staff.bloodGroup}</b></div><div><span>Phone</span><b>${staff.phone}</b></div><div><span>Email</span><b>${staff.email}</b></div><div><span>Joined</span><b>${new Date(staff.joinDate).toLocaleDateString('en-IN')}</b></div></div>
        <div class="ftr">VALID • NAVRANGE RECOVERY PVT. LTD.</div>
      </div></body></html>`);
    w.document.close(); setTimeout(() => w.print(), 400);
  };

  // Export CSV
  const exportCSV = (type: string) => {
    let csv = ''; let filename = '';
    if (type === 'staff') {
      csv = 'EmpID,Name,Email,Phone,Dept,Designation,JoinDate\n' + staffMembers.map(s => `${s.employeeId},${s.name},${s.email},${s.phone},${s.department},${s.designation},${s.joinDate}`).join('\n');
      filename = 'staff_export.csv';
    } else if (type === 'npa') {
      csv = 'Year,PublicSector,PrivateSector,Recovered\n' + npaData.map(d => `${d.year},${d.publicSector},${d.privateSector},${d.recovered}`).join('\n');
      filename = 'npa_report.csv';
    }
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
  };

  // Filtered Staff
  const filteredStaff = staffMembers.filter(s =>
    s.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
    s.employeeId.toLowerCase().includes(staffSearch.toLowerCase()) ||
    s.department.toLowerCase().includes(staffSearch.toLowerCase())
  );

  // Stats
  const stats = {
    staff: staffMembers.length,
    recovery: npaData.reduce((a, b) => a + b.recovered, 0).toFixed(1),
    avgNPA: (npaData.reduce((a, b) => a + b.publicSector, 0) / npaData.length).toFixed(1),
    apps: applications.length,
    msgs: messages.length
  };

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Lato, sans-serif' }}>
      {/* NAV */}
      <header className="bg-black text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setCurrentPage('home'); setIsLoggedIn(false); }}>
            <div className="w-9 h-9 bg-white text-black rounded flex items-center justify-center font-black text-2xl">N</div>
            <span className="font-bold text-2xl tracking-tighter">NAVRANGE Recovery</span>
          </div>
          <div className="flex items-center gap-8 text-sm">
            <a href="#home" onClick={() => setCurrentPage('home')} className="hover:text-blue-400 cursor-pointer">Home</a>
            <a href="#services" onClick={() => setCurrentPage('home')} className="hover:text-blue-400 cursor-pointer">Services</a>
            <a href="#team" onClick={() => setCurrentPage('home')} className="hover:text-blue-400 cursor-pointer">Team</a>
            <a href="#contact" onClick={() => setCurrentPage('home')} className="hover:text-blue-400 cursor-pointer">Contact</a>
            <button onClick={() => { setCurrentPage('admin'); if (!isLoggedIn) setShowLoginModal(true); }} className="px-6 py-2.5 bg-white text-black rounded font-bold hover:bg-blue-600 hover:text-white transition">Admin Panel</button>
          </div>
        </div>
      </header>

      {/* HOME PAGE */}
      {currentPage === 'home' && (
        <>
          {/* Hero */}
          <section id="home" className="h-[620px] bg-black text-white flex items-center justify-center" style={{ background: 'linear-gradient(rgba(0,0,0,.78),rgba(0,0,0,.78)), url("https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600") center/cover' }}>
            <div className="max-w-4xl text-center px-6">
              <h1 className="text-[68px] leading-none font-bold tracking-tighter mb-6">Expert Loan Recovery.<br />Trusted by India.</h1>
              <p className="text-xl text-gray-300 mb-9">Professional NPA management and ethical recovery solutions for banks and NBFCs.</p>
              <a href="#contact" className="inline-block bg-[#0076eb] px-12 py-4 rounded font-bold tracking-[1.5px] text-sm">REQUEST CONSULTATION</a>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-center text-5xl font-bold mb-14">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[{ t: 'Loan Recovery', d: 'Ethical recovery with 92% success rate using legal & negotiation channels.' }, { t: 'NPA Management', d: 'Full portfolio management, SARFAESI execution, and resolution strategy.' }, { t: 'Legal Services', d: 'Court filings, arbitration & SARFAESI Act proceedings handled by in-house counsel.' }].map((s, i) => (
                <div key={i} className="border p-9 rounded-2xl hover:shadow-xl transition"><div className="text-5xl mb-7">0{i + 1}</div><h3 className="font-bold text-2xl mb-3">{s.t}</h3><p className="text-gray-600">{s.d}</p></div>
              ))}
            </div>
          </section>

          {/* Team */}
          <section id="team" className="bg-zinc-50 py-20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-center text-5xl font-bold mb-12">Leadership Team</h2>
              <div className="grid md:grid-cols-4 gap-6">{staffMembers.slice(0, 4).map(m => (
                <div key={m.id} className="bg-white rounded-2xl overflow-hidden border"><img src={m.photo} className="w-full h-60 object-cover" /><div className="p-6"><div className="font-bold text-xl">{m.name}</div><div className="text-[#0076eb] text-sm mt-0.5">{m.designation}</div></div></div>
              ))}</div>
            </div>
          </section>

          {/* NPA Live Chart */}
          <section className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="font-bold text-center text-5xl mb-3">NPA Recovery Trends</h2>
            <p className="text-center text-gray-600 mb-10">Live analytics from 2018–2024</p>
            <div className="bg-white border rounded-2xl p-10">
              <div className="flex items-end gap-4 h-80 mb-4">
                {npaData.map((row, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full bg-[#0076eb] rounded-t" style={{ height: `${row.recovered * 30}px` }}></div>
                    <div className="mt-2 text-xs font-mono text-center">{row.year}<br /><span className="font-bold text-[#0076eb]">{row.recovered}</span></div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-center text-gray-500">Recovered Amount (₹ Lakh Crore)</div>
            </div>
          </section>

          {/* Contact Form */}
          <section id="contact" className="bg-zinc-900 text-white py-20">
            <div className="max-w-lg mx-auto px-6">
              <h2 className="text-4xl font-bold text-center mb-8">Get in Touch</h2>
              {showContactSuccess && <div className="mb-6 text-center bg-emerald-600 py-3 rounded">Thank you! Message received.</div>}
              <form onSubmit={submitContact} className="space-y-4">
                {['name', 'email', 'phone', 'subject'].map(f => <input key={f} required placeholder={f.charAt(0).toUpperCase() + f.slice(1)} value={(contactForm as any)[f]} onChange={e => setContactForm({ ...contactForm, [f]: e.target.value })} className="w-full bg-white/10 border border-white/20 placeholder:text-white/60 p-4 rounded text-white" />)}
                <textarea required placeholder="Message" value={contactForm.message} onChange={e => setContactForm({ ...contactForm, message: e.target.value })} className="w-full bg-white/10 border border-white/20 p-4 rounded h-32 text-white placeholder:text-white/60" />
                <button className="w-full py-4 bg-white text-black font-bold rounded tracking-wider">SUBMIT ENQUIRY</button>
              </form>
            </div>
          </section>
        </>
      )}

      {/* ADMIN PANEL */}
      {currentPage === 'admin' && isLoggedIn && (
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex justify-between items-center mb-8">
            <div><h1 className="font-bold text-5xl tracking-tighter">Admin Control Center</h1><p className="text-gray-500">NAVRANGE Recovery • Management Portal</p></div>
            <button onClick={() => { setIsLoggedIn(false); setCurrentPage('home'); }} className="px-6 py-2 text-sm border rounded hover:bg-red-50">LOGOUT</button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 mb-8 border-b text-sm">
            {(['dashboard', 'staff', 'idcards', 'npa', 'applications', 'messages', 'testimonials', 'partners'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveAdminTab(tab)} className={`px-5 py-3 capitalize font-medium transition border-b-2 ${activeAdminTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500'}`}>{tab}</button>
            ))}
          </div>

          {/* DASHBOARD */}
          {activeAdminTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {[{ l: 'Staff', v: stats.staff }, { l: 'Recovery Cr', v: stats.recovery }, { l: 'Avg NPA %', v: stats.avgNPA }, { l: 'Applications', v: stats.apps }, { l: 'Messages', v: stats.msgs }].map((s, i) => (
                  <div key={i} className="bg-white border p-7 rounded-2xl"><div className="text-4xl font-bold tracking-tight">{s.v}</div><div className="text-xs uppercase tracking-[2px] text-gray-500 mt-1">{s.l}</div></div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => { setActiveAdminTab('staff'); setShowNewStaffForm(true); }} className="bg-black text-white px-8 py-3 rounded-xl font-bold">+ Hire Staff</button>
                <button onClick={() => setActiveAdminTab('idcards')} className="border px-8 py-3 rounded-xl font-bold">Generate ID Cards</button>
                <button onClick={() => exportCSV('npa')} className="border px-8 py-3 rounded-xl font-bold">Export NPA Report</button>
              </div>
            </div>
          )}

          {/* STAFF */}
          {activeAdminTab === 'staff' && (
            <div>
              <div className="flex justify-between mb-6 items-center">
                <div className="font-bold text-3xl">Staff Management</div>
                <button onClick={() => setShowNewStaffForm(true)} className="bg-black text-white px-6 py-2 rounded font-bold">+ Add Employee</button>
              </div>
              <input value={staffSearch} onChange={e => setStaffSearch(e.target.value)} placeholder="Search name / ID / dept" className="w-full mb-4 border p-3 rounded" />
              {showNewStaffForm && <form onSubmit={handleAddStaff} className="grid md:grid-cols-2 gap-3 bg-zinc-50 p-8 rounded-2xl mb-6">
                {Object.keys(newStaff).map(k => <input key={k} required placeholder={k} value={(newStaff as any)[k]} onChange={e => setNewStaff({ ...newStaff, [k]: e.target.value })} className="border p-3 rounded" />)}
                <div className="col-span-2 flex gap-4"><button className="bg-[#0076eb] text-white px-9 py-3 rounded font-bold">Create Profile</button><button type="button" onClick={() => setShowNewStaffForm(false)} className="border px-9 py-3 rounded">Cancel</button></div>
              </form>}
              <div className="bg-white border rounded-2xl overflow-hidden">
                <table className="w-full text-sm"><thead className="bg-zinc-100"><tr><th className="p-4 text-left">Emp ID</th><th>Name</th><th>Dept</th><th>Role</th><th>Actions</th></tr></thead>
                  <tbody>{filteredStaff.map(s => <tr key={s.id} className="border-t"><td className="p-4 font-mono text-xs text-[#0076eb]">{s.employeeId}</td><td>{s.name}</td><td>{s.department}</td><td>{s.designation}</td>
                    <td className="space-x-3 text-xs"><button onClick={() => handleEditStaff(s)} className="text-blue-600">Edit</button><button onClick={() => handleDeleteStaff(s.id)} className="text-red-600">Delete</button></td></tr>)}</tbody></table>
              </div>
            </div>
          )}

          {/* ID CARDS */}
          {activeAdminTab === 'idcards' && (
            <div>
              <h3 className="font-bold text-3xl mb-8">Digital Employee ID Cards</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {staffMembers.map(s => <div key={s.id} onClick={() => setSelectedCard(s)} className="border p-8 rounded-3xl cursor-pointer hover:shadow-xl transition bg-white text-center">
                  <img src={s.photo} className="w-24 h-24 mx-auto mb-4 rounded-full border-[6px] border-[#0076eb]" />
                  <div className="font-mono text-xs tracking-widest text-[#0076eb]">{s.employeeId}</div>
                  <div className="font-bold text-xl mt-1">{s.name}</div>
                  <div className="text-sm text-[#0076eb]">{s.designation}</div>
                  <button onClick={e => { e.stopPropagation(); printIdCard(s); }} className="mt-6 w-full py-3 rounded bg-black text-white text-sm tracking-wider font-bold">PRINT PHYSICAL CARD</button>
                </div>)}
              </div>
              {selectedCard && <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[99]" onClick={() => setSelectedCard(null)}>
                <div className="bg-white p-10 rounded-3xl w-[380px]" onClick={e => e.stopPropagation()}>
                  <img src={selectedCard.photo} className="w-28 h-28 mx-auto mb-4 rounded-full border-[7px] border-[#0076eb]" />
                  <div className="text-center"><div className="font-mono tracking-[3px] text-[#0076eb]">{selectedCard.employeeId}</div><div className="text-3xl font-bold mt-1">{selectedCard.name}</div></div>
                  <button onClick={() => printIdCard(selectedCard)} className="mt-8 w-full py-4 bg-[#0076eb] text-white rounded font-bold">PRINT ID CARD</button>
                </div></div>}
            </div>
          )}

          {/* NPA */}
          {activeAdminTab === 'npa' && (
            <div>
              <div className="flex justify-between mb-6"><div className="font-bold text-3xl">NPA Analytics</div><button onClick={() => exportCSV('npa')} className="text-sm px-6 border rounded">Export CSV</button></div>
              <div className="bg-white border rounded-2xl p-8 overflow-x-auto">
                <table className="w-full"><thead><tr className="text-left"><th>Year</th><th>Public %</th><th>Private %</th><th>Recovered (Cr)</th></tr></thead>
                  <tbody>{npaData.map((r, idx) => <tr key={idx} className="border-t"><td className="py-4 font-bold">{r.year}</td>
                    {(['publicSector', 'privateSector', 'recovered'] as const).map(f => <td key={f}><input type="number" step="0.1" className="border p-1 w-20 rounded" value={(r as any)[f]} onChange={e => updateNpa(idx, f, parseFloat(e.target.value))} /></td>)}</tr>)}</tbody></table>
              </div>
            </div>
          )}

          {/* APPLICATIONS */}
          {activeAdminTab === 'applications' && (
            <div><h3 className="font-bold text-3xl mb-6">Recruitment Pipeline</h3>
              {applications.map(a => <div key={a.id} className="flex justify-between items-center bg-white border p-6 rounded-2xl mb-3"><div><div className="font-bold">{a.name} — {a.position}</div><div className="text-xs text-gray-500">{a.email} • {a.appliedDate}</div></div>
                <select value={a.status} onChange={e => updateAppStatus(a.id, e.target.value)} className="border px-4 py-2 rounded"><option>Pending</option><option>Interviewed</option><option>Selected</option><option>Rejected</option></select></div>)}
            </div>
          )}

          {/* MESSAGES */}
          {activeAdminTab === 'messages' && (
            <div><h3 className="font-bold text-3xl mb-6">Client Messages ({messages.length})</h3>
              {messages.map(m => <div key={m.id} className="bg-white p-7 border rounded-2xl mb-4"><div className="font-bold">{m.name} • {m.subject}</div><div className="text-sm text-gray-500 mb-1">{m.email} • {m.date}</div><div>{m.message}</div></div>)}
            </div>
          )}

          {/* TESTIMONIALS */}
          {activeAdminTab === 'testimonials' && (
            <div>
              <form onSubmit={addTestimonial} className="grid grid-cols-2 gap-3 mb-6 bg-zinc-50 p-7 rounded-2xl">
                {['name', 'role', 'company', 'quote'].map(k => <input key={k} required placeholder={k} value={(newTestimonial as any)[k]} onChange={e => setNewTestimonial({ ...newTestimonial, [k]: e.target.value })} className="border p-3 rounded col-span-1" />)}
                <button className="col-span-2 bg-black text-white py-3 rounded font-bold">Add Testimonial</button>
              </form>
              {testimonials.map(t => <div key={t.id} className="border p-6 rounded-2xl mb-3">“{t.quote}” — <span className="font-bold">{t.name}</span>, {t.role} at {t.company}</div>)}
            </div>
          )}

          {/* PARTNERS */}
          {activeAdminTab === 'partners' && (
            <div>
              <form onSubmit={addPartner} className="flex gap-3 mb-6">
                {['name', 'type', 'since', 'contact'].map(k => <input key={k} required placeholder={k} value={(newPartner as any)[k]} onChange={e => setNewPartner({ ...newPartner, [k]: e.target.value })} className="flex-1 border p-3 rounded" />)}
                <button className="bg-black px-8 text-white rounded font-bold">Add</button>
              </form>
              <div className="grid md:grid-cols-3 gap-4">{partners.map(p => <div key={p.id} className="border p-7 rounded-2xl"><div className="font-bold text-xl">{p.name}</div><div className="text-sm text-[#0076eb]">{p.type} • Since {p.since}</div><div className="text-xs mt-2">{p.contact}</div></div>)}</div>
            </div>
          )}
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
          <div className="bg-white p-9 w-full max-w-sm rounded-2xl">
            <h3 className="font-bold text-3xl mb-6">Admin Access</h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="email" placeholder="admin@navrange.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full border p-4 rounded" required />
              <input type="password" placeholder="admin123" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full border p-4 rounded" required />
              <button className="w-full py-4 bg-black text-white font-bold rounded">LOGIN</button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {editingStaff && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999]">
          <div className="bg-white p-8 rounded-2xl w-[420px]">
            <h4 className="font-bold mb-5 text-xl">Edit Employee</h4>
            {['name', 'email', 'phone', 'department', 'designation', 'bloodGroup', 'address'].map(k => <input key={k} value={(editingStaff as any)[k]} onChange={e => setEditingStaff({ ...editingStaff!, [k]: e.target.value })} className="block w-full border p-3 mb-3 rounded" />)}
            <div className="flex gap-3 mt-4"><button onClick={saveEditedStaff} className="flex-1 py-3 bg-black text-white rounded font-bold">Save</button><button onClick={() => setEditingStaff(null)} className="flex-1 py-3 border rounded">Cancel</button></div>
          </div>
        </div>
      )}

      <footer className="bg-black text-center text-xs text-white/60 py-6">© NAVRANGE Recovery Pvt. Ltd. • Professional Loan Recovery Since 2015</footer>
    </div>
  );
};

export default App;