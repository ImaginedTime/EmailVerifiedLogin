import React, { useState } from 'react'
import LoginBox from './components/LoginBox'
import SignUpBox from './components/SignUpBox'
import VerificationEmailBox from './components/VerificationEmailBox'
import Profile from './components/Profile'

export default function App() {

	const [page, setPage] = useState(localStorage.getItem('userData') ? "profile" : "login");

	const baseUrlForApi = "https://emailverifiedlogin.onrender.com";

	return (
		<div className='flex flex-col items-center'>
			<h1 className="text-2xl md:text-4xl text-center mt-8">Email Verified User Authentication</h1>

			{page !== "profile" &&
				<div className="bg-[#1aac83] mt-12 min-w-80 w-1/3 p-4 rounded-md mx-4">
					{page === "login" && <LoginBox changePage={setPage} baseUrlForApi={baseUrlForApi} />}
					{page === "signup" && <SignUpBox changePage={setPage} baseUrlForApi={baseUrlForApi} />}
					{page === "verification" && <VerificationEmailBox changePage={setPage} baseUrlForApi={baseUrlForApi} />}
				</div>
			}

			{page === "profile" &&
				<div className='bg-[#1aac83] mt-12 min-w-80 w-1/2 p-4 rounded-md mx-4'>
					<Profile changePage={setPage} baseUrlForApi={baseUrlForApi} />
				</div>
			}
		</div>
	)
}
