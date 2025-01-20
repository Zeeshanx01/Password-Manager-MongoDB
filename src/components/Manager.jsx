import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: '', username: '', password: '' })
  const [passwordArray, setPasswordArray] = useState([])




  const getPassword = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json();
    console.log(passwords)
    setPasswordArray(passwords)


  }


  useEffect(() => {
    // ? if passwords present in local storage, then load passwords...
    getPassword()
  }, [])





  const showPassword = () => {
    console.log("Show Password")
    if (ref.current.src.includes("icons/eye-close.gif")) {
      ref.current.src = "icons/eye-open.gif"
      passwordRef.current.type = 'text'
    }
    else {
      ref.current.src = "icons/eye-close.gif"
      passwordRef.current.type = 'password'
    }
  }




  const copyText = (text) => {
    // alert('Copied to clipboard: "' + text + '"')

    toast('Copied to clipboard: "' + text + '"', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // transition: Bounce,
    });

    navigator.clipboard.writeText(text)
  }



  const savePassword = async () => {


    if (form.site.length > 0 && form.username.length > 0 && form.password.length > 0) {


      //* simulating update api:
      //? Deleting if the id already exist
      // await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-type": "application.json" }, body: JSON.stringify({ id: form.id }) })


      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])

      console.log('Saving Password: ', form)
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() })
      })
      setform({ site: '', username: '', password: '' })
      // const responseData = await response.json();
      // console.log('Server Response: ', responseData);

      // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      // console.log([...passwordArray, form])

    } else {
      console.log('Form validation failed')
    }

    console.log(passwordArray)
  }


  const deleteP = async (id) => {
    setPasswordArray(passwordArray.filter(item => item.id !== id))
    let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-type": "application/json" }, body: JSON.stringify({ id }) })
    // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

  }


  const deletePassword = async (id) => {
    console.log('Deleting ID: ' + id)
    let c = confirm('Do you really want to delete this password?')

    if (c) {

      deleteP(id)

      toast('Password Deleted', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      });

    }

    else {
      toast('Password not deleted', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light"
      });
    }
  }

  const editPassword = async (id) => {
    // Set form data to the password being edited
    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    // Delete the password from the database
    await deleteP(id)
  }


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }


  return (
    <>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        // newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />


      {/* background */}
      <div className="fixed top-0 -z-10 h-full w-full bg-white">
        <div className="fixed bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-green-800 opacity-20 blur-[80px]">
        </div>
      </div>

      {/* logo */}
      <div className="logo font-bold text-Black text-2xl text-center">
        <span className='text-green-700'>&lt;</span>
        Pass
        <span className='text-green-700'>OP/&gt;</span>
      </div>

      <p className='text-green-900 font-bold text-xs text-center'>Your own Password Manager</p>


      {/* FORM */}
      <div className="bg-stone-100 drop-shadow-2xl mx-auto my-4 max-sm:mx-4 max-w-4xl rounded-xl">

        <div className=' flex flex-col p-4 gap-2'>

          <input
            value={form.site}
            onChange={handleChange}
            placeholder='Enter Website URL'
            type="text"
            name='site'
            id='site'
            className='rounded-full border border-green-700 w-full text-green-900 font-boldd text-sm px-2 py-1 my-1'
          />

          {/* INPUTS */}
          <div className='flex gap-3 bg-slate-3000 max-md:flex-col'>

            <input
              value={form.username}
              onChange={handleChange}
              placeholder='Enter Username'
              type="text"
              name='username'
              id='username'
              className='rounded-full border border-green-700  w-full  text-green-900 font-boldd text-sm px-2 py-1'
            />

            <div className="relative flex items-center">

              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder='Enter Password'
                type='password'
                name='password'
                id='password'
                className='rounded-full border border-green-700 w-full min-w-[27vw] xl:min-w-[14vw] text-green-900 font-boldd text-sm px-2 py-1 pr-[26px] '
              />

              {/* eye.gif */}
              <span
                onClick={showPassword}
                className='absolute right-1 top-[6px] bg-white cursor-pointer text-xs text-center bg-green-1000 rounded-full'>
                <img
                  ref={ref}
                  width={20}
                  src="icons/eye-close.gif"
                  alt=""
                />
              </span>

            </div>

          </div>





          {/* Save BUtton */}
          <div className='bg-slate-3000 w-full flex justify-end'>
            {/* disabled={form.site.length < 1} disabled={form.username.length < 1} disabled={form.password.length < 1} */}
            <button
              onClick={savePassword}
              disabled={form.site.length < 1 || form.username.length < 1 || form.password.length < 1}
              className='disabled:opacity-30 flex justify-center items-center bg-green-500 rounded-full  px-6 py-1 mx-auto0 text-xs font-bold hover:bg-green-400 gap-2'><lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="loop"
                colors="primary:#000000"></lord-icon>Save Password
            </button>
          </div>




        </div>
      </div>










      <div className='max-w-4xl max-sm:mx-4 mx-auto text-green-900 font-bold ' >
        <h2>Your Passwords:</h2>
      </div>










      {/* OUTPUTS */}
      <div className=" bg-green-100 drop-shadow-2xl mx-auto my-4 mt-1 mb-20 max-sm:mx-4 max-w-4xl min-h-[13rem] rounded-xl overflow-hidden">

        <table classname="table-auto w-full">

          <thead className='bg-green-800 text-white '>
            <tr>
              <th className='text-center w-[40%] p-2'>Website</th>
              <th className='text-center w-60 p-2'>Username</th>
              <th className='text-center w-52 p-2'>Password</th>
              <th className='text-center w-44 p-2'>Actions</th>
            </tr>
          </thead>


          {passwordArray.length != 0 && <tbody>

            {passwordArray.map((item, index) => {

              return <tr key={index}>

                <td className='text-center border border-white p-2 '>

                  <div className="flex justify-center items-center">

                    <a href={item.site} target='_blank'> {item.site}</a>

                    <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                      {/* , 'paddingTop':'3px' */}
                      <lord-icon
                        style={{ width: '15px', 'paddingTop': '3px', 'padding-left': '8px' }}
                        src="https://cdn.lordicon.com/depeqmsz.json"
                        trigger="hover">
                      </lord-icon>
                    </div>

                  </div>

                </td>

                <td className='text-center border border-white p-2'>

                  <div className="flex justify-center items-center">

                    <span>{item.username}</span>

                    <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                      <lord-icon
                        style={{ width: '15px', 'paddingTop': '3px', 'padding-left': '8px' }}
                        src="https://cdn.lordicon.com/depeqmsz.json"
                        trigger="hover">
                      </lord-icon>
                    </div>

                  </div>

                </td>

                <td className='text-center border border-white p-2 flex justify-center items-center'>

                  <div className="flex justify-center items-center">

                    <span>{item.password}</span>

                    <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                      <lord-icon
                        style={{ width: '15px', 'paddingTop': '3px', 'padding-left': '8px' }}
                        src="https://cdn.lordicon.com/depeqmsz.json"
                        trigger="hover">
                      </lord-icon>
                    </div>

                  </div>

                </td>



                <td className='text-center border border-white p-2'>
                  <span onClick={() => { editPassword(item.id) }} className='mr-2 cursor-pointer'>
                    <lord-icon
                      src="https://cdn.lordicon.com/fikcyfpp.json"
                      trigger="hover"
                      stroke="bold"
                      colors="primary:#121331,secondary:#a66037"
                      style={{ "width": "18px" }}>
                    </lord-icon>
                  </span>
                  <span onClick={() => { deletePassword(item.id) }} className='ml-2 cursor-pointer'>
                    <lord-icon
                      src="https://cdn.lordicon.com/hwjcdycb.json"
                      trigger="hover"
                      stroke="bold"
                      colors="primary:#121331,secondary:#e83a30"
                      style={{ "width": "18px" }}>
                    </lord-icon>
                  </span>
                </td>





              </tr>

            })}

          </tbody>}

        </table>

        {passwordArray.length === 0 && <div className='text-center m-4 text-lg' >No Passwords to show</div>}





      </div >



    </>
  )
}

export default Manager
