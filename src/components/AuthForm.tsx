'use client'

import { authFormSchema } from '@/utils/schema';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import supabase from '@/lib/supabase/client';
import {toast} from 'sonner'
import { Form } from "@/components/ui/form"
import FormField from './FormField';
import { Button } from './ui/button';
import Link from 'next/link';
import Spinner from './Spinner';

const AuthForm = ({type}:{type:FormType}) => {
  const router = useRouter();
  const formSchema = authFormSchema();

  const [loading, setLoading] = useState<boolean>(false);

  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const {email, password} = values;
    setLoading(true);

    try {
      if (type === 'sign-up') {
        const { data: userCredentials, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        })

        if (!userCredentials || error) {
          toast.error(error?.message);
          return
        }

        toast.success('Account created successfully, Please sign in');
        router.push('/sign-in')
      } else {
        const {data:userCredentials, error} = await supabase.auth.signInWithPassword({
          email: email,
          password: password
        })

        if (!userCredentials || error) {
          toast.error(error?.message);
          return
        }

        toast.success('Sign in successfully');
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`)
    } finally {
      setLoading(false);
    }
  }
  
  const isSignin = type === 'sign-in'

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-[20px] form">
          <FormField control={form.control} name='email' label='Email' placeholder='Your Email Address' type='email' />
          <FormField control={form.control} name='password' label='Password' placeholder='Your Password' type='password' />
          <Button className='w-full cursor-pointer' type="submit">
            {loading ? (
              <Spinner />
            ) : (
              <>
                {isSignin ? 'Sign In' : 'Create Account'}
              </>
            )}
          </Button>
        </form>
        <p className="text-center">
          {isSignin ? 'No account yet?' : 'Have an account already?'}
          <Link href={!isSignin ? '/sign-in' : '/sign-up'} className='font-bold text-user-primary ml-1'>
            {!isSignin ? 'Sign in' : 'Sign up'}
          </Link>
        </p>
      </Form>
  )
}

export default AuthForm