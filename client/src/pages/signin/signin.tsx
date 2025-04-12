import Signin_Form from './Signin_Form';
import welcomeImage from '../../img/welcome.svg';
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD

=======
>>>>>>> 03a1e69c441f23abf87fc1b19b671f5abf9596f6
function SignIn() {
  return (
      <div className="flex w-full justify-center items-center h-full">
        {/* Container mới với max-width và gap */}
        <div className="flex flex-wrap lg:flex-nowrap w-full max-w-7xl gap-8 lg:gap-12 px-4">
          
          {/* Form đăng nhập */}
          <div className="flex items-center justify-center w-full lg:w-auto lg:flex-1">
            <Signin_Form />
          </div>

          {/* Hình ảnh */}
          <div className="hidden lg:flex items-center justify-center w-full lg:w-auto lg:flex-1">
            <img 
              src={welcomeImage} 
              alt="Welcome" 
              className="w-full max-w-md xl:max-w-2xl" 
            />
          </div>

        </div>
      </div>
  );
}

export default SignIn;