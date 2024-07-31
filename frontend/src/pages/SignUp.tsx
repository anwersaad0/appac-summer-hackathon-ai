import { useState } from "react";
import LanguageCheckBox from "../components/signup/LanguageCheckBox";
import { Link } from "react-router-dom";

const SignUp = () =>{

    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        prefLang: ''
    });


    const handleLangCheckbox = (language: "EN" | "SP") =>{
        setInputs({...inputs, prefLang: language})
    }



    const handleSubmit = () =>{

    }

    return (
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Sign Up <span className="text-orange-500"> Live Translator</span>
          </h1>

          <form onSubmit={handleSubmit}>
            {/* USERNAME INPUT */}
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Username</span>
              </label>
              <input
                type="text"
                placeholder="Your username"
                value={inputs.username}
                className="w-full input input-bordered h-10"
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </div>
            {/* EMAIL INPUT */}
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Email</span>
              </label>
              <input
                type="email"
                placeholder="your_email@example.com"
                value={inputs.email}
                className="w-full input input-bordered h-10"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>
            {/* PASSWORD INPUT */}
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={inputs.password}
                className="w-full input input-bordered h-10"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
              />
            </div>
            {/* PREFERRED LANGUAGE CHECKBOX */}
            <LanguageCheckBox onCheckboxChange={handleLangCheckbox} selectedLang={inputs.prefLang} />
            <Link to="/login" className="text-sm hover:underline hover:text-orange-600 mt-2 inline-block text-white">
                Already have an account? Log in
            </Link>

            <div>
                <button className="btn btn-block btn-sm mt-2 border border-slate-700 text-orange-500 hover:bg-orange-500 hover:text-white">
                    Sign Up
                </button>
            </div>
          </form>
        </div>
      </div>
    );



}

export default SignUp;
