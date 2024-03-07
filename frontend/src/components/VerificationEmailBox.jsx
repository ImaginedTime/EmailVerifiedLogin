import React, { useState } from 'react';
import axios from 'axios';

export default function VerificationEmailBox({ changePage, baseUrlForApi }) {

	const [count, setCount] = useState(0);

	const [error, setError] = useState('');

	const [loading, setLoading] = useState(false);

	const signUp = async (e) => {
		e.preventDefault();

		setLoading(true);

		const requestBody = JSON.parse(localStorage.getItem('signUpRequestBody'));

		try {
			const response = await axios.post(`${baseUrlForApi}/api/users/signup`, requestBody);
			const data = await response.data;

			console.log(data);

			// console.log('signup', email, password);

			// changePage('verification');
			setCount(prev => prev + 1);
			setError('');
		}
		catch (e) {
			// console.error(e);
			console.log(e.response.data);
			setError(e.response.data.error);
			setCount(0);

			setTimeout(() => {
				changePage('login');
			}, 1000);
		}
		finally {
			setLoading(false);
		}
	}


	return (
		<div className='text-center'>
			<div className='text-xl mb-4'>
				Verify Your Email
			</div>
			<div className='mb-4'>
				Check Your Email for Verification Link
			</div>
			<div className='text-xs'>
				If you don't see the email, check other places it might be, like your junk, spam, social, or other folders.
				Or else click the button below to resend the verification email.
			</div>
			<div className='flex items-center justify-between mt-4'>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all'
					type='button'
					onClick={signUp}
				>
					{loading ? 'Loading...' : 'Resend Verification Email'}
				</button>
				<button
					className='text-white text-xs font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all'
					type='button'
					onClick={() => changePage('login')}
				>
					Already Verified? Sign In
				</button>
			</div>

			{count !== 0 &&
				<div className='bg-green-200 text-green-700 border-[3px] border-green-700 text-sm mt-2 p-2 rounded'>
					Verification Email Sent {count + 1} times
				</div>
			}

			{error && <div className='bg-red-200 text-red-500 border-[3px] border-red-500 text-sm mt-2 p-2 rounded'>{error}</div>}


		</div>
	)
}