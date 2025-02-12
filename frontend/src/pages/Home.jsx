import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='h-screen w-full bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex flex-col justify-between pt-12  ' >
      <img src="https://freelogopng.com/images/all_img/1659768779uber-logo-white.png" alt="" className='w-1/4 ml-12' />
      <div className='bg-white text-center h-1/4 pb-7 px-4 py-4'>
        <h1 className="text-3xl font-bold text-black">Get Started with Uber</h1>
        <Link to='/login' className='bg-black text-white w-full flex items-center justify-center py-3 px-4 mt-4 rounded-md font-mono text-lg'>
        Continue
        </Link>


      </div> 
      

    </div>
  )
}

export default Home