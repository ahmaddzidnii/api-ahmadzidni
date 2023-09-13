import Link from 'next/link'
import React from 'react'

const FooterComponents = () => {
  return (
    <div className="footer">
    <footer className="border border-1 bd-footer py-4 py-md-5  mt-0 bg-sky-200">
     <div className="container py-4 py-md-5 px-4 px-md-3 text-body-secondary">
       <div className="row">
         <div className="col-lg-3 mb-3">
           <Link className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none" href="/" aria-label="Bootstrap">
             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="" className="bi bi-heart-fill" viewBox="0 0 16 16">
               <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
             </svg>
             <span className="fs-5 ms-2">Ahmad Zidni</span>
           </Link>
           <ul className="list-unstyled small">
             <li className="mb-2">Dibuat dengan penuh semangat dan niat yang baik oleh <a className="text-black text-decoration-none" href="https://www.youtube.com/channel/UCUmQyCj8_vpW3sAt3Jd0X2w">Ahmad Zidni.</a></li>
             <li className="mb-2">Semua style disini memakai framework dari <a className="text-black text-decoration-none" href="https://getbootstrap.com/docs/5.3/getting-started/introduction/">React dan Bootstrap</a>.</li>
             <li className="mb-2">Versi v5.3.0.</li>
           </ul>
         </div>
         <div className="col-6 col-lg-3 offset-lg-1 mb-3">
           <h5 className="fw-bold text-black">Link Bootstrap</h5>
           <ul className="list-unstyled">
             <li className="mb-2"><Link className="text-black text-decoration-none" href="/">Home</Link></li>
             <li className="mb-2"><a className="text-black text-decoration-none" href="/docs/5.3/">Docs</a></li>
             <li className="mb-2"><a className="text-black text-decoration-none" href="/docs/5.3/examples/">Examples</a></li>
             <li className="mb-2"><a className="text-black text-decoration-none" href="https://icons.getbootstrap.com/">Icons</a></li>
             <li className="mb-2"><a className="text-black text-decoration-none" href="https://themes.getbootstrap.com/">Themes</a></li>
           </ul>
         </div>
         <div className="col-6 col-lg-3 mb-3">
           <h5 className="fw-bold text-black">Sosial Media</h5>
           <ul className="list-unstyled">
             <li className="mb-2"><a className="text-black text-decoration-none" href="https://www.youtube.com/channel/UCUmQyCj8_vpW3sAt3Jd0X2w">Youtube</a></li>
             <li className="mb-2"><a className="text-black text-decoration-none" href="https://www.instagram.com">Instagram</a></li>
             <li className="mb-2"><a className="text-black text-decoration-none" href="https://web.telegram.org/">Telegram</a></li>
             <li className="mb-2"><a className="text-black text-decoration-none" href="https://id-id.facebook.com">Faceebook</a></li>
             <li className="mb-2"><a className="text-black text-decoration-none" href="https://twitter.com/">Twitter</a></li>
           </ul>
         </div>
         <div className="col-6 col-lg-2 mb-3">
           <h5 className="fw-bold text-black">Projek</h5>
           <ul className="list-unstyled">
             <li className="mb-2"><a className="text-black text-decoration-none" href="https://ahmaddzidnii.github.io/searchmovie">Movie Search</a></li>
             <li className="mb-2"><a className="text-black text-decoration-none" href="https://ahmaddzidnii.github.io/myip/">Get IP</a></li>
             <li className="mb-2"><a className="text-black text-decoration-none" href="https://ahmaddzidnii.github.io/portofolio1/">Portofilo 1</a></li>
             <li className="mb-2"><a className="text-black text-decoration-none" href="https://ahmaddzidnii.github.io/lampuv1/">Lampu V1</a></li>
           </ul>
         </div>
         </div>
         <div className="row text-center"><p>&copy;Copyright {new Date().getFullYear()} by ahmadzidni.site,All Right Reserved</p></div>
       </div>
   </footer>
   </div>
  )
}

export default FooterComponents