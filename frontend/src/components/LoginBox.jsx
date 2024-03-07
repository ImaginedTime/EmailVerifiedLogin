import React, { useState } from 'react'
import axios from 'axios';

export default function LoginBox({ changePage, baseUrlForApi }) {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState('');


	const login = async (e) => {
		e.preventDefault();

		setLoading(true);

		// check for valid email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(!emailRegex.test(email)) {
			setError('Invalid Email');
			return;
		}

		if(password.length < 8) {
			setError('Password must be at least 8 characters long');
			return;
		}

		const requestBody = {
			email,
			password
		};

		try {
			const response = await axios.post(`${baseUrlForApi}/api/users/login`, requestBody);
			const data = await response.data;

			console.log(data);

			localStorage.setItem("userData", JSON.stringify(data));

			// console.log('login', email, password);
			changePage('profile');
			setError('');
		}
		catch (e) {
			console.log(e.response.data);
			setError(e.response.data.error);
		}
		finally {
			setLoading(false);
		}
	}

	return (
		<div className=''>
			<form onSubmit={login}>
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
						Email
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-[#ddd] leading-tight focus:outline-none focus:shadow-outline'
						id='email'
						type='text'
						placeholder='Your Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
						Password
					</label>
					<input
						className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:shadow-outline'
						id='password'
						type='password'
						placeholder='Your Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className='flex items-center justify-between'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all min-w-24'
						type='submit'
					>
						{loading ? 'Loading...' : 'Login'}
					</button>

					<button
						className='text-white text-xs font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all'
						type='button'
						onClick={() => changePage('signup')}
					>
						Don't have an account? Sign Up
					</button>
				</div>
			</form>

			{error && <div className='bg-red-200 text-red-500 border-[3px] border-red-500 text-sm mt-2 p-2 rounded'>{error}</div>}

		</div>
	)
}
