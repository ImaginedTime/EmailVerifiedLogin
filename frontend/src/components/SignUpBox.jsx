import React, { useState } from 'react';
import axios from 'axios';

export default function SignUpBox({ changePage }) {

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('');

	const [error, setError] = useState('');

	const signUp = async (e) => {
		e.preventDefault();

		const requestBody = {
			userName: username,
			email,
			password,
			isVerified: false,
		};

		localStorage.setItem("signUpRequestBody", JSON.stringify(requestBody));

		try {
			const response = await axios.post('http://localhost:8080/api/users/signup', requestBody);
			const data = await response.data;

			console.log(data);

			console.log('signup', email, password);

			changePage('verification');
			setError('');
		}
		catch (e) {
			// console.error(e);
			console.log(e.response.data);
			setError(e.response.data.error);
		}
	}

	return (
		<div className=''>
			<form onSubmit={signUp}>
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
						Username
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-[#ddd] leading-tight focus:outline-none focus:shadow-outline'
						id='username'
						type='text'
						placeholder='Choose a Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
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
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all'
						type='submit'
					>
						Sign Up
					</button>

					<button
						className='text-white text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all'
						type='button'
						onClick={() => changePage('login')}
					>
						Already have an account? Sign In
					</button>
				</div>
			</form>

			{error && <div className='bg-red-200 text-red-500 border-[3px] border-red-500 text-sm mt-2 p-2 rounded'>{error}</div>}
		</div>
	)
}
