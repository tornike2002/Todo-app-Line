const SignIn = () => {
  return (
    <section className="mx-4">
      <div>
        <div className="flex flex-col items-center justify-center gap-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="79"
            height="79"
            viewBox="0 0 79 79"
            fill="none"
          >
            <circle
              cx="39.5"
              cy="39.5"
              r="39.5"
              fill="#0500FF"
              fill-opacity="0.45"
            />
          </svg>
          <h1 className="text-light-blue text-[32px] font-medium">
            Sign in
          </h1>
        </div>
        {/* form */}
        <form>
          <div className="flex flex-col gap-2">
            <input type="text" className="w-full py-5 px-4 bg-cyan-500 rounded-xl text-auth-placeholder" />
            <input type="password" className="w-full py-5 px-4 bg-cyan-500 rounded-xl text-auth-placeholder" />
          </div>
          <button>Forgot password?</button>
          <div>
            <button>Sign in</button>
            <h1>or</h1>
            <button>Sign in with google</button>
            <p>Don't have account? Sign up</p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
