'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b from-primary/20 to-background flex items-center justify-center p-4'>
      {showConfetti && <Confetti />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold text-center'>
              Thank You for Your Application!
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-center'>
              <CheckCircle className='text-green-500 w-16 h-16' />
            </div>
            <p className='text-center text-muted-foreground'>
              We've successfully received your application. Thank you for taking
              the time to apply.
            </p>
            <h3 className='font-semibold text-lg'>What's Next?</h3>
            <ul className='list-disc list-inside space-y-2 text-muted-foreground'>
              <li>Our team will carefully review your application</li>
              <li>We aim to respond within 5-7 business days</li>
              <li>If selected, we'll contact you for next steps</li>
            </ul>
          </CardContent>
          <CardFooter className='flex justify-center'>
            <Button asChild>
              <Link href='/'>Return to Homepage</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

function Confetti() {
  return (
    <div className='fixed inset-0 pointer-events-none'>
      {[...Array(50)].map((_, index) => (
        <motion.div
          key={index}
          className='absolute w-2 h-2 bg-primary rounded-full'
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 10,
            opacity: 0,
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}
