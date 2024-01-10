import React from 'react'
import Link from "next/link"
type Props = {}

const Footer = (props: Props) => {
  return (
    <footer >
         <div className="border border-[#00000e] dark:border-[#ffffff1e] ">
            <br />
            <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">About</h3>
                        <ul className="space-y-4">
                            <li>
                             <Link href="/about" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                Our Story
                             </Link>
                            </li>
                            <li>
                             <Link href="/privacy-policy" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                                Privacy Policy
                             </Link>
                            </li>
                            <li>
                             <Link href="/faq" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                               Faq
                             </Link>
                            </li>
                            
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">Quic Links</h3>
                        <ul className="space-y-4">
                            <li>
                             <Link href="/courses" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                               Courses
                             </Link>
                            </li>
                            <li>
                             <Link href="/profile" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                               My Account
                             </Link>
                            </li>
                            <li>
                             <Link href="/admin" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                               Admin Pannel
                             </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">Social Links</h3>
                        <ul className="space-y-4">
                            <li>
                             <Link href="https://www.facebook.com/" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                               Facebook
                             </Link>
                            </li>
                            <li>
                             <Link href="https://www.instagram.com/" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                               Instagram
                             </Link>
                            </li>
                            <li>
                             <Link href="https://github.com/FoysalAhammed" className='text-base text-black dark:text-gray-300 dark:hover:text-white'>
                              Github
                             </Link>
                            </li>
                        </ul>
                    </div>
            
                 <div>
                 <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">Contact Information</h3>
                    <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                         Call Us:  0177-8821588
                    </p>
                    <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                         Address: Gulshan-1-Circle,Dhaka 1230,Bangladesh
                    </p>
                    <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                         Mail Us: ahmedfoysal388@gmail.com
                    </p>
                    
                 </div>
                </div>
                <br />
                <br />
                <p className="text-center text-black dark:text-gray-300 dark:hover:text-white pb-2">
                         Copyright @ 2023 ELearningBd || All Rights Reserved
                    </p>
            </div>
         </div>
    </footer>
  )
}

export default Footer