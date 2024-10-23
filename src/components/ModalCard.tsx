
import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    
  } from "@/components/ui/dialog"
import Image from 'next/image';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
  
  interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: ReactNode;
    handleClick?: () => void;
    buttonText?: string;
    image?: string;
    buttonClassName?: string;
    buttonIcon?: string;
    childrenUp:boolean
  } 

export default function ModalCard({
    isOpen,
    onClose,
    title,
    className,
    children,
    handleClick,
    buttonText,
    image,
    buttonIcon,
    childrenUp
  }: MeetingModalProps) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-slate-800 px-6 py-9 text-white">
          <div className="flex flex-col gap-6">
            {image && (
              <div className="flex justify-center">
                <Image src={image} alt="checked" width={72} height={72} />
              </div>
            )}
            <h1 className={cn("text-3xl flex items-center justify-center font-bold leading-[42px]", className)}>
              {title}
            </h1>
            <div className='flex justify-center items-center flex-col gap-5'>
        { childrenUp &&   children}

            </div>
            <Button
              className={
                "bg-cyan-600 focus-visible:ring-0 focus-visible:ring-offset-0"
              }
              onClick={handleClick}
            >
              {buttonIcon && (
                <Image
                  src={buttonIcon}
                  alt="button icon"
                  width={13}
                  height={13}
                />
              )}{" "}
              &nbsp;
              {buttonText || "Schedule Meeting"}
            </Button>

            <div className='flex justify-center items-center flex-col gap-5'>
        { !childrenUp &&   children}

            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  
