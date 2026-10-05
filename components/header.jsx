import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import { Brain, ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { checkUser } from '@/lib/checkUser';

const Header = async () => {
    await checkUser();

    return (
        <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter] :bg-background/60">
            <nav className="items-center w-full  mx-auto p-4 flex justify-between h-20">
                <Link href="/">
                    <Image src="/logo (1).png" alt="SKILLNOVA-Logo" width={200} height={60} className="h-20 py-1 w-auto object-contain" />
                </Link>
                <div className="flex items-center space-x-2 md:space-x-4">
                    <SignedIn>
                        <Link href={'/dashboard'}>
                            <Button variant='outline'>
                                <LayoutDashboard className='h-4 w-4' /><span className="hidden md:block">Industry Insights</span>
                            </Button>
                        </Link>
                    
                    
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex items-center gap-2">
                                    <StarsIcon className='h-4 w-4' /><span className="hidden md:block">Growth Tool</span>
                                    <ChevronDown className='h-4 w-4' />
                                </Button>
                            
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link href={"/resume"} className='flex items-center gap-2'>
                                        <FileText className='h-4 w-4' /><span>Build Resume</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/ai-cover-letter"} className='flex items-center gap-2'>
                                        <PenBox className='h-4 w-4' /><span>Cover Letter</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/interview"} className='flex items-center gap-2'>
                                        <GraduationCap className='h-4 w-4' /><span>Interview prep</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton >
                            <Button variant='outline'>Sign In</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton appearance={{
                            elements:{
                                avatarBox:'w-10 h-10',
                                userButtonPopoverCard:"shadow-xl",
                                userPreviewMainIdentifier:"font-semibold",
                            },
                        }} afterSignOutUrl='/'/>
                    </SignedIn>
                </div>
            </nav>
            
            



            
            
        </header>
    )
}

export default Header
