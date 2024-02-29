import React, { useState } from 'react'
import LoginBox from './components/LoginBox'
import SignUpBox from './components/SignUpBox'
import VerificationEmailBox from './components/VerificationEmailBox'
import Profile from './components/Profile'

export default function App() {

	const [page, setPage] = useState('login');

	return (
		<div>
			<h1 className="text-2xl md:text-4xl text-center mt-8">Email Verified User Authentication</h1>

			<div className="bg-[#1aac83] mt-12 m-auto min-w-96 w-1/3 p-4 rounded-md">
				{page === "login" && <LoginBox changePage={setPage}/>}
				{page === "signup" && <SignUpBox changePage={setPage}/>}
				{page === "verification" && <VerificationEmailBox changePage={setPage}/>}
				{page === "profile" && <Profile changePage={setPage} />}
			</div>
		</div>
	)
}
