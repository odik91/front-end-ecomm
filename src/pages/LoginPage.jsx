import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormInput, Loading } from "../components";
import img from "../assets/images/login.svg";
import { Swal } from "sweetalert2";
import { loginUser } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Checkbox, Label } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

const initialState = {
  email: "",
  password: "",
  remember: false
};

const LoginPage = () => {
  const { is_loading, has_error, isAuthenticated } = useSelector(
    (store) => store.users
  );
  const { message, code, status_text } = has_error;

  const dispatch = useDispatch();
  const [values, setValues] = useState(initialState);
  const [isChecked, setIsChecked] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleCheckbox = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    setIsChecked(!isChecked);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;

    if (!email || !password) {
      Swal.fire({
        title: "Perhatian!",
        text: `Mohon isi ${
          (!email && "email") || (!password && "password")
        } anda`,
        icon: "warning",
      });
      return;
    }

    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {is_loading && <Loading />}
      <main className="w-full bg-base-200">
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="flex items-center justify-center rounded bg-gray-200 h-dvh dark:bg-gray-800">
              <Card className="max-w-sm">
                {code && (
                  <Alert color="failure" icon={HiInformationCircle}>
                    <h1 className="font-bold">
                      {code} {status_text}
                    </h1>{" "}
                    {message}.
                  </Alert>
                )}
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
                <form
                  className="flex max-w-md flex-col gap-4"
                  onSubmit={onSubmit}
                >
                  <FormInput
                    type={"email"}
                    placeholder={"email"}
                    name={"email"}
                    value={values.email}
                    handleChange={handleChange}
                    labelText={"Email"}
                    isRequired={true}
                  />
                  <FormInput
                    type={"password"}
                    placeholder={"password"}
                    name={"password"}
                    value={values.password}
                    handleChange={handleChange}
                    labelText={"Password"}
                    isRequired={true}
                  />
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      name="remember"
                      checked={isChecked}
                      onChange={handleCheckbox}
                    />
                    <Label htmlFor="remember">Remember me</Label>
                  </div>

                  <Button type="submit">Masuk</Button>
                </form>
                <div className="flex items-center gap-2">
                  <p
                    id="helper-text-explanation"
                    className="mt-2 text-sm text-gray-500 dark:text-gray-400"
                  >
                    Lupa password?{" "}
                    <Link
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Klik disini
                    </Link>
                    .
                  </p>
                </div>
              </Card>
            </div>
            <div className="hidden items-center justify-center rounded bg-gray-200 h-dvh dark:bg-gray-800 sm:flex">
              <div className="text-center lg:text-left px-10 mb-8 p-6">
                <h1 className="text-4xl font-bold text-center mb-8 text-teal-600">
                  Masuk ke akun anda!
                </h1>
                <img src={img} alt="login" className="max-h-[65vh]" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default LoginPage;
