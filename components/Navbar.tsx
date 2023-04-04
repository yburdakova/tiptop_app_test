import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import {AiOutlineLogout} from 'react-icons/ai';
import {BiSearch} from 'react-icons/bi';
import {IoMdAdd} from 'react-icons/io';


import Logo from '../utils/tiktik-logo1.png';
import SmallLogo from '../utils/tiktik-logo2.png';
import { createOrGetUser } from '@/utils';
import useAuthStore from '@/store/authStore';



const Navbar = () => {

    const {userProfile, addUser, removeUser}:any = useAuthStore();
    const [width, setWidth] = useState(window.innerWidth);

    

    return (
        <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
            <Link href="/">
                
                    {width < 560 
                    ? <div className='w-[40px] h-[40px]'>
                        <Image 
                        className='cursor-pointer'
                        src={SmallLogo}
                        alt="ZooTube logo"
                        priority
                        />
                    </div>
                    : <div className='w-[200px] h-[60px]'><Image 
                        className='cursor-pointer'
                        src={Logo}
                        alt="ZooTube logo"
                        priority/>
                    </div>}
                
            </Link>
            <div className="">SEARCH</div>
            <div className="">
                {userProfile 
                ? ( <div className='flex gap-5 md:gap-10 items-center justify-center'>
                        <Link href='/upload'>
                            <button className='border-2 px-2 md:px-4 text-lg font-semibold flex items-center justify-center gap-2 rounded-full'>
                                <IoMdAdd className='text-xl'/> {` `}
                                <span className="hidden md:block">Upload</span>
                            </button>
                        </Link>
                        {userProfile.image && (
                            <Link href='/'>
                                <>
                                <Image
                                    width={40}
                                    height={40}
                                    className='rounded-full cursor-pointer'
                                    src={userProfile.image}
                                    alt='Profile avatar'
                                />
                                </>
                            </Link>
                        )}
                        <button
                            type='button'
                            className='px-2'
                            onClick={() => 
                                {googleLogout();
                                removeUser()}
                            }
                        >
                            <AiOutlineLogout color='red' fontSize={30}/>
                        </button>
                    </div>) 
                : ( <GoogleLogin
                        onSuccess={(response) => createOrGetUser(response, addUser)}
                        onError={()=>console.log(Error)}
                    />)
                }
            </div>
        </div>
    );
};

export default Navbar;